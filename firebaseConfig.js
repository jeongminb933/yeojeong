


// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyAW7OBklSJDKpDZ2uRtxZ98QF_7oeoqueI",
  authDomain: "yeojeong-bebe4.firebaseapp.com",
  projectId: "yeojeong-bebe4",
  storageBucket: "yeojeong-bebe4.firebasestorage.app",
  messagingSenderId: "30797085570",
  appId: "1:30797085570:web:e77c6681c2e39115356d9b"
};

const app = initializeApp(firebaseConfig);

// AsyncStorage를 이용해 auth 상태 유지
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };
