import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

import { fetchFlightData } from '../utils/fetchers/fetchFlightData';
import { fetchHotelData } from '../utils/fetchers/fetchHotelData';
import { fetchRestaurantData } from '../utils/fetchers/fetchRestaurantData';
import { fetchActivityData } from '../utils/fetchers/fetchActivityData';

import { mapFlightData } from '../utils/mapFlightData';
import { mapAccommodationData } from '../utils/mapAccommodationData';
import { mapRestaurantData } from '../utils/mapRestaurantData';
import { mapActivityData } from '../utils/mapActivityData';

export default function AiLoadingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location, extra } = route.params;

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // ✈️ 비행기 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, { toValue: -10, duration: 1000, useNativeDriver: true }),
        Animated.timing(translateY, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    ).start();

    // 🌐 API 데이터 불러오기 + Gemini 호출
    const loadAndGenerate = async () => {
      try {
        const flightRaw = await fetchFlightData({ origin: 'ICN', destinationId: 'NRT', date: '2025-07-01' });
        const hotelRaw = await fetchHotelData({ location });
        const restaurantRaw = await fetchRestaurantData({ locationId: '304554' });
        const activityRaw = await fetchActivityData({ input: 'attractions' });

        const flights = mapFlightData(flightRaw);
        const accommodations = mapAccommodationData(hotelRaw);
        const restaurants = mapRestaurantData(restaurantRaw);
        const activities = mapActivityData(activityRaw);

        const payload = {
          userInput: { companion, style, budget, location, extra },
          flights,
          accommodations,
          restaurants,
          activities,
        };

        const response = await fetch('https://us-central1-yeojeong-bebe4.cloudfunctions.net/generateOptimizedPlan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const result = await response.json();

        navigation.navigate('AiResultScreen', {
          companion,
          style,
          budget,
          location,
          extra,
          result, // ✅ AI 응답 전달
        });
      } catch (error) {
        console.error('❌ 에러 발생:', error);
        navigation.navigate('AiResultScreen', {
          result: { error: '데이터 불러오기 실패' },
        });
      }
    };

    loadAndGenerate();
  }, []);

  return (
    <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
      <Text style={styles.text}>당신을 위한{'\n'}맞춤형 여행 계획을 짜고 있어요...</Text>
      <Animated.View style={[styles.imageWrapper, { transform: [{ translateY }] }]}>
        <Image source={require('../assets/loading-plane.png')} style={styles.image} resizeMode="contain" />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18, color: 'white', marginBottom: 30, textAlign: 'center', fontWeight: 'bold' },
  imageWrapper: { width: 180, height: 180 },
  image: { width: '100%', height: '100%' },
});
