// utils/mapFlightData.js

export function mapFlightData(apiResponse) {
    // 실제 응답 구조에 맞게 바꿔야 함 (예시는 dummy 구조)
    const flight = apiResponse?.itineraries?.[0]; // 가장 첫 번째 항공편
  
    return {
      price: flight?.pricingOptions?.[0]?.price?.amount || null,
      airline: flight?.legs?.[0]?.carrier?.name || null,
      departureTime: flight?.legs?.[0]?.departure || null,
      arrivalTime: flight?.legs?.[0]?.arrival || null,
      departureAirport: flight?.legs?.[0]?.origin?.name || null,
      arrivalAirport: flight?.legs?.[0]?.destination?.name || null,
    };
  }
  
  