import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from './src/lib/theme';

import HomeScreen from './src/screens/HomeScreen';
import DevotionalScreen from './src/screens/DevotionalScreen';
import ReaderScreen from './src/screens/ReaderScreen';
import SearchScreen from './src/screens/SearchScreen';
import PrayerScreen from './src/screens/PrayerScreen';
import ChurchScreen from './src/screens/ChurchScreen';
import BookmarksScreen from './src/screens/BookmarksScreen';
import ContactScreen from './src/screens/ContactScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Devotional" component={DevotionalScreen} />
          <Stack.Screen name="Reader" component={ReaderScreen} />
          <Stack.Screen name="Search" component={SearchScreen} />
          <Stack.Screen name="Prayer" component={PrayerScreen} />
          <Stack.Screen name="Church" component={ChurchScreen} />
          <Stack.Screen name="Bookmarks" component={BookmarksScreen} />
          <Stack.Screen name="Contact" component={ContactScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
