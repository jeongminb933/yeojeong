import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AiScreenstep3() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style } = route.params;
  const [budget, setBudget] = useState('');

  const handleNext = () => {
    if (!budget) return;
    navigation.navigate('AiScreenstep4', { companion, style, budget });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.question}>예산은 어느 정도인가요?</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.won}>₩</Text>
            <TextInput
              style={styles.input}
              placeholder="예: 500000"
              placeholderTextColor="white"
              keyboardType="numeric"
              value={budget}
              onChangeText={setBudget}
              onSubmitEditing={handleNext}
              returnKeyType="done"
            />
          </View>
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
    marginTop: 160,
    paddingHorizontal: 32,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 40,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: 'white',
    borderBottomWidth: 1,
    paddingBottom: 6,
  },
  won: {
    fontSize: 18,
    color: 'white',
    marginRight: 6,
  },
  input: {
    fontSize: 18,
    color: 'white',
    flex: 1,
  },
});