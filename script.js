const apiKey = '882039e5a3ba55c88fcacc6959d137aa'; 

const cityInput = document.getElementById('cityInput');
const searchBtn = document.getElementById('searchBtn');
const weatherInfo = document.getElementById('weatherInfo');

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod === 200) {
            const { name, main, weather, sys } = data;
            const temperature = main.temp;
            const description = weather[0].description;
            const icon = weather[0].icon;
            const country = sys.country;

            weatherInfo.innerHTML = `
                <div class="weather-icon">
                    <i class="wi wi-owm-${icon}"></i>
                </div>
                <h2>${name}, ${country}</h2>
                <div class="weather-details">
                    <p>Temperature: ${temperature}°C</p>
                    <p>Weather: ${description}</p>
                </div>
            `;
        } else {
            weatherInfo.innerHTML = `<p>City not found. Please try again.</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.innerHTML = `<p>An error occurred. Please try again later.</p>`;
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    } else {
        alert('Please enter a city name.');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        const city = cityInput.value.trim();
        if (city) {
            getWeather(city);
        } else {
            alert('Please enter a city name.');
        }
    }
});