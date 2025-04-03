import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AiScreenstep5() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location } = route.params;
  const [extra, setExtra] = useState('');

  const handleSubmit = () => {
    navigation.navigate('AiLoadingScreen', {
      companion,
      style,
      budget,
      location,
      extra,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.question}>추가로 원하는 사항이 있나요?</Text>
          <TextInput
            style={styles.input}
            placeholder="예: 조용한 힐링 중심으로 부탁해요"
            placeholderTextColor="white"
            value={extra}
            onChangeText={setExtra}
            multiline
            numberOfLines={4}
            returnKeyType="done"
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>AI 분석 시작하기</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
  },
  content: {
    marginTop: 140,
    paddingHorizontal: 28,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    color: 'white',
    borderRadius: 10,
    padding: 12,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#4DA6FF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
