document.addEventListener("DOMContentLoaded", function () {
  // Update current date
  updateDate();

  // Event listeners
  document
    .getElementById("search-btn")
    .addEventListener("click", searchWeather);
  document
    .getElementById("location-btn")
    .addEventListener("click", getLocationWeather);
  document
    .getElementById("location-input")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        searchWeather();
      }
    });

  // Initial load - you can set a default city or leave it empty
  fetchWeather("Metro Manila");
});

function updateDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const today = new Date();
  document.getElementById("current-date").textContent =
    today.toLocaleDateString("en-US", options);
}

function searchWeather() {
  const location = document.getElementById("location-input").value.trim();
  if (location) {
    // Show loading state
    const searchBtn = document.getElementById("search-btn");
    searchBtn.innerHTML = '<span class="loading"></span>';

    fetchWeather(location);

    // Reset button after a short delay (in real app, reset after API response)
    setTimeout(() => {
      searchBtn.innerHTML = '<i class="fas fa-search"></i>';
    }, 1000);
  }
}

function getLocationWeather() {
  if (navigator.geolocation) {
    // Show loading state
    const locationBtn = document.getElementById("location-btn");
    locationBtn.innerHTML = '<span class="loading"></span>';

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        fetchWeatherByCoords(lat, lon);

        // Reset button
        locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
      },
      (error) => {
        alert(
          "Unable to retrieve your location. Please enable location services or search manually."
        );
        console.error(error);
        // Reset button
        locationBtn.innerHTML = '<i class="fas fa-location-arrow"></i>';
      }
    );
  } else {
    alert(
      "Geolocation is not supported by your browser. Please search manually."
    );
  }
}

// Replace with actual API call
function fetchWeather(location) {
  // This is a mock function - replace with real API call
  console.log(`Fetching weather for: ${location}`);

  // Mock data - replace with API response
  const mockData = {
    city: location,
    current: {
      temp: Math.floor(Math.random() * 30) + 10,
      feels_like: Math.floor(Math.random() * 30) + 10,
      humidity: Math.floor(Math.random() * 50) + 30,
      wind_speed: (Math.random() * 15 + 5).toFixed(1),
      description: ["Sunny", "Cloudy", "Rainy", "Partly Cloudy"][
        Math.floor(Math.random() * 4)
      ],
      icon: ["01d", "02d", "03d", "09d", "10d", "11d"][
        Math.floor(Math.random() * 6)
      ],
    },
    forecast: Array(5)
      .fill()
      .map((_, i) => ({
        day: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][
          (new Date().getDay() + i) % 7
        ],
        high: Math.floor(Math.random() * 10) + 20,
        low: Math.floor(Math.random() * 10) + 10,
        icon: ["01d", "02d", "03d", "09d", "10d", "11d"][
          Math.floor(Math.random() * 6)
        ],
      })),
  };

  updateUI(mockData);
}

function fetchWeatherByCoords(lat, lon) {
  console.log(`Fetching weather for coordinates: ${lat}, ${lon}`);
  // Similar to fetchWeather but with coordinates
  fetchWeather(`Lat: ${lat.toFixed(2)}, Lon: ${lon.toFixed(2)}`);
}

function updateUI(data) {
  // Add fade out animation to current weather
  const currentWeather = document.querySelector(".current-weather");
  currentWeather.style.animation = "fadeOut 0.3s ease-out";

  // Add fade out animation to forecast items
  const forecastItems = document.querySelectorAll(".forecast-item");
  forecastItems.forEach((item) => {
    item.style.animation = "fadeOut 0.3s ease-out";
  });

  // Wait for fade out to complete before updating
  setTimeout(() => {
    // Update current weather
    document.getElementById("city-name").textContent = toTitleCase(data.city);
    document.getElementById("current-temp").textContent = data.current.temp;
    document.getElementById("feels-like").textContent = data.current.feels_like;
    document.getElementById("humidity").textContent = data.current.humidity;
    document.getElementById("wind-speed").textContent = data.current.wind_speed;
    document.getElementById("weather-description").textContent =
      data.current.description;
    document.getElementById(
      "weather-icon"
    ).src = `https://openweathermap.org/img/wn/${data.current.icon}@2x.png`;

    // Update forecast
    const forecastContainer = document.getElementById("forecast-container");
    forecastContainer.innerHTML = "";

    data.forecast.forEach((day, index) => {
      const forecastItem = document.createElement("div");
      forecastItem.className = "forecast-item";
      forecastItem.innerHTML = `
              <div class="forecast-day">${day.day}</div>
              <img src="https://openweathermap.org/img/wn/${day.icon}.png" alt="Weather icon">
              <div class="forecast-temp">
                  <span class="high-temp">${day.high}°</span>
                  <span class="low-temp">${day.low}°</span>
              </div>
            `;
      // Add delay to each forecast item animation
      forecastItem.style.animationDelay = `${index * 0.1}s`;
      forecastContainer.appendChild(forecastItem);
    });

    // Reset animation for current weather
    currentWeather.style.animation = "slideIn 0.6s ease-out";
  }, 300);
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}
