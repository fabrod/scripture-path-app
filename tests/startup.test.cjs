const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');
const { transformFileSync } = require('@babel/core');

const root = path.resolve(__dirname, '..');

function execute(file, mocks, mode) {
  const { code } = transformFileSync(file, {
    babelrc: false,
    configFile: false,
    presets: ['babel-preset-expo'],
  });
  const module = { exports: {} };
  const localRequire = (name) => {
    if (Object.hasOwn(mocks, name)) return mocks[name];
    if (name.startsWith('@babel/runtime/')) return require(name);
    throw new Error(`Unexpected startup import: ${name}`);
  };
  vm.runInNewContext(code, {
    module,
    exports: module.exports,
    require: localRequire,
    process: { env: { NODE_ENV: mode } },
  }, { filename: file });
  return module.exports;
}

for (const mode of ['development', 'production']) {
  test(`configured entry registers the native main application (${mode})`, () => {
    const registrations = [];
    const App = () => null;
    // Exercise Expo's real registration code; replace only its native boundary
    // and dev wrapper, which require a running React Native host.
    const expoRoot = path.dirname(require.resolve('expo/package.json'));
    const registerRootComponent = execute(
      path.join(expoRoot, 'src/launch/registerRootComponent.tsx'),
      {
        '../Expo.fx': {},
        'react-native': {
          AppRegistry: {
            registerComponent: (name, provider) => registrations.push({ name, provider }),
          },
          Platform: { OS: 'ios' },
        },
        './withDevTools': { withDevTools: (component) => component },
      },
      mode,
    ).default;

    const { main } = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
    const entry = path.resolve(root, main);
    const mocks = {
      expo: { registerRootComponent },
      './App': { __esModule: true, default: App },
    };
    // If main regresses to App.js, evaluate its exports without mounting screens
    // so the assertion below detects the missing native registration.
    if (entry === path.join(root, 'App.js')) {
      const source = fs.readFileSync(entry, 'utf8');
      for (const match of source.matchAll(/from\s+['"]([^'"]+)['"]/g)) {
        mocks[match[1]] = {};
      }
      mocks['react/jsx-runtime'] = {};
      mocks['@react-navigation/native-stack'] = { createNativeStackNavigator: () => ({}) };
    }
    execute(entry, mocks, mode);

    assert.equal(registrations.length, 1, 'The native host must receive one registered root component');
    assert.equal(registrations[0].name, 'main');
    assert.equal(registrations[0].provider(), App);
  });
}
