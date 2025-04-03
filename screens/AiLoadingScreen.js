import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, Image, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function AiLoadingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location, extra } = route.params;

  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 비행기 일렁이는 애니메이션
    Animated.loop(
      Animated.sequence([
        Animated.timing(translateY, {
          toValue: -10,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3초 후 결과 화면 이동
    const timer = setTimeout(() => {
      navigation.navigate('AiResultScreen', {
        companion,
        style,
        budget,
        location,
        extra,
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
      <Text style={styles.text}>당신을 위한{'\n'}맞춤형 여행 계획을 짜고 있어요...</Text>
      <Animated.View style={[styles.imageWrapper, { transform: [{ translateY }] }]}>
        <Image
          source={require('../assets/loading-plane.png')} // 이미지 파일 위치
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imageWrapper: {
    width: 180,
    height: 180,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});