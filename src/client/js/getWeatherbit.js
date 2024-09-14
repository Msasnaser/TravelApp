export async function WeatherData(lat, lng) {
  let response;
  if (Client.daysRemaining == "0") {
    response = await fetch(
      `${Client.apiConfig.weatherbit.url}current?lat=${lat}&lon=${lng}&key=${Client.apiConfig.weatherbit.apiKey}`
    );
    const data = await response.text();
    const dataObject = JSON.parse(data);
    let weather = {
      temp: dataObject.data[0].temp,
      feelslike: dataObject.data[0].app_temp,
      desc: dataObject.data[0].weather.description,
    };
    return weather;
  } else if (Client.daysRemaining > "0") {
    response = await fetch(
      `${
        Client.apiConfig.weatherbit.url
      }forecast/daily?lat=${lat}&lon=${lng}&days=${
        Client.daysRemaining + 1
      }&key=${Client.apiConfig.weatherbit.apiKey}`
    );
    const data = await response.text();
    const dataObject = JSON.parse(data);

    const resObject = dataObject.data[Client.daysRemaining];
    let { low_temp, high_temp } = resObject;
    let { description } = resObject.weather;
    let weather = {
      high: high_temp,
      low: low_temp,
      desc: description,
    };
    return weather;
  } else {
    //display nothing about old weather info
    return;
  }
}
