// src/screens/CommunityHomeScreen.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SectionList } from 'react-native';

export default function CommunityHomeScreen({ navigation }) {
  // 해외/국내 카테고리를 섹션 형태로 준비
  const sections = [
    {
      title: '해외 커뮤니티',
      data: ['일본', '유럽', '동남아시아', '미국', '남태평양'],
    },
    {
      title: '국내 커뮤니티',
      data: ['제주', '부산', '강릉', '속초', '여수', '경주'],
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          // 카테고리 선택 → CommunityCategoryScreen 으로 이동
          navigation.navigate('CommunityCategory', { category: item });
        }}
      >
        <Text style={styles.itemText}>{item}</Text>
      </TouchableOpacity>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <Text style={styles.sectionHeader}>{title}</Text>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>커뮤니티</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionHeader: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 5 },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  itemText: { fontSize: 16 },
});