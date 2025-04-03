// screens/AiScreenstep1.js
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default function AiScreenstep1() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('AiScreenstep2');
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
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
  textBox: {
    marginTop: 140,
    paddingHorizontal: 28,
    alignItems: 'flex-start',
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