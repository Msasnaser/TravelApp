import Swal from "sweetalert2";

const serverURL = "http://localhost:8081/api/getKeys";

// تهيئة apiConfig بدون مفاتيح
export let apiConfig = {
  geonames: {
    url: "",
    username: "",
  },
  weatherbit: {
    url: "",
    apiKey: "",
  },
  pixabay: {
    url: "",
    apiKey: "",
  },
};

// جلب المفاتيح من الخادم لتعزيز الأمان
export async function fetchKeys() {
  try {
    const response = await fetch(serverURL);

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    apiConfig = {
      geonames: {
        url: "https://secure.geonames.org/",
        username: data.username,
      },
      weatherbit: {
        url: "https://api.weatherbit.io/v2.0/",
        apiKey: data.weatherKey,
      },
      pixabay: {
        url: "https://pixabay.com/api/",
        apiKey: data.pixabayKey,
      },
    };
  } catch (error) {
    Swal.fire({
      title: "Error!",
      text: "Error fetching API configuration",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}
