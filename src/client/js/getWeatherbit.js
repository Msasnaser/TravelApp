

export async function fetchWeatherData(latitude, longitude) {
  let weatherInfo;
  
  const apiKey = Client.apiConfig.weatherbit.apiKey;
  const baseUrl = Client.apiConfig.weatherbit.url;

  if (Client.daysRemaining === "0") {
    const currentWeatherUrl = `${baseUrl}current?lat=${latitude}&lon=${longitude}&key=${apiKey}`;
    const response = await fetch(currentWeatherUrl);
    const responseBody = await response.text();
    const parsedData = JSON.parse(responseBody);

    const { temp, app_temp: feelsLike, weather: { description } } = parsedData.data[0];
    weatherInfo = {
      temp,
      feelsLike,
      description
    };
  } else if (Number(Client.daysRemaining) > 0) {
    const forecastUrl = `${baseUrl}forecast/daily?lat=${latitude}&lon=${longitude}&days=${parseInt(Client.daysRemaining, 10) + 1}&key=${apiKey}`;
    const response = await fetch(forecastUrl);
    const responseBody = await response.text();
    const parsedData = JSON.parse(responseBody);

    const forecast = parsedData.data[Client.daysRemaining];
    const { low_temp: lowTemp, high_temp: highTemp, weather: { description } } = forecast;
    weatherInfo = {
      highTemp,
      lowTemp,
      description
    };
  }

  return weatherInfo;
}
