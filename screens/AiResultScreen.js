import React, { useEffect, useState } from 'react';
import {
  View, Text, ScrollView, StyleSheet, ActivityIndicator,
  TouchableOpacity, Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { savePlanToFirebase } from '../utils/savePlanToFirebase';

// ✨ 프롬프트 생성 함수
function buildPrompt({ companion, style, budget, location, city, extra }) {
  return `
너는 전문 여행 플래너야.

나는 2025년 7월 1일부터 3일까지 ${location}의 ${city}를 여행할 거야.
동반자는 ${companion}이고, 여행 스타일은 ${style}이야.
예산은 약 ${budget}원이고, 추가 요청은 "${extra || '없음'}"이야.

🛫 참고 항공권 정보: 정보 없음

📌 반드시 다음 조건을 따라야 해:
1. 반드시 순수한 JSON만 응답할 것 (설명이나 텍스트 금지)
2. 아래 형식을 정확히 따를 것
3. 각 날짜(day1, day2, day3)에 최소 3~5개의 일정 포함
4. 시간(time)은 "HH:MM" 형식, activity는 "간단한 설명"으로
5. 한국인 관광객 기준으로 맛집/체험/쇼핑도 포함

{
  "day1": [
    { "time": "09:00", "activity": "도쿄타워에서 시작" },
    { "time": "11:00", "activity": "근처 카페에서 커피" }
  ],
  "day2": [], "day3": []
}`;
}

export default function AiResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location, city, extra } = route.params || {};

  const [loading, setLoading] = useState(true);
  const [jsonResult, setJsonResult] = useState(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const prompt = buildPrompt({ companion, style, budget, location, city, extra });

        const res = await fetch('https://us-central1-yeojeong-bebe4.cloudfunctions.net/generateTravelPlan', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt }),
        });

        const data = await res.json();
        const responseText = data?.text?.trim();

        const jsonStart = responseText.indexOf('{');
        const jsonEnd = responseText.lastIndexOf('}');
        if (jsonStart !== -1 && jsonEnd !== -1) {
          const parsed = JSON.parse(responseText.slice(jsonStart, jsonEnd + 1));
          setJsonResult(parsed);
        } else {
          throw new Error('Gemini 응답에서 JSON을 추출할 수 없음');
        }

      } catch (error) {
        console.error('❌ Gemini 오류', error);
        Alert.alert('에러 발생', error.message || '문제가 발생했습니다.');
        setJsonResult(null);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  return (
    <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>AI 여행 추천 결과</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="white" style={{ marginTop: 100 }} />
      ) : jsonResult ? (
        <ScrollView contentContainerStyle={styles.content}>
          {['day1', 'day2', 'day3'].map((day) => (
            <View key={day} style={styles.dayBlock}>
              <Text style={styles.dayTitle}>{day.toUpperCase()}</Text>
              {jsonResult[day]?.map((item, index) => (
                <Text key={index} style={styles.item}>
                  ⏰ {item.time} - {item.activity}
                </Text>
              ))}
            </View>
          ))}

          {/* 📌 찜하기 버튼 */}
          <TouchableOpacity
            onPress={async () => {
              try {
                await savePlanToFirebase({
                  userId: auth.currentUser.uid,
                  location,
                  city,
                  result: jsonResult,
                });
                Alert.alert('저장 완료', '여행 일정이 찜 목록에 저장되었어요!');
              } catch (e) {
                Alert.alert('저장 실패', '다시 시도해주세요.');
              }
            }}
            style={styles.saveButton}
          >
            <Text style={styles.saveButtonText}>📌 이 일정 찜하기</Text>
          </TouchableOpacity>

          {/* 🏠 홈으로 돌아가기 버튼 */}
          <TouchableOpacity
            onPress={() => navigation.navigate('MainTabs')}
            style={[styles.saveButton, { backgroundColor: '#4DA6FF', marginTop: 10 }]}
          >
            <Text style={[styles.saveButtonText, { color: 'white' }]}>
              🏠 홈으로 돌아가기
            </Text>
          </TouchableOpacity>
        </ScrollView>
      ) : (
        <Text style={styles.errorText}>결과를 불러오는 데 실패했어요.</Text>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  headerText: {
    marginLeft: 12,
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  content: {
    padding: 20,
    paddingBottom: 60,
  },
  dayBlock: {
    marginBottom: 24,
  },
  dayTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#fff',
  },
  item: {
    fontSize: 14,
    backgroundColor: 'white',
    marginBottom: 6,
    padding: 10,
    borderRadius: 8,
    color: '#333',
  },
  errorText: {
    textAlign: 'center',
    marginTop: 100,
    color: 'white',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: 'white',
    padding: 14,
    marginTop: 20,
    borderRadius: 12,
  },
  saveButtonText: {
    color: '#4DA6FF',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
