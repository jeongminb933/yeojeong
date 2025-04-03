// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import StackNavigator from './navigation/StackNavigator';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appReady, setAppReady] = useState(false);

  useEffect(() => {
    const load = async () => {
      await new Promise((resolve) => setTimeout(resolve, 500));
      setAppReady(true);
      await SplashScreen.hideAsync();
    };
    load();
  }, []);

  if (!appReady) return null;

  return (
    <NavigationContainer>
      <StackNavigator />
    </NavigationContainer>
  );
}