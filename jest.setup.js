// Mock the global Client object
global.Client = {
    apiConfig: {
      weatherbit: {
        url: 'https://api.weatherbit.io/v2.0/',
        apiKey: 'testapikey',
      },
    },
    fetchKeys: jest.fn(),
    fetchGeonamesData: jest.fn(),
    fetchPixabayImages: jest.fn(),
    fetchWeatherData: jest.fn(),
    daysRemaining: jest.fn(),
    saveTrip: jest.fn(),
    renderTripCards: jest.fn(),
  };
  