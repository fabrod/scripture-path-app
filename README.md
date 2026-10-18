# Scripture Path

Bible reader, daily devotionals, audio chapters, prayer community, and church finder — free, no account required.

**Real Scripture Path Inc.** · https://realscripturepath.com

## Stack
- Expo React Native (SDK 54, React 19.1, React Native 0.81.5) + EAS cloud build → TestFlight → App Store
- Node/Express backend (Render) — API-key proxy, devotionals, search, contact form

## Project layout
- `index.js` — Expo root registration (the `main` entry in `package.json`)
- `App.js` — app component and stack navigation
- `src/screens/` — Home, Devotional, Reader, Search, Prayer, Church, Bookmarks, Contact, Settings
- `src/lib/` — theme, api client, bible catalog, on-device storage
- `src/components/` — shared header, buttons, cards
- `backend/` — Express server (`/api/bible`, `/api/devotional`, `/api/explain`, `/api/search`, `/api/churches`, `/api/prayer`, `/api/contact`, `/privacy`)

## Backend env vars
| Var | Purpose |
|---|---|
| `ESV_API_KEY` | Crossway ESV API (api.esv.org) |
| `NLT_API_KEY` | Tyndale NLT API |
| `API_BIBLE_KEY` | api.bible (NKJV) |
| `GOOGLE_PLACES_KEY` | Church finder |
| `RESEND_API_KEY` | Contact form + prayer forwarding (Resend) |
| `CONTACT_EMAIL` | Inbox for contact/prayers (default fabrod035@gmail.com) |

## Run and check (on a Mac)

```sh
npm ci
npm test
npx expo install --check
npx expo start --ios --go
```

Use the Expo Go version for SDK 54 in the simulator; accept Expo CLI's prompt to install the matching version. To check the minified production JavaScript locally, run `npx expo start --ios --go --no-dev --minify`. To verify production bundling, run `npx expo export --platform ios --output-dir dist/ios`.

The entry point must call `registerRootComponent(App)`. Pointing `main` directly at `App.js` only exports the component and leaves the native app unregistered. The startup tests check registration in development and production.

## Ship it (on a Mac)
```
git clone https://github.com/fabrod/scripture-path-app.git
cd scripture-path-app
npm ci
npm install -g eas-cli && eas login
eas build --platform ios --profile production
eas submit --platform ios
```

The startup fix requires a new iOS build and TestFlight submission. Before building, set `expo.ios.buildNumber` in `app.json` to an unused value higher than the last uploaded build number in App Store Connect. Pushing the source to GitHub does not replace an existing TestFlight build.
