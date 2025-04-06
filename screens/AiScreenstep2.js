import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation,useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AiScreenstep2() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion } = route.params;
  
  const handleSelect = (style) => {
    navigation.navigate('AiScreenstep3', {
      companion,
      style,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.question}>어떤 여행 스타일을 선호하시나요?</Text>
          <OptionButton label="낭만 넘치는 감성 여행" onPress={() => handleSelect('감성 여행')} />
          <OptionButton label="신나고 아찔한 액티비티" onPress={() => handleSelect('액티비티')} />
          <OptionButton label="소중한 추억을 만드는 효도여행" onPress={() => handleSelect('효도 여행')} />
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
    paddingHorizontal: 24,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 32,
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 20,
    marginBottom: 14,
    minWidth: '100%',
  },
  buttonText: {
    fontSize: 14,
    color: '#4DA6FF',
    fontWeight: '600',
    textAlign: 'center',
  },
});