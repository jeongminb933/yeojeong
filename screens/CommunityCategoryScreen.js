// src/screens/CommunityCategoryScreen.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function CommunityCategoryScreen({ route, navigation }) {
  const { category } = route.params || {};
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 실제로는 백엔드/API를 통해 게시글을 가져오는 로직이 들어가야 합니다.
    // 여기서는 예시를 위한 더미 데이터를 사용합니다.
    const dummyPosts = [
      {
        id: '1',
        title: `${category} 여행 1일차`,
        content: '첫날 도착해서 관광지를 둘러보고 현지 맛집도 방문했습니다.',
        image: 'https://placeimg.com/640/480/nature',
      },
      {
        id: '2',
        title: `${category} 맛집 탐방`,
        content: '현지인 추천 맛집에서 식사를 하며 여행의 즐거움을 더했습니다.',
        image: 'https://placeimg.com/640/480/arch',
      },
      {
        id: '3',
        title: `${category} 문화 체험`,
        content: '전통 시장과 박물관을 방문하여 문화를 체험했습니다.',
        image: 'https://placeimg.com/640/480/tech',
      },
    ];
    setPosts(dummyPosts);
  }, [category]);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.postContainer}
      onPress={() => {
        // 필요에 따라 게시글 상세 화면으로 이동할 수 있습니다.
        navigation.navigate('CommunityDetail', { post: item });
      }}
    >
      <Image source={{ uri: item.image }} style={styles.postImage} />
      <View style={styles.postTextContainer}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postContent} numberOfLines={2}>{item.content}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{category} 커뮤니티</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  postContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#fafafa',
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 1, // 안드로이드 그림자 효과 (iOS는 shadow 속성 추가 필요)
  },
  postImage: {
    width: 100,
    height: 100,
  },
  postTextContainer: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});