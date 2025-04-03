// navigation/StackNavigator.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import AuthScreen from '../screens/AuthScreen';
import EmotionalTripScreen from '../screens/EmotionalTripScreen';
import TabNavigator from './TabNavigator'; // ✅ 메인 탭
import FlightScreen from '../screens/FlightScreen';
import HotelScreen from '../screens/HotelScreen';
import ActivityScreen from '../screens/ActivityScreen';
import AiScreen from '../screens/AiScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  // 🔥 조건 분기 미리 처리
  const screens = user ? (
    <>
      <Stack.Screen name="MainTabs" component={TabNavigator} />
      <Stack.Screen name="EmotionalTrip" component={EmotionalTripScreen} />
      <Stack.Screen name="Flight" component={FlightScreen} />
      <Stack.Screen name="Hotel" component={HotelScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Ai" component={AiScreen} />
      
    </>
  ) : (
    <Stack.Screen name="Auth" component={AuthScreen} />
  );

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens}
    </Stack.Navigator>
  );
}
