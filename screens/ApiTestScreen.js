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
        const flightRaw = await fetchFlightData({
          origin: 'ICN',
          destination: 'NRT',
          date: '2025-07-01',
        });

        const hotelRaw = await fetchHotelData({
          dest_id: 'Tokyo',
          checkin: '2025-07-01',
          checkout: '2025-07-03',
        });

        const restaurantRaw = await fetchRestaurantData({
          locationId: '293919', // 도쿄 locationId 예시
        });

        const activityRaw = await fetchActivityData({
          lat: 35.682839,
          lng: 139.759455,
          keyword: 'tourist spot',
        });

        // 👇 콘솔에 상세하게 출력
        console.log('✅ 항공권:', JSON.stringify(flightRaw, null, 2));
        console.log('✅ 숙소:', JSON.stringify(hotelRaw, null, 2));
        console.log('✅ 맛집:', JSON.stringify(restaurantRaw, null, 2));
        console.log('✅ 명소:', JSON.stringify(activityRaw, null, 2));

      } catch (err) {
        console.error('❌ API 호출 오류:', err);
      }
    };

    testApiCalls();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>🚀 API 테스트 중...</Text>
      <Text>결과는 콘솔을 확인해주세요.</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
});
