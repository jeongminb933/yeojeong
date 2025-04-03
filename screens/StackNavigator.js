// screens/HomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function HomeScreen() {
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <View style={{ padding: 20, marginTop: 100 }}>
      <Text style={{ fontSize: 24 }}>🏠 홈 화면입니다!</Text>
      <Button title="로그아웃" onPress={handleLogout} />
    </View>
  );
}
