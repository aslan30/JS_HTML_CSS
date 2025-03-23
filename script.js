const container = document.querySelector(".container");
const searchForm = document.querySelector("#search-form");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const error404 = document.querySelector(".not-found");
const cityHide = document.querySelector(".city-hide");
const skipBtn = document.querySelector('.skip-btn');

skipBtn.style.display = 'none';

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';
    const city = document.querySelector('.search-box input').value;

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                cityHide.textContent = city;
                container.style.height = '400px';
                weatherBox.classList.remove('active');
                weatherDetails.classList.remove('active');
                error404.classList.add('active');
                skipBtn.style.display = 'block';
                return;
            }

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            if (cityHide.textContent === city) {
                return;
            } else {
                cityHide.textContent = city;
                container.style.height = '555px';
                container.classList.add('active');
                weatherBox.classList.add('active');
                weatherDetails.classList.add('active');
                error404.classList.remove('active');
                skipBtn.style.display = 'block';

                setTimeout(() => {
                    container.classList.remove('active');
                }, 2500);

                switch (json.weather[0].main) {
                    case 'Clear':
                        image.src = 'images/clear.png';
                        break;
                    case 'Rain':
                        image.src = 'images/rain.png';
                        break;
                    case 'Snow':
                        image.src = 'images/snow.png';
                        break;
                    case 'Clouds':
                        image.src = 'images/cloud.png';
                        break;
                    case 'Mist':
                    case 'Haze':
                        image.src = 'images/mist.png';
                        break;
                    default:
                        image.src = 'images/cloud.png';
                }

                temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
                description.innerHTML = `${json.weather[0].description}`;
                humidity.innerHTML = `${json.main.humidity}%`;
                wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

                const infoWeather = document.querySelector('.info-weather');
                const infoHumidity = document.querySelector('.info-humidity');
                const infoWind = document.querySelector('.info-wind');

                const aCloneInfoWeather = infoWeather.cloneNode(true);
                const aCloneInfoHumidity = infoHumidity.cloneNode(true);
                const aCloneInfoWind = infoWind.cloneNode(true);

                aCloneInfoWeather.id = 'clone-info-weather';
                aCloneInfoWeather.classList.add('active-clone');

                aCloneInfoHumidity.id = 'clone-info-humidity';
                aCloneInfoHumidity.classList.add('active-clone');

                aCloneInfoWind.id = 'clone-info-wind';
                aCloneInfoWind.classList.add('active-clone');

                setTimeout(() => {
                    infoWeather.insertAdjacentElement('afterend', aCloneInfoWeather);
                    infoHumidity.insertAdjacentElement('afterend', aCloneInfoHumidity);
                    infoWind.insertAdjacentElement('afterend', aCloneInfoWind);
                }, 2200);

                const CloneInfoWeather = document.querySelectorAll('.info-weather.active-clone');
                const totalCloneInfoWeather = CloneInfoWeather.length;
                const cloneInfoWeatherFirst = CloneInfoWeather[0];

                const CloneInfoHumidity = document.querySelectorAll('.info-humidity.active-clone');
                const cloneInfoHumidityFirst = CloneInfoHumidity[0];

                const CloneInfoWind = document.querySelectorAll('.info-wind.active-clone');
                const cloneInfoWindFirst = CloneInfoWind[0];

                if (totalCloneInfoWeather > 0) {
                    cloneInfoWeatherFirst.classList.remove('active-clone');
                    cloneInfoHumidityFirst.classList.remove('active-clone');
                    cloneInfoWindFirst.classList.remove('active-clone');

                    setTimeout(() => {
                        cloneInfoWeatherFirst.remove();
                        cloneInfoHumidityFirst.remove();
                        cloneInfoWindFirst.remove();
                    }, 2200);
                }
            }
        });
});


skipBtn.addEventListener('click', () => {
    document.querySelector('.search-box input').value = '';
    container.style.height = '70px';
    weatherBox.classList.remove('active');
    weatherDetails.classList.remove('active');
    error404.classList.remove('active');
    skipBtn.style.display = 'none';
});


