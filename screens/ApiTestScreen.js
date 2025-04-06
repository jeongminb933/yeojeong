import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

// 🔗 fetch 함수들 import
import { fetchFlightData } from '../utils/fetchers/fetchFlightData';
import { fetchHotelData } from '../utils/fetchers/fetchHotelData';
import { fetchRestaurantData } from '../utils/fetchers/fetchRestaurantData';
import { fetchActivityData } from '../utils/fetchers/fetchActivityData';

export default function ApiTestScreen() {
  useEffect(() => {
    const testApiCalls = async () => {
      try {
        const flight = await fetchFlightData({
          origin: 'ICN',
          destination: 'NRT',
          date: '2025-07-01',
        });

        const hotel = await fetchHotelData({
          dest_id: 'Tokyo',
          checkin: '2025-07-01',
          checkout: '2025-07-03',
        });

        const restaurant = await fetchRestaurantData({
          locationId: '293919', // 도쿄 locationId 예시
        });

        const activity = await fetchActivityData({
          lat: 35.682839,
          lng: 139.759455,
          keyword: 'tourist spot',
        });

        console.log('✅ 항공권:', flight);
        console.log('✅ 숙소:', hotel);
        console.log('✅ 맛집:', restaurant);
        console.log('✅ 명소:', activity);
      } catch (err) {
        console.error('❌ API 호출 오류:', err);
      }
    };

    testApiCalls();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚀 API 테스트 중...</Text>
      <Text>콘솔을 확인해주세요.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
