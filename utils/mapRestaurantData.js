// utils/mapRestaurantData.js

export function mapRestaurantData(apiResponse) {
    const restaurant = apiResponse?.data?.[0];
  
    return {
      name: restaurant?.name || null,
      priceRange: restaurant?.price_level || null,
      rating: restaurant?.rating || null,
      location: {
        lat: restaurant?.latitude || null,
        lng: restaurant?.longitude || null,
      },
      cuisineType: restaurant?.cuisine?.[0]?.name || null,
    };
  }
  