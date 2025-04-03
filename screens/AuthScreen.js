// screens/AuthScreen.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { auth } from '../firebaseConfig';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';

export default function AuthScreen() {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [message, setMessage] = useState('');

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, pw);
        setMessage('로그인 성공!');
      } else {
        await createUserWithEmailAndPassword(auth, email, pw);
        setMessage('회원가입 성공!');
      }
    } catch (err) {
      console.error('에러 발생:', err);
      setMessage(`에러: ${err.message}`);
    }
  };

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
