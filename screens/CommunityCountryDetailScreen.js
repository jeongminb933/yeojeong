// src/screens/CommunityCountryDetailScreen.js
import React, { useState } from 'react';
import { SafeAreaView, View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function CommunityCountryDetailScreen({ route }) {
  const navigation = useNavigation();
  const { category } = route.params || {};

  // 탭 상태: "all" | "popular"
  const [selectedTab, setSelectedTab] = useState('all');
  // "여행중인 사람만" 필터
  const [travelingOnly, setTravelingOnly] = useState(false);

  // 더미 데이터: 실제로는 백엔드 API로 가져오면 됨
  const dummyPosts = [
    {
      id: 'jslee',
      author: '이준서',
      date: '25.04 도쿄',
      tag: '여행중',
      title: '나 홀로 도쿄 여행 1일차',
      content: '히히 도쿄 재밌다 하하',
      image: 'https://placeimg.com/640/480/city',
      popular: false,
      traveling: true,
    },
    {
      id: 'mjkim',
      author: '김민재',
      date: '어제',
      tag: '',
      title: '삿포로 음식점 추천합니다!',
      content: '저렴하고 맛있는 음식점이 많아요.',
      image: 'https://placeimg.com/640/480/arch',
      popular: true,
      traveling: false,
    },
  ];

  // 필터 로직
  const filteredPosts = dummyPosts.filter((post) => {
    if (selectedTab === 'popular' && !post.popular) return false;
    if (travelingOnly && !post.traveling) return false;
    return true;
  });

  // 탭 UI
  const renderTabBar = () => {
    return (
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'all' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('all')}
        >
          <Text style={styles.tabButtonText}>전체 글</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tabButton, selectedTab === 'popular' && styles.tabButtonActive]}
          onPress={() => setSelectedTab('popular')}
        >
          <Text style={styles.tabButtonText}>인기 글</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setTravelingOnly(!travelingOnly)}
        >
          <Ionicons
            name={travelingOnly ? 'checkbox' : 'checkbox-outline'}
            size={18}
            color={travelingOnly ? '#FF5A5F' : '#888'}
          />
          <Text style={styles.filterText}>여행중인 사람만</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // 게시글 렌더
  const renderPostItem = ({ item }) => (
    <View style={styles.postContainer}>
      <View style={styles.postHeader}>
        <Text style={styles.postAuthor}>{item.author}</Text>
        <Text style={styles.postDate}>{item.date}</Text>
        {item.tag ? <Text style={styles.postTag}>{item.tag}</Text> : null}
      </View>
      <Text style={styles.postTitle}>{item.title}</Text>
      {item.image && <Image source={{ uri: item.image }} style={styles.postImage} />}
      <Text style={styles.postContent}>{item.content}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        {/* 상단 헤더: 뒤로가기 버튼 + 카테고리 제목 */}
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{category}</Text>
        </View>

        {/* 탭 & 필터 */}
        {renderTabBar()}

        {/* 게시글 목록 */}
        <FlatList
          data={filteredPosts}
          keyExtractor={(item) => item.id}
          renderItem={renderPostItem}
          contentContainerStyle={{ paddingBottom: 80 }}
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
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  tabButton: {
    marginRight: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  tabButtonActive: {
    borderBottomWidth: 2,
    borderColor: '#FF5A5F',
  },
  tabButtonText: {
    fontSize: 16,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  filterText: {
    fontSize: 14,
    marginLeft: 4,
    color: '#333',
  },
  postContainer: {
    padding: 15,
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  postAuthor: {
    fontWeight: 'bold',
    marginRight: 10,
  },
  postDate: {
    color: '#999',
    fontSize: 12,
    marginRight: 6,
  },
  postTag: {
    fontSize: 12,
    color: '#fff',
    backgroundColor: '#FF5A5F',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    overflow: 'hidden',
  },
  postTitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 5,
    backgroundColor: '#eee',
  },
  postContent: {
    fontSize: 14,
    color: '#333',
  },
});
































// // src/screens/CommunityCountryDetailScreen.js
// import React, { useState } from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';

// export default function CommunityCountryDetailScreen({ route }) {
//   // route.params.category 가 예: "일본"
//   const { category } = route.params || {};

//   // 탭 상태: "all" | "popular"
//   const [selectedTab, setSelectedTab] = useState('all');
//   // "여행중인 사람만" 필터
//   const [travelingOnly, setTravelingOnly] = useState(false);

//   // 더미 데이터: 실제로는 백엔드 API로 가져오면 됨
//   const dummyPosts = [
//     {
//       id: 'jslee',
//       author: '이준서',
//       date: '25.04 도쿄',
//       tag: '여행중',
//       title: '나 홀로 도쿄 여행 1일차',
//       content: '히히 도쿄 재밌다 하하',
//       image: 'https://placeimg.com/640/480/city',
//       popular: false,
//       traveling: true,
//     },
//     {
//       id: 'mjkim',
//       author: '김민재',
//       date: '어제',
//       tag: '',
//       title: '삿포로 음식점 추천합니다!',
//       content: '저렴하고 맛있는 음식점이 많아요.',
//       image: 'https://placeimg.com/640/480/arch',
//       popular: true,
//       traveling: false,
//     },
//   ];

//   // 필터 로직
//   const filteredPosts = dummyPosts.filter((post) => {
//     // 인기 글 탭 선택 시, popular=true 인 글만
//     if (selectedTab === 'popular' && !post.popular) return false;
//     // "여행중인 사람만" 필터가 켜져 있고, post.traveling=false 면 제외
//     if (travelingOnly && !post.traveling) return false;
//     return true;
//   });

//   // 탭 UI
//   const renderTabBar = () => {
//     return (
//       <View style={styles.tabContainer}>
//         {/* 전체 글 탭 */}
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'all' && styles.tabButtonActive]}
//           onPress={() => setSelectedTab('all')}
//         >
//           <Text style={styles.tabButtonText}>전체 글</Text>
//         </TouchableOpacity>

