// screens/HomeScreen.js
import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './homeStyles';

export default function HomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        {/* 검색창 */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#888" style={{ marginRight: 8 }} />
          <TextInput
            placeholder="어디로 떠나고 싶으신가요?"
            placeholderTextColor="#888"
            style={styles.searchInput}
          />
        </View>

        {/* ONE CLICK PLANNER */}
        <View style={styles.sectionLarge}>

          <Text style={styles.title}>ONE CLICK{"\n"}PLANNER</Text>
          <Text style={styles.subtext}>
            ✨ AI가 당신만을 위한 여행 계획을{'\n'}단 한 번의 클릭으로 추천해드려요.
          </Text>
          <FeatureButton
                onPress={() => navigation.navigate('Ai')}
                label={" "}
            />
        </View>

        {/* 항공권 / 숙박 / 액티비티 */}
        <View style={styles.row}>
          <FeatureButton
            label="항공권"
            emoji="🛫"
            onPress={() => navigation.navigate('Flight')}
          />
          <FeatureButton
            label="숙박"
            emoji="🏨"
            onPress={() => navigation.navigate('Hotel')}
          />
          <FeatureButton
            label="액티비티"
            emoji="🎡"
            onPress={() => navigation.navigate('Activity')}
          />
        </View>

        {/* 감성 여행 추천 (Stack에 별도 등록된 화면) */}
        <TouchableOpacity
          style={styles.sectionMedium}
          onPress={() => navigation.navigate('EmotionalTrip')}
        >
          <Text style={styles.buttonTitle}>감성 여행</Text>
          <Text style={styles.buttonSubtext}>
            나만 알고 싶은, 감성 가득 비밀 여행지 추천 💖
          </Text>
        </TouchableOpacity>

        <Text style={styles.sectionLabel}>실시간 인기 여행지</Text>
      </ScrollView>


    </SafeAreaView>
  );
}

function FeatureButton({ label, emoji, onPress }) {
  return (
    <TouchableOpacity style={styles.featureButton} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.featureText}>{label}</Text>
    </TouchableOpacity>
  );
}

