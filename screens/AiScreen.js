import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons'; // ← 아이콘 사용

export default function AiScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient
        colors={['#7FC4FD', '#EAF6FF']}
        style={styles.container}
      >
        {/* ← 화살표 아이콘 */}
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>

        {/* 왼쪽 상단 텍스트 */}
        <View style={styles.textBox}>
          <Text style={styles.title}>당신의{'\n'}여정을 위한{'\n'}첫 걸음</Text>
          <Text style={styles.subtitle}>
            완벽한 여행을 위해{'\n'}몇 가지만 물어볼게요
          </Text>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
  },
  textBox: {
    marginTop: 140, // 상단에서 조금 아래로 내림
    paddingHorizontal: 28,
    alignItems: 'flex-start', // 왼쪽 정렬
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    lineHeight: 38,
    textAlign: 'left',
  },
  subtitle: {
    marginTop: 12,
    fontSize: 14,
    color: 'white',
    textAlign: 'left',
    lineHeight: 20,
  },
});