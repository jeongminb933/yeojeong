import React, { useState, useEffect } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { auth } from './firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync(); // 앱 시작 시 스플래시 유지

export default function App() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');
  const [appReady, setAppReady] = useState(false); // 렌더 지연용

  useEffect(() => {
    const prepareApp = async () => {
      await new Promise(resolve => setTimeout(resolve, 500)); // 0.5초만 기다려
      setAppReady(true);
      await SplashScreen.hideAsync();
    };
    prepareApp();
  }, []);

  const handleAuth = async () => {
    try {
      console.log('시도 중...');
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, pw);
        console.log('로그인 성공', userCredential);
        setMessage('로그인 성공!');
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, pw);
        console.log('회원가입 성공', userCredential);
        setMessage('회원가입 성공!');
      }
    } catch (err) {
      console.error('에러 발생:', err);
      setMessage(`에러: ${err.message}`);
    }
  };

  if (!appReady) {
    return null; // 준비 안 됐으면 화면 렌더 안 함
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.container}>
          <TextInput
            placeholder="이메일"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <TextInput
            placeholder="비밀번호"
            secureTextEntry
            value={pw}
            onChangeText={setPw}
            style={styles.input}
            placeholderTextColor="#888"
          />
          <Button title={isLogin ? '로그인' : '회원가입'} onPress={handleAuth} />
          <Text style={{ marginTop: 20 }}>{message}</Text>
          <Button
            title={isLogin ? '회원가입으로 전환' : '로그인으로 전환'}
            onPress={() => setIsLogin(!isLogin)}
            color="gray"
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginTop: 100,
    flex: 1,
    justifyContent: 'flex-start',
  },
  input: {
    borderBottomWidth: 1,
    padding: 8,
    marginBottom: 12,
    color: '#000',
  },
});