const APIKey = '98740f4ebc0d63bc0f8ba70090e5a091';

const cityElement = document.querySelector('.city');
const currentTimeElement = document.querySelector('.current-time');

const weatherIcon = document.querySelector('.weatherTash img');
const temperatureElement = document.querySelector('.temperatureTash');
const descriptionElement = document.querySelector('.descriptionTash');
const humidityElement = document.querySelector('.info-humidityTash span');
const windElement = document.querySelector('.info-windTash span');

function getWeatherForTashkent() {
    const city = 'Tashkent';

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                console.error('Данные о погоде в Ташкенте не найдены');
                return;
            }

            updateWeatherInfoTashkent(json);
        })
        .catch(error => {
            console.error('Ошибка при получении данных о погоде:', error);
        });
}

function updateWeatherInfoTashkent(json) {
    cityElement.textContent = json.name;
    currentTimeElement.textContent = getCurrentTime();
    
    weatherIcon.src = getWeatherIcon(json.weather[0].main);
    temperatureElement.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
    descriptionElement.innerHTML = `${json.weather[0].description}`;
    humidityElement.innerHTML = `${json.main.humidity}%`;
    windElement.innerHTML = `${parseInt(json.wind.speed)} Km/h`;
}

function getCurrentTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours();
    const minutes = currentTime.getMinutes();
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes}`;
}

function getWeatherIcon(weatherMain) {
    switch (weatherMain) {
        case 'Clear':
            return './images/clear.png';
        case 'Rain':
            return './images/rain.png';
        case 'Snow':
            return './images/snow.png';
        case 'Clouds':
            return './images/cloud.png';
        case 'Mist':
        case 'Haze':
            return './images/mist.png';
        default:
            return './images/cloud.png';
    }
}

getWeatherForTashkent();

const todayBtn = document.getElementById('today-btn');
const forecastBtn = document.getElementById('forecast-btn');

todayBtn.addEventListener('click', () => {
    window.location = 'index.html';
});

forecastBtn.addEventListener('click', () => {
    window.location = 'tashFD.html';
});


function getHourlyWeatherForTashkent() {
    const city = 'Tashkent';

    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0).getTime() / 1000;
    const startTimestamp = startOfDay + 2 * 3600;
    const endOfDay = startOfDay + 23 * 3600;

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                console.error('Данные о погоде в Ташкенте не найдены');
                return;
            }

            const filteredData = json.list.filter(hourData => {
                const timestamp = hourData.dt;
                return timestamp >= startTimestamp && timestamp <= endOfDay;
            });

            updateHourlyWeatherInfo(filteredData);
        })
        .catch(error => {
            console.error('Ошибка при получении данных о погоде:', error);
        });
}

function updateHourlyWeatherInfo(data) {
    const hourlyWeatherDiv = document.querySelector('.hourly-weather');
    const now = new Date();
    const currentDay = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime() / 1000;

    hourlyWeatherDiv.innerHTML = '';

    data.forEach(hourData => {
        const hour = new Date(hourData.dt * 1000).getHours();
        const date = new Date(hourData.dt * 1000);
        const dateTimestamp = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime() / 1000;
        const timeStr = formatTime(date);
        const dateStr = formatDate(hourData.dt);

        const div = document.createElement('div');
        div.classList.add('hourly-weather-item');

        div.innerHTML = `
            <div>${hour}:00 ${dateStr}</div>
            <img src="${getWeatherIcon(hourData.weather[0].main)}">
            <div>${parseInt(hourData.main.temp)}<span>°C</span></div>
            <div>${hourData.weather[0].description}</div>
            <div><i class="bx bx-water"></i> ${hourData.main.humidity}% <p>Humidity</p></div>
            <div><i class="bx bx-wind"></i> ${parseInt(hourData.wind.speed)} Km/h <p>Wind Speed</p></div>
        `;

        hourlyWeatherDiv.appendChild(div);

        if (dateTimestamp < currentDay) {
            hourlyWeatherDiv.removeChild(div);
        }
    });
}

function formatTime(date) {
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString('en-US', options);
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

getHourlyWeatherForTashkent();