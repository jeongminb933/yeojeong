import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AiScreenstep1_5() {
  const navigation = useNavigation();

  const handleSelect = (companion) => {
    navigation.navigate('AiScreenstep2', { companion }); // 다음 스텝으로 전달
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LinearGradient colors={['#7FC4FD', '#EAF6FF']} style={styles.container}>
        {/* 🔙 홈으로 이동하는 뒤로가기 버튼 */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.navigate('MainTabs')}
        >
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>

        <View style={styles.content}>
          <Text style={styles.question}>누구와 함께 하는 여행인가요?</Text>

          <View style={styles.row}>
            <OptionButton label="혼자서" onPress={() => handleSelect('혼자서')} />
            <OptionButton label="연인과" onPress={() => handleSelect('연인과')} />
          </View>
          <View style={styles.row}>
            <OptionButton label="친구와" onPress={() => handleSelect('친구와')} />
            <OptionButton label="가족과" onPress={() => handleSelect('가족과')} />
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
  container: {
    flex: 1,
  },
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
    marginBottom: 40,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
    gap: 16,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 18,
  },
  buttonText: {
    fontSize: 14,
    color: '#4DA6FF',
    fontWeight: '600',
  },
});