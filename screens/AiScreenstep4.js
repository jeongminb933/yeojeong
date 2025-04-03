import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AiScreenstep4() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget } = route.params;

  const handleSelect = (location) => {
    navigation.navigate('AiScreenstep5', { companion, style, budget, location });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.question}>어디로 가시나요?</Text>
          <View style={styles.row}>
            <OptionButton label="국내" onPress={() => handleSelect('국내')} />
            <OptionButton label="해외" onPress={() => handleSelect('해외')} />
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

function OptionButton({ label, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
    </TouchableOpacity>
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
    alignItems: 'center',
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
    marginHorizontal: 8,
  },
  buttonText: {
    fontSize: 14,
    color: '#4DA6FF',
    fontWeight: '600',
  },
});
