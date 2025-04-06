// utils/fetchers/fetchRestaurantData.js
export async function fetchRestaurantData({ locationId = "293919" }) {
    const url = `https://tripadvisor16.p.rapidapi.com/api/v1/restaurant/searchRestaurants?locationId=${locationId}`;
  
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': 'd07d7ff48dmsh85812f0781e2df1p17333ajsnaace49342871',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
      },
    };
  
    const res = await fetch(url, options);
    return await res.json();
  }
  