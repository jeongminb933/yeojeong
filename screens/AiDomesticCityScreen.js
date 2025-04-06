import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const CITIES = [
  '제주', '부산', '강릉 속초', '여수', '경주', '전주', '포항 안동', '가평 양평'
];

export default function AiDomesticCityScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { companion, style, budget, location, extra } = route.params;

  const handleSelect = (selectedCity) => {
    navigation.navigate('AiScreenstep5', {
      companion,
      style,
      budget,
      location,
      city: selectedCity,
      extra,
    });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require('../assets/domestic-bg.png')}
        style={styles.container}
        resizeMode="cover"
      >
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>떠나고 싶은 도시는?</Text>
        <Text style={styles.subtitle}>도시 1곳을 선택해주세요.</Text>

        <View style={styles.columns}>
          {CITIES.map((city, index) => (
            <TouchableOpacity key={index} style={styles.button} onPress={() => handleSelect(city)}>
              <Text style={styles.buttonText}>{city}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
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
    marginTop: 40,
  },
  subtitle: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  columns: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 10,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    margin: 6,
  },
  buttonText: {
    color: '#4DA6FF',
    fontWeight: 'bold',
  },
});
