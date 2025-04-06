// navigation/StackNavigator.js
import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import AuthScreen from '../screens/AuthScreen';
import TabNavigator from './TabNavigator';
import AiScreen from '../screens/AiScreen';
import AiScreenstep1 from '../screens/AiScreenstep1';
import AiScreenstep1_5 from '../screens/AiScreenstep1_5';
import AiScreenstep2 from '../screens/AiScreenstep2';
import AiScreenstep3 from '../screens/AiScreenstep3';
import AiScreenstep4 from '../screens/AiScreenstep4';
import AiScreenstep5 from '../screens/AiScreenstep5';
import AiLoadingScreen from '../screens/AiLoadingScreen';
import AiResultScreen from '../screens/AiResultScreen';
import AiDomesticCityScreen from '../screens/AiDomesticCityScreen';
import AiOverseasCityScreen from '../screens/AiOverseasCityScreen';
import EmotionalTripScreen from '../screens/EmotionalTripScreen';
import FlightScreen from '../screens/FlightScreen';
import HotelScreen from '../screens/HotelScreen';
import ActivityScreen from '../screens/ActivityScreen';
import ApiTestScreen from '../screens/ApiTestScreen';

// (선택) 커뮤니티 카테고리 스크린 (만약 카테고리 상세 필요)
import CommunityCategoryScreen from '../screens/CommunityCategoryScreen';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  const [user, setUser] = useState(true); // 테스트용 true

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          {/* 기타 AI/Flight/Activity 스크린 */}
          <Stack.Screen name="Ai" component={AiScreen} />
          <Stack.Screen name="AiScreenstep1" component={AiScreenstep1} />
          <Stack.Screen name="AiScreenstep1_5" component={AiScreenstep1_5} />
          <Stack.Screen name="AiScreenstep2" component={AiScreenstep2} />
          <Stack.Screen name="AiScreenstep3" component={AiScreenstep3} />
          <Stack.Screen name="AiScreenstep4" component={AiScreenstep4} />
          <Stack.Screen name="AiScreenstep5" component={AiScreenstep5} />
          <Stack.Screen name="AiLoadingScreen" component={AiLoadingScreen} />
          <Stack.Screen name="AiResultScreen" component={AiResultScreen} />
          <Stack.Screen name="AiDomesticCity" component={AiDomesticCityScreen} />
          <Stack.Screen name="AiOverseasCity" component={AiOverseasCityScreen} />
          <Stack.Screen name="EmotionalTrip" component={EmotionalTripScreen} />
          <Stack.Screen name="Flight" component={FlightScreen} />
          <Stack.Screen name="Hotel" component={HotelScreen} />
          <Stack.Screen name="Activity" component={ActivityScreen} />
          <Stack.Screen name="ApiTest" component={ApiTestScreen} />

          {/* 커ㅞ뮤니티 카테고리 상세 화면 (필요 시) */}
          <Stack.Screen name="CommunityCategory" component={CommunityCategoryScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}