
import { apiEndpoints, retrieveApiConfig } from './js/app.js';
import { fetchGeonamesData } from './js/getGeoname.js';
import { fetchPixabayImages } from './js/getPixabayImage.js';
import { fetchWeatherData } from './js/getWeatherbit.js';
import Swal from 'sweetalert2';
import { renderTripCards, showLoading, hideLoading } from './js/displayResults.js';
import { saveTrip } from './js/storeTrip.js';

// sass files
 import './styles/base.scss';
 import './styles/footer.scss';
 import './styles/form.scss';
 import './styles/header.scss';
 import './styles/responsive.scss';
 

let daysRemaining;

document.addEventListener('DOMContentLoaded', () => {
   const addTripButton = document.querySelector('.trip-add');
   const overlay = document.getElementById('popup');
   const closeButton = document.querySelector('.close-icon');

   if (addTripButton && overlay && closeButton) {
       addTripButton.addEventListener('click', () => {
           overlay.style.display = 'flex';
           document.getElementById('destination').value = '';
           document.getElementById('departure-date').value = '';
       });

       closeButton.addEventListener('click', () => {
           overlay.style.display = 'none';
           document.getElementById('destination').value = '';
           document.getElementById('departure-date').value = '';
       });

       overlay.addEventListener('click', (event) => {
           if (event.target === overlay) {
               overlay.style.display = 'none';
               document.getElementById('destination').value = '';
               document.getElementById('departure-date').value = '';
           }
       });
   }

   renderTripCards();
   handleNavigation();
});

const MAX_DAYS_AHEAD = 16;
const today = new Date();

const createTravelForm = document.getElementById('trip-form');
if (createTravelForm) {
   createTravelForm.addEventListener('submit', async function (event) {
       event.preventDefault();
       const country = document.getElementById('destination').value;
       const startDate = new Date(document.getElementById('departure-date').value);

       const diffInMs = startDate - today;
       const msPerDay = 24 * 60 * 60 * 1000;
       daysRemaining = Math.ceil(diffInMs / msPerDay);

       if (daysRemaining > MAX_DAYS_AHEAD) {
           Swal.fire({
               title: 'Date Error',
               text: `You cannot add a trip more than ${MAX_DAYS_AHEAD} days in advance.`,
               icon: 'warning',
               confirmButtonText: 'OK',
           });
           return;
       }

       try {
           await retrieveApiConfig(); // Updated function call
           let info = await fetchGeonamesData(country, startDate);
           saveTrip(info);
           document.getElementById('destination').value = '';
           document.getElementById('departure-date').value = '';
           document.getElementById('popup').style.display = 'none';
       } catch (error) {
           Swal.fire({
               title: 'Error!',
               text: 'There was an error while processing the trip details.',
               icon: 'error',
               confirmButtonText: 'OK',
           });
       }
   });
}

function handleNavigation() {
   const currentSection = document.getElementById('current-section');
   const futureSection = document.getElementById('future-section');
   const historicalSection = document.getElementById('historical-section');

   const navItems = document.querySelectorAll('.nav-link');
   navItems.forEach((item) => {
       item.addEventListener('click', (event) => {
           event.preventDefault();
           navItems.forEach((nav) => nav.classList.remove('active'));

           item.classList.add('active');
           currentSection.style.display = 'none';
           futureSection.style.display = 'none';
           historicalSection.style.display = 'none';

           const target = event.target.getAttribute('href').substring(1) + '-container';
           const targetElement = document.getElementById(target);
           if (targetElement) {
               targetElement.style.display = 'block';
           }
       });
   });

   if (currentSection) {
    currentSection.style.display = 'block';
   }
}

export {
   apiEndpoints,
   retrieveApiConfig,
   fetchGeonamesData,
   fetchPixabayImages,
   fetchWeatherData,
   saveTrip,
   renderTripCards,
   showLoading,
   hideLoading,
   daysRemaining,
};






