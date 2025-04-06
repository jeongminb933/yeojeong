// utils/savePlanToFirebase.js
import { db } from '../firebaseConfig'; // Firestore instance
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';

export async function savePlanToFirebase({ userId, location, city, result }) {
  try {
    await addDoc(collection(db, 'plans'), {
      userId,
      location,
      city,
      result,
      createdAt: serverTimestamp(),
    });
    console.log('✅ 여행 일정 저장 완료');
  } catch (error) {
    console.error('❌ 여행 일정 저장 실패:', error);
    throw error;
  }
}