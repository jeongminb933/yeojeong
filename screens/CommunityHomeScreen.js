// src/screens/CommunityCategoryScreen.js
import React from 'react';
import { SafeAreaView, View, Text, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
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

  // 각 항목을 탭하면, 해당 카테고리로 이동하는 onPress 함수
  // 여기서는 '일본' 항목에 대해 명시적으로 CommunityDetail로 이동하도록 처리했습니다.
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => {
        if (item === '일본') {
          navigation.navigate('CommunityDetail', { category: '일본' });
        } else {
          console.log(item, '카테고리 선택');
        }
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
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* 상단 헤더: 뒤로가기 버튼 + 제목 */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>커뮤니티 카테고리</Text>
        </View>
        
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40, // iOS 노치 고려
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: 'bold',
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