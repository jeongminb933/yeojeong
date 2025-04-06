// utils/mapActivityData.js

export function mapActivityData(apiResponse) {
    const activity = apiResponse?.predictions?.[0];
  
    return {
      name: activity?.structured_formatting?.main_text || null,
      price: null, // Google Places는 가격 정보 없음
      startTime: null, // 시간 정보 없음
      endTime: null,
      location: {
        lat: null,
        lng: null,
      },
      rating: null,
    };
  }
  