

export async function fetchGeonamesData(countryName, departureDate) {
  try {
    const geonamesUrl = `${Client.apiConfig.geonames.url}searchJSON`;
    const queryParams = new URLSearchParams({
      q: countryName,
      maxRows: 10,
      username: Client.apiConfig.geonames.username
    }).toString();

    const response = await fetch(`${geonamesUrl}?${queryParams}`);
    const jsonResponse = await response.json();
    
    if (jsonResponse.geonames.length === 0) {
      throw new Error('No geoname data found.');
    }

    const { lat: latitude, lng: longitude, countryName: name } = jsonResponse.geonames[0];
    
    const fetchWeatherData = await Client.fetchWeatherData(latitude, longitude);
    const imageUrls = await Client.fetchPixabayImages(name);
    
    const result = {
      countryName: name,
      weather: fetchWeatherData || "",
      ImageUrls: imageUrls || "",
      depart: departureDate,
    };

    return result;
  } catch (error) {
    console.error('Error fetching geonames data:', error);
    return {
      countryName: countryName,
      weather: "",
      ImageUrls: "",
      depart: departureDate,
    };
  }
}
