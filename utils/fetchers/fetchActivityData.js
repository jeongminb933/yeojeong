// utils/fetchers/fetchActivityData.js
export async function fetchActivityData({ lat = 35.68, lng = 139.76, keyword = "tourist spot" }) {
    const url = 'https://google-map-places-new-v2.p.rapidapi.com/v1/places:autocomplete';
  
    const body = {
      input: keyword,
      locationBias: {
        circle: {
          center: { latitude: lat, longitude: lng },
          radius: 10000,
        },
      },
      includeQueryPredictions: true,
    };
  
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-RapidAPI-Key': 'd07d7ff48dmsh85812f0781e2df1p17333ajsnaace49342871',
        'X-RapidAPI-Host': 'google-map-places-new-v2.p.rapidapi.com',
        'X-Goog-FieldMask': '*',
      },
      body: JSON.stringify(body),
    };
  
    const res = await fetch(url, options);
    return await res.json();
  }
  