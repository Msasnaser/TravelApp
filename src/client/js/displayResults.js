import Swal from "sweetalert2";

export function showSpinner() {
  document.getElementById('spinner').style.display = 'block';
}

export function hideSpinner() {
  document.getElementById('spinner').style.display = 'none';
}
export function displayTripData() {
  const todayscontainer = document.getElementById('today-container');
  const upcomingscontainer = document.getElementById('upcoming-container');
  const oldscontainer = document.getElementById('old-container');
  
  let hasTodayTrips = false;
  let hasUpcomingTrips = false;
  let hasOldTrips = false;
  
  const tripArray = JSON.parse(localStorage.getItem('tripData')) || [];
  const currentDate = new Date();
  
  todayscontainer.innerHTML = '';
  upcomingscontainer.innerHTML = '';
  oldscontainer.innerHTML = '';
  
  function createTripCard(data, category) {
    const depart = new Date(data.depart);
    let weatherInfo = '';
    if (category === 'today') {
      weatherInfo = `
        <p><strong>Temperature:</strong> ${data.weather.temp}°C</p>
        <p><strong>Feels Like:</strong> ${data.weather.feelslike}°C</p>
      `;
    } else if (category === 'upcoming') {
      weatherInfo = `
        <p><strong>High Temperature:</strong> ${data.weather.high}°C</p>
        <p><strong>Low Temperature:</strong> ${data.weather.low}°C</p>
      `;
    }
    
    return `
      <div class="trip-card ${category}" data-id="${data.id}">
        <h2>My Trip to: ${data.countryName}</h2>
        <p><strong>Departing:</strong> ${depart.toLocaleDateString()}</p>
         <div class="images zoom">
          ${data.imageUrls.map(url => `<img src="${url}" alt="Trip Image" class="zoom-image" />`).join('')}
        </div>
        <p><strong>Weather Description:</strong> ${data.weather.desc}</p>
        ${weatherInfo}
       
        <button type="button" class="delete">Remove Trip</button>
      </div>
    `;
  }
  
  tripArray.forEach(data => {
    const depart = new Date(data.depart);
    const isToday = depart.toDateString() === currentDate.toDateString();
    const isUpcoming = depart > currentDate;
    
    if (isToday) {
      todayscontainer.innerHTML += createTripCard(data, 'today');
      hasTodayTrips = true;
    } else if (isUpcoming) {
      upcomingscontainer.innerHTML += createTripCard(data, 'upcoming');
      hasUpcomingTrips = true;
    } else {
      oldscontainer.innerHTML += createTripCard(data, 'old');
      hasOldTrips = true;
    }
  });
  
  if (!hasTodayTrips) {
    todayscontainer.innerHTML = 'Currently, there are no today trips to display.';
  }
  if (!hasUpcomingTrips) {
    upcomingscontainer.innerHTML = 'Currently, there are no upcoming trips to display.';
  }
  if (!hasOldTrips) {
    oldscontainer.innerHTML = 'Currently, there are no old trips to display.';
  }

  document.querySelectorAll('.delete').forEach(button => {
    button.addEventListener('click', (event) => {
      const tripCard = event.target.closest('.trip-card');
      const id = tripCard.dataset.id;

      Swal.fire({
        title: 'Are you sure?',
        text: 'This trip will be removed from your list.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, remove it!',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          showSpinner(); 

          setTimeout(() => { 
            let tripArray = JSON.parse(localStorage.getItem('tripData')) || [];
            tripArray = tripArray.filter(trip => trip.id !== Number(id));
            localStorage.setItem('tripData', JSON.stringify(tripArray));

          Swal.fire(
              'Removed!',
              'Your trip has been removed.',
              'success'
            );

            displayTripData();
            hideSpinner(); 
          }, 1000); 
        }
      });
    });
  });
}