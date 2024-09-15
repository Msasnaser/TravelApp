
import Swal from 'sweetalert2';

async function saveTrip(data) {
  try {
  
    const departureDate = new Date(await data.depart);
    const weatherInfo = await data.weather;
    const images = await data.ImageUrls;

    const newTrip = {
      id: Date.now(),
      country: data.countryName,
      departure: departureDate.toISOString(),
      weather: {
        description: weatherInfo?.desc || '',
        temperature: weatherInfo?.temp || '',
        feelsLike: weatherInfo?.feelslike || '',
        highTemp: weatherInfo?.high || '',
        lowTemp: weatherInfo?.low || ''
      },
      images: images
    };

    const existingTrips = JSON.parse(localStorage.getItem('trips')) || [];

    existingTrips.push(newTrip);

    localStorage.setItem('trips', JSON.stringify(existingTrips));

    Swal.fire({
      title: 'Trip Saved!',
      text: 'Your trip details have been successfully recorded.',
      icon: 'success',
      confirmButtonText: 'Got it!'
    });

    // Update UI
    Client.showLoading();
    Client.updateTripDisplay();
    Client.hideLoading();

  } catch (error) {
    Swal.fire({
      title: 'Oops!',
      text: 'There was a problem saving your trip. Please try again.',
      icon: 'error',
      confirmButtonText: 'Retry'
    });
  }
}

export { saveTrip };
