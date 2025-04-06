// src/screens/CommunityCategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

export default function CommunityCategoryScreen({ route }) {
  const { category } = route.params || {}; // 선택된 카테고리 (예: '일본')
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 실제로는 백엔드/API를 통해 카테고리별 게시글을 가져오는 로직
    // 여기서는 더미 데이터로 예시
    const dummyPosts = [
      {
        id: '1',
        title: `${category} 여행 1일차`,
        content: '첫날 도착해서 ~~~',
        image: 'https://placeimg.com/640/480/nature', // 임의 이미지
      },
      {
        id: '2',
        title: `${category} 맛집 탐방`,
        content: '현지인 추천 음식점 방문 ~~~',
        image: 'https://placeimg.com/640/480/arch',
      },
    ];
    setPosts(dummyPosts);
  }, [category]);

  const renderItem = ({ item }) => (
    <View style={styles.postContainer}>
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent}>{item.content}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category} 커뮤니티</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingHorizontal: 20 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', paddingTop: 50 },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10, textAlign: 'center' },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 10,
  },
  postImage: { width: 80, height: 80, marginRight: 10, borderRadius: 8 },
  postTitle: { fontSize: 16, fontWeight: 'bold' },
  postContent: { fontSize: 14, color: '#555' },
});