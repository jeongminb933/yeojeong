
import React from 'react';
import { View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CommunityCategoryScreen() {
  const navigation = useNavigation();

  // 해외/국내 커뮤니티 섹션 정의
  const sections = [
    {
      title: '해외 커뮤니티',
      icon: 'airplane-outline',
      data: ['일본', '유럽', '동남아시아', '미국', '남태평양'],
    },
    {
      title: '국내 커뮤니티',
      icon: 'flag-outline',
      data: ['제주', '부산', '강릉', '속초', '여수', '경주'],
    },
  ];

  // 각 항목을 탭하면, 해당 카테고리로 이동하는 예시
  // (필요에 따라 다른 화면으로 navigation.navigate(...) 가능)
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        // 예: navigation.navigate('CommunityDetail', { category: item });
        console.log(item, '카테고리 선택');
      }}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  // 섹션 헤더에 아이콘 + 제목 표시
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionHeaderContainer}>
      <Ionicons name={section.icon} size={20} color="#333" style={{ marginRight: 5 }} />
      <Text style={styles.sectionHeaderText}>{section.title}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>커뮤니티 카테고리</Text>
      <SectionList
        sections={sections}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.listContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        SectionSeparatorComponent={() => <View style={styles.sectionSeparator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sectionHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 8,
  },
  sectionHeaderText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  item: {
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  itemText: {
    fontSize: 15,
    color: '#333',
  },
  separator: {
    height: 0.5,
    backgroundColor: '#ccc',
  },
  sectionSeparator: {
    height: 1,
    backgroundColor: '#ccc',
    marginTop: 10,
  },
});