//         {/* 인기 글 탭 */}
//         <TouchableOpacity
//           style={[styles.tabButton, selectedTab === 'popular' && styles.tabButtonActive]}
//           onPress={() => setSelectedTab('popular')}
//         >
//           <Text style={styles.tabButtonText}>인기 글</Text>
//         </TouchableOpacity>

//         {/* "여행중인 사람만" 필터 버튼 */}
//         <TouchableOpacity
//           style={styles.filterButton}
//           onPress={() => setTravelingOnly(!travelingOnly)}
//         >
//           <Ionicons
//             name={travelingOnly ? 'checkbox' : 'checkbox-outline'}
//             size={18}
//             color={travelingOnly ? '#FF5A5F' : '#888'}
//           />
//           <Text style={styles.filterText}>여행중인 사람만</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   // 게시글 렌더
//   const renderPostItem = ({ item }) => (
//     <View style={styles.postContainer}>
//       <View style={styles.postHeader}>
//         <Text style={styles.postAuthor}>{item.author}</Text>
//         <Text style={styles.postDate}>{item.date}</Text>
//         {item.tag ? <Text style={styles.postTag}>{item.tag}</Text> : null}
//       </View>
//       <Text style={styles.postTitle}>{item.title}</Text>
//       {item.image ? (
//         <Image source={{ uri: item.image }} style={styles.postImage} />
//       ) : null}
//       <Text style={styles.postContent}>{item.content}</Text>
//     </View>
//   );

//   return (
//     <View style={styles.container}>
//       {/* 상단 헤더 */}
//       <View style={styles.headerContainer}>
//         <Text style={styles.headerTitle}>{category}</Text>
//       </View>

//       {/* 탭 & 필터 */}
//       {renderTabBar()}

//       {/* 게시글 목록 */}
//       <FlatList
//         data={filteredPosts}
//         keyExtractor={(item) => item.id}
//         renderItem={renderPostItem}
//         contentContainerStyle={{ paddingBottom: 80 }}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   headerContainer: {
//     paddingTop: 40,
//     paddingBottom: 10,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   headerTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//   },
//   tabContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   tabButton: {
//     marginRight: 15,
//     paddingVertical: 5,
//     paddingHorizontal: 10,
//   },
//   tabButtonActive: {
//     borderBottomWidth: 2,
//     borderColor: '#FF5A5F',
//   },
//   tabButtonText: {
//     fontSize: 16,
//   },
//   filterButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginLeft: 'auto',
//     borderWidth: 1,
//     borderColor: '#ccc',
//     borderRadius: 4,
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//   },
//   filterText: {
//     fontSize: 14,
//     marginLeft: 4,
//     color: '#333',
//   },
//   postContainer: {
//     padding: 15,
//     borderBottomWidth: 0.5,
//     borderColor: '#ccc',
//   },
//   postHeader: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 5,
//   },
//   postAuthor: {
//     fontWeight: 'bold',
//     marginRight: 10,
//   },
//   postDate: {
//     color: '#999',
//     fontSize: 12,
//     marginRight: 6,
//   },
//   postTag: {
//     fontSize: 12,
//     color: '#fff',
//     backgroundColor: '#FF5A5F',
//     paddingHorizontal: 4,
//     paddingVertical: 2,
//     borderRadius: 4,
//     overflow: 'hidden',
//   },
//   postTitle: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   postImage: {
//     width: '100%',
//     height: 200,
//     borderRadius: 8,
//     marginBottom: 5,
//     backgroundColor: '#eee',
//   },
//   postContent: {
//     fontSize: 14,
//     color: '#333',
//   },
// });