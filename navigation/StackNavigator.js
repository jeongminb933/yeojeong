import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

import AuthScreen from '../screens/AuthScreen';
import TabNavigator from './TabNavigator';
import AiScreen from '../screens/AiScreen';
import AiScreenstep1 from '../screens/AiScreenstep1';
import AiScreenstep2 from '../screens/AiScreenstep2';
import AiScreenstep3 from '../screens/AiScreenstep3';
import AiScreenstep4 from '../screens/AiScreenstep4';
import AiScreenstep5 from '../screens/AiScreenstep5';
import AiLoadingScreen from '../screens/AiLoadingScreen';
import AiResultScreen from '../screens/AiResultScreen';

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
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: 'fade' }}>
      {user ? (
        <>
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Ai" component={AiScreen} />
          <Stack.Screen name="AiScreenstep1" component={AiScreenstep1} />
          <Stack.Screen name="AiScreenstep2" component={AiScreenstep2} />
          <Stack.Screen name="AiScreenstep3" component={AiScreenstep3} />
          <Stack.Screen name="AiScreenstep4" component={AiScreenstep4} />
          <Stack.Screen name="AiScreenstep5" component={AiScreenstep5} />
          <Stack.Screen name="AiLoadingScreen" component={AiLoadingScreen} />
          <Stack.Screen name="AiResultScreen" component={AiResultScreen} />
        </>
      ) : (
        <Stack.Screen name="Auth" component={AuthScreen} />
      )}
    </Stack.Navigator>
  );
}