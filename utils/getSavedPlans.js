// utils/getSavedPlans.js
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';

export async function getSavedPlans(userId) {
  const plansRef = collection(db, 'plans');
  const q = query(plansRef, where('userId', '==', userId), orderBy('createdAt', 'desc'));

  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
