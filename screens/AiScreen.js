import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AiScreen() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);

  const testPrompt = `
너는 여행 전문가야. 나는 2025년 7월 1일부터 3일까지 도쿄를 여행할 거야.
관광지, 맛집, 활동 등을 조합해서 3일짜리 여행 일정을 짜줘.

⛔ 중요한 조건:
- 반드시 순수한 JSON 형식으로만 응답해줘
- "Great!", "Here's your plan!" 같은 설명은 절대 쓰지 마
- 오직 아래 형태처럼 JSON만 보여줘

{
  "day1": [
    { "time": "10:00", "activity": "도쿄타워 방문" },
    { "time": "13:00", "activity": "스시 먹기" }
  ],
  "day2": [],
  "day3": []
}
`;

  const fetchPlan = async () => {
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch('https://us-central1-yeojeong-bebe4.cloudfunctions.net/generateTravelPlan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: testPrompt })
      });

      const rawData = await res.json();
      const text = rawData?.text?.trim();

      const jsonStart = text.indexOf('{');
      const jsonEnd = text.lastIndexOf('}');

      if (jsonStart !== -1 && jsonEnd !== -1) {
        const jsonText = text.slice(jsonStart, jsonEnd + 1);
        const parsed = JSON.parse(jsonText);
        setResult(parsed);
      } else {
        setResult({ error: 'Gemini 응답에서 JSON 부분을 찾지 못했어요 🥲', raw: text });
      }

    } catch (err) {
      setResult({ error: '파싱 오류: ' + err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlan();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>🧠 AI 추천 일정표</Text>
          <TouchableOpacity style={styles.button} onPress={fetchPlan}>
            <Text style={styles.buttonText}>🔁 다시 짜기</Text>
          </TouchableOpacity>
        </View>

        {loading ? (
          <View style={styles.loading}>
            <ActivityIndicator size="large" />
            <Text>AI가 여행 일정을 짜는 중입니다...</Text>
          </View>
        ) : result?.error ? (
          <Text style={styles.result}>
            ❌ {result.error}
            {"\n\n📎 응답 원본:\n"}
            {result.raw}
          </Text>
        ) : (
          Object.entries(result).map(([day, activities]) => (
            <View key={day} style={styles.dayCard}>
              <Text style={styles.dayTitle}>🗓️ {day.toUpperCase()}</Text>
              {activities.map((item, idx) => (
                <Text key={idx} style={styles.activity}>
                  🕒 {item.time} - {item.activity}
                </Text>
              ))}
            </View>
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    padding: 20,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 40,
  },
  result: {
    fontFamily: 'Courier',
    fontSize: 14,
    color: '#333',
  },
  dayCard: {
    width: '100%',
    backgroundColor: '#f0f4ff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  dayTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  activity: {
    fontSize: 14,
    marginBottom: 5,
    color: '#444',
  },
});
