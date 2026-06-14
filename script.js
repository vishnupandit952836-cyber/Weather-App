// const API_KEY = "329c3b0c71a34bfe8a2784a60e28c4ae";

// const cities = {
//     Agra: {
//         lat: 27.1767,
//         lon: 78.0081
//     },

//     Firozabad: {
//         lat: 27.1591,
//         lon: 78.3957
//     },

//     Delhi: {
//         lat: 28.6139,
//         lon: 77.2090
//     }
// };

// async function getWeather(cityName){

//     const city = cities[cityName];

//     const url =
//     `https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&appid=${API_KEY}&units=metric`;

//     try{

//         const response = await fetch(url);

//         const data = await response.json();

//         document.getElementById("city").innerText =
//         cityName;

//         document.getElementById("temp").innerText =
//         `${Math.round(data.main.temp)} °C`;

//         document.getElementById("condition").innerText =
//         data.weather[0].description;

//         document.getElementById("humidity").innerText =
//         data.main.humidity;

//         document.getElementById("wind").innerText =
//         data.wind.speed;

//         document.getElementById("icon").src =
//         `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

//     }

//     catch(error){
//         alert("Error fetching weather data");
//         console.log(error);
//     }
// }
const button = document.querySelector(".button");
const input = document.querySelector(".Search");
const result = document.getElementById("result");

button.addEventListener("click", getWeather);

async function getWeather() {
    let city = input.value;

    if (city === "") {
        result.innerHTML = "Please enter a city name";
        return;
    }

    let apiKey = "37c77956a8f187701feaaaf64b2f6b87";
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {
        let response = await fetch(url);
        let data = await response.json();

        if (data.cod === "404") {
            result.innerHTML = "City not found";
            return;
        }

  result.innerHTML = `
<h2>${data.name}</h2>

<div class="weather-cards">

    <div class="card temp">
        <i class="fas fa-temperature-high"></i>
        <p>Temperature</p>
        <h3>${data.main.temp} °C</h3>
    </div>

    <div class="card feels">
        <i class="fas fa-face-smile"></i>
        <p>Feels Like</p>
        <h3>${data.main.feels_like} °C</h3>
    </div>

    <div class="card humidity">
        <i class="fas fa-droplet"></i>
        <p>Humidity</p>
        <h3>${data.main.humidity}%</h3>
    </div>

    <div class="card wind">
        <i class="fas fa-wind"></i>
        <p>Wind Speed</p>
        <h3>${data.wind.speed} m/s</h3>
    </div>

    <div class="card cloud">
        <i class="fas fa-cloud"></i>
        <p>Cloud Coverage</p>
        <h3>${data.clouds.all}%</h3>
    </div>

    <div class="card weather">
        <i class="fas fa-sun"></i>
        <p>Weather</p>
        <h3>${data.weather[0].main}</h3>
    </div>

</div>
`;

    } catch (error) {
        result.innerHTML = "Something went wrong";
    }
}