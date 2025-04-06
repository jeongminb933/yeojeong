// utils/fetchFlightData.js
export async function fetchFlightData({ origin, destinationId, date }) {
    const url = `https://skyscanner89.p.rapidapi.com/flights/one-way/list?origin=${origin}&originId=&destination=${destinationId}&destinationId=&date=${date}`;
  
    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': 'd07d7ff48dmsh85812f0781e2df1p17333ajsnaace49342871',
        'x-rapidapi-host': 'skyscanner89.p.rapidapi.com',
      },
    };
  
    try {
      const res = await fetch(url, options);
      const json = await res.json();
      return json;
    } catch (err) {
      console.error('❌ 항공권 API 호출 실패:', err.message);
      return null;
    }
  }
  