

import Swal from 'sweetalert2';
const configUrl = 'http://localhost:8081/api/getKeys';

export let apiEndpoints = {
  geonames: {
    baseUrl: '',
    userName: '',
  },
  weatherbit: {
    baseUrl: '',
    apiToken: '',
  },
  pixabay: {
    baseUrl: '',
    apiToken: '',
  },
};
async function retrieveApiConfig() {
  console.log('Inside retrieveApiConfig function');
  try {
    const url = configUrl;
    console.log('Fetching URL:', url);
    const response = await fetch(url);
    console.log('Received response:', response);
    if (!response.ok) {
      throw new Error('Unable to fetch configuration from the server');
    }
    const configData = await response.json();
    console.log('Received API response:', configData);
    updateApiEndpoints(configData);
    console.log('Updated apiEndpoints:', apiEndpoints);
    return apiEndpoints; 
  } catch (error) {
    console.error('Error fetching API configuration:', error.message);
    console.error('Error fetching API configuration:', error.stack);
    Swal.fire({
      title: 'Error',
      text: 'Could not load API configuration',
      icon: 'error',
      confirmButtonText: 'Close',
    });
    return {}; 
  }
}

function updateApiEndpoints(config) {
  apiEndpoints.geonames.baseUrl = 'https://secure.geonames.org/';
  apiEndpoints.geonames.userName = config.username;

  apiEndpoints.weatherbit.baseUrl = 'https://api.weatherbit.io/v2.0/';
  apiEndpoints.weatherbit.apiToken = config.weatherKey;

  apiEndpoints.pixabay.baseUrl = 'https://pixabay.com/api/';
  apiEndpoints.pixabay.apiToken = config.pixabayKey;
}
export { retrieveApiConfig};