const apiKey = '585b5b65105498ea8ef79abf3c425c23'; // Replace with your OpenWeatherMap API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

const locationInput = document.getElementById('locationInput');
const searchButton = document.getElementById('searchButton');
const locationElement = document.getElementById('location');
const temperatureElement = document.getElementById('temperature');
const descriptionElement = document.getElementById('description');
const weatherIconElement = document.getElementById('weatherIcon');

searchButton.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeather(location);
    } else {
        alert('Please enter a city name.');
    }
});

function fetchWeather(location) {
    const url = `${apiUrl}?q=${location}&appid=${apiKey}&units=metric`;
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            locationElement.textContent = data.name;
            temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
            descriptionElement.textContent = data.weather[0].description;

            // Determine if it's day or night
            const isDay = (new Date().getHours() >= 6 && new Date().getHours() < 18);
            const weatherCondition = data.weather[0].main.toLowerCase();
            let iconUrl;
            switch (weatherCondition) {
                case 'clear':
                    iconUrl = isDay ? 'http://openweathermap.org/img/wn/01d@2x.png' : 'http://openweathermap.org/img/wn/01n@2x.png';
                    break;
                case 'clouds':
                    iconUrl = isDay ? 'http://openweathermap.org/img/wn/03d@2x.png' : 'http://openweathermap.org/img/wn/03n@2x.png';
                    break;
                case 'rain':
                    iconUrl = isDay ? 'http://openweathermap.org/img/wn/10d@2x.png' : 'http://openweathermap.org/img/wn/10n@2x.png';
                    break;
                case 'thunderstorm':
                    iconUrl = isDay ? 'http://openweathermap.org/img/wn/11d@2x.png' : 'http://openweathermap.org/img/wn/11n@2x.png';
                    break;
                default:
                    iconUrl = isDay ? 'http://openweathermap.org/img/wn/50d@2x.png' : 'http://openweathermap.org/img/wn/50n@2x.png'; // Default icon for other conditions
                    break;
            }
            weatherIconElement.src = iconUrl;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Failed to fetch weather data. Please try again.');
        });
}
