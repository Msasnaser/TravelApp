
import { retrieveApiConfig}from '../src/client/js/app';

// Mock the fetch function
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      geonames: { url: "https://secure.geonames.org/", username: "testuser" },
      pixabay: { apiKey: "testpixabaykey", url: "https://pixabay.com/api/" },
      weatherbit: { apiKey: "testweatherkey", url: "https://api.weatherbit.io/v2.0/" }
    }),
  })
);

describe('Client API Fetch', () => {
  it('should update apiConfig on successful fetch', async () => {
    // Mock the fetchKeys function if needed
    const mockConfig = {
      username: 'testuser',
      weatherKey: 'testweatherkey',
      pixabayKey: 'testpixabaykey',
    };
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => mockConfig,
    });

    // Call the function to retrieve the API configuration
    const apiConfig = await retrieveApiConfig();

    // Check the fetched API configuration
    expect(apiConfig).toEqual({
      geonames: {
        baseUrl: 'https://secure.geonames.org/',
        userName: 'testuser',
      },
      weatherbit: {
        baseUrl: 'https://api.weatherbit.io/v2.0/',
        apiToken: 'testweatherkey',
      },
      pixabay: {
        baseUrl: 'https://pixabay.com/api/',
        apiToken: 'testpixabaykey',
      },
    });
  });
});

