// screens/AiResultScreen.js
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { AntDesign } from '@expo/vector-icons';
import { useRoute, useNavigation } from '@react-navigation/native';
import { GoogleGenerativeAI } from '@google/generative-ai';

// 🔑 Gemini API 키 삽입 (보안상 실제 배포 시엔 서버에 두는 걸 권장)
const genAI = new GoogleGenerativeAI('AIzaSyB3lozLx9aSmh0DXn0kn-V0ad4RIZXa-mM');

export default function AiResultScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location, extra } = route.params;

  const [loading, setLoading] = useState(true);
  const [resultText, setResultText] = useState('');

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });
        const prompt = `다음 조건에 맞춰 하루 여행 일정을 추천해줘.\n
- 동반자: ${companion}\n
- 여행 스타일: ${style}\n
- 예산: ${budget}원\n
- 지역: ${location}\n
- 추가 요청: ${extra}`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        setResultText(text);
      } catch (error) {
        setResultText('❌ AI 추천을 가져오는 중 오류가 발생했어요.');
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchResult();
  }, []);

  return (
    <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={{ flex: 1 }}>
      {/* 🔙 뒤로가기 버튼 → 홈으로 */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>AI 여행 추천 결과</Text>
      </View>

      {loading ? (
        <ActivityIndicator size="large" color="white" style={{ marginTop: 100 }} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          {resultText.split('\n').map((line, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.cardText}>{line.trim()}</Text>
            </View>
          ))}
        </ScrollView>
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
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  cardText: {
    fontSize: 14,
    color: '#333',
  },
});