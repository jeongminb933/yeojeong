import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  SafeAreaView,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

export default function AiOverseasCityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location, extra } = route.params;

  const handleCitySelect = (selectedCity) => {
    navigation.navigate('AiScreenstep5', {
      companion,
      style,
      budget,
      location,
      extra,
      city: selectedCity,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/abroad-background.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>떠나고 싶은 도시는?</Text>
        <Text style={styles.subtitle}>도시 1곳을 선택해주세요.</Text>

        <View style={styles.sectionGroup}>
          <Text style={styles.sectionLabel}>일본</Text>
          <View style={styles.rowWrap}>
            {['도쿄', '오사카', '나고야', '오키나와', '후쿠오카', '시즈오카', '삿포로', '히로시마'].map((city) => (
              <OptionButton key={city} label={city} onPress={() => handleCitySelect(city)} />
            ))}
          </View>

          <Text style={[styles.sectionLabel, { marginTop: 20 }]}>중국</Text>
          <View style={styles.rowWrap}>
            {['가오슝', '홍콩', '상하이', '칭다오', '타이베이', '베이징'].map((city) => (
              <OptionButton key={city} label={city} onPress={() => handleCitySelect(city)} />
            ))}
          </View>
        </View>
      </ImageBackground>
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
  background: {
    flex: 1,
    paddingTop: 80,
    paddingHorizontal: 24,
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 24,
    zIndex: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionGroup: {
    marginTop: 20,
  },
  sectionLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    margin: 4,
  },
  buttonText: {
    color: '#4DA6FF',
    fontWeight: 'bold',
    fontSize: 13,
  },
});
