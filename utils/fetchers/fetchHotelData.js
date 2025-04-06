// utils/fetchers/fetchHotelData.js
export async function fetchHotelData({ dest_id = "Tokyo", checkin = "2025-07-01", checkout = "2025-07-03" }) {
    const url = `https://booking-com.p.rapidapi.com/v1/hotels/search?checkout_date=${checkout}&checkin_date=${checkin}&dest_type=city&dest_id=${dest_id}&adults_number=2`;
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd07d7ff48dmsh85812f0781e2df1p17333ajsnaace49342871',
        'X-RapidAPI-Host': 'booking-com.p.rapidapi.com',
      },
    };
  
    const res = await fetch(url, options);
    return await res.json();
  }
  