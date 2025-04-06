// screens/FavoritesScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function FavoritesScreen() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        const q = query(
          collection(db, 'plans'),
          where('userId', '==', userId),
          orderBy('createdAt', 'desc')
        );

        const snapshot = await getDocs(q);
        const results = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setPlans(results);
      } catch (error) {
        console.error('❌ 찜 목록 불러오기 실패:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const renderItem = ({ item }) => {
    const dateString = item.createdAt?.seconds
      ? new Date(item.createdAt.seconds * 1000).toLocaleString()
      : '-';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('AiResultScreen', {
            companion: '찜',
            style: '찜',
            budget: '0',
            location: item.location,
            city: item.city,
            extra: '',
            result: item.result,
          })
        }
      >
        <Text style={styles.title}>{item.city}</Text>
        <Text style={styles.sub}>장소: {item.location}</Text>
        <Text style={styles.date}>⏰ 저장일: {dateString}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>❤️ 찜한 여행 일정</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#4DA6FF" style={{ marginTop: 40 }} />
      ) : plans.length === 0 ? (
        <Text style={styles.emptyText}>찜한 일정이 아직 없어요.</Text>
      ) : (
        <FlatList
          data={plans}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 40 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  header: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: 'bold', color: '#4DA6FF' },
  sub: { fontSize: 14, marginTop: 4 },
  date: { fontSize: 12, color: '#888', marginTop: 6 },
  emptyText: {
    marginTop: 100,
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
  },
});
