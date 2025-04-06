// utils/mapAccommodationData.js

export function mapAccommodationData(apiResponse) {
    const hotel = apiResponse?.results?.[0];
  
    return {
      price: hotel?.priceBreakdown?.grossPrice?.value || null,
      name: hotel?.hotelName || hotel?.name || null,
      location: {
        lat: hotel?.latitude || null,
        lng: hotel?.longitude || null,
      },
      checkIn: hotel?.checkin?.from || null,
      checkOut: hotel?.checkout?.until || null,
      rating: hotel?.reviewScore || null,
    };
  }
  