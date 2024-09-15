

import Swal from "sweetalert2";

export function showLoading() {
  document.getElementById('loading-spinner').style.display = 'block';
}

export function hideLoading() {
  document.getElementById('loading-spinner').style.display = 'none';
}

export function renderTripCards() {
  const todaySection = document.getElementById('current-section');
  const upcomingSection = document.getElementById('future-section');
  const pastSection = document.getElementById('historical-section');

  let hasTodayTrips = false;
  let hasUpcomingTrips = false;
  let hasPastTrips = false;

  const tripsData = JSON.parse(localStorage.getItem('tripData')) || [];
  const today = new Date();

  todaySection.innerHTML = '';
  upcomingSection.innerHTML = '';
  pastSection.innerHTML = '';

  function generateCard(trip, category) {
    const departureDate = new Date(trip.depart);
    let weatherDetails = '';

    if (category === 'today') {
      weatherDetails = `
        <p><strong>Temp:</strong> ${trip.weather.temp}°C</p>
        <p><strong>Feels Like:</strong> ${trip.weather.feelslike}°C</p>
      `;
    } else if (category === 'upcoming') {
      weatherDetails = `
        <p><strong>Max Temp:</strong> ${trip.weather.high}°C</p>
        <p><strong>Min Temp:</strong> ${trip.weather.low}°C</p>
      `;
    }

    return `
      <div class="trip-card ${category}" data-id="${trip.id}">
        <h2>Journey to: ${trip.countryName}</h2>
        <p><strong>Departure Date:</strong> ${departureDate.toLocaleDateString()}</p>
        <div class="images zoom">
          ${trip.imageUrls.map(img => `<img src="${img}" alt="Trip Image" class="zoom-image" />`).join('')}
        </div>
        <p><strong>Weather Summary:</strong> ${trip.weather.desc}</p>
        ${weatherDetails}
        <button type="button" class="remove-trip-btn">Delete Trip</button>
      </div>
    `;
  }

  tripsData.forEach(trip => {
    const departureDate = new Date(trip.depart);
    const isTodayTrip = departureDate.toDateString() === today.toDateString();
    const isUpcomingTrip = departureDate > today;

    if (isTodayTrip) {
      todaySection.innerHTML += generateCard(trip, 'today');
      hasTodayTrips = true;
    } else if (isUpcomingTrip) {
      upcomingSection.innerHTML += generateCard(trip, 'upcoming');
      hasUpcomingTrips = true;
    } else {
      pastSection.innerHTML += generateCard(trip, 'past');
      hasPastTrips = true;
    }
  });

  if (!hasTodayTrips) {
    todaySection.innerHTML = 'No trips for today.';
  }
  if (!hasUpcomingTrips) {
    upcomingSection.innerHTML = 'No upcoming trips.';
  }
  if (!hasPastTrips) {
    pastSection.innerHTML = 'No past trips.';
  }

  document.querySelectorAll('.remove-trip-btn').forEach(button => {
    button.addEventListener('click', event => {
      const tripElement = event.target.closest('.trip-card');
      const tripId = tripElement.dataset.id;

      Swal.fire({
        title: 'Confirm Deletion',
        text: 'Do you really want to remove this trip?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it'
      }).then(result => {
        if (result.isConfirmed) {
          showLoading();

          setTimeout(() => {
            let updatedTrips = JSON.parse(localStorage.getItem('tripData')) || [];
            updatedTrips = updatedTrips.filter(trip => trip.id !== Number(tripId));
            localStorage.setItem('tripData', JSON.stringify(updatedTrips));

            Swal.fire(
              'Deleted!',
              'The trip has been successfully removed.',
              'success'
            );

            renderTripCards();
            hideLoading();
          }, 1000);
        }
      });
    });
  });
}
