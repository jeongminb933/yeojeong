// navigation/HomeStack.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import FlightScreen from '../screens/FlightScreen';
import ActivityScreen from '../screens/ActivityScreen';
import HotelScreen from '../screens/HotelScreen';
import EmotionalTripScreen from '../screens/EmotionalTripScreen';
import AiScreenstep1 from '../screens/AiScreenstep1';
import AiScreenstep2 from '../screens/AiScreenstep2';
import AiScreenstep3 from '../screens/AiScreenstep3';
import AiScreenstep4 from '../screens/AiScreenstep4';
import AiScreenstep5 from '../screens/AiScreenstep5';
import AiResultScreen from '../screens/AiResultScreen';
import AiLoadingScreen from '../screens/AiLoadingScreen';
import AiScreen from '../screens/AiScreen';
import AiScreenstep1_5 from '../screens/AiScreenstep1_5';


const Stack = createNativeStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeMain" component={HomeScreen} />
      <Stack.Screen name="Flight" component={FlightScreen} />
      <Stack.Screen name="Activity" component={ActivityScreen} />
      <Stack.Screen name="Hotel" component={HotelScreen} />
      <Stack.Screen name="EmotionalTrip" component={EmotionalTripScreen} />
      <Stack.Screen name="AiScreen" component={AiScreen} />
      <Stack.Screen name="AiScreenstep1_5" component={AiScreenstep1_5} />
      <Stack.Screen name="AiScreenstep1" component={AiScreenstep1} />
      <Stack.Screen name="AiScreenstep2" component={AiScreenstep2} />
      <Stack.Screen name="AiScreenstep3" component={AiScreenstep3} />
      <Stack.Screen name="AiScreenstep4" component={AiScreenstep4} />
      <Stack.Screen name="AiScreenstep5" component={AiScreenstep5} />
      <Stack.Screen name="AiLoadingScreen" component={AiLoadingScreen} />
      <Stack.Screen name="AiResultScreen" component={AiResultScreen} />
    </Stack.Navigator>
  );
}
