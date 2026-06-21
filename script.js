const button = document.querySelector(".button");
const input = document.querySelector(".Search");
const result = document.getElementById("result");

button.addEventListener("click", getWeather);

// Enter key support
input.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        getWeather();
    }
});

async function getWeather() {

    const city = input.value.trim();

    if (city === "") {
        result.innerHTML = "<h2>Please enter a city name</h2>";
        return;
    }

    const apiKey ="37c77956a8f187701feaaaf64b2f6b87";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    try {

        const response = await fetch(url);
        const data = await response.json();

        if (data.cod == 404) {
            result.innerHTML = "<h2>City not found</h2>";
            return;
        }

        result.innerHTML = `
            <h2>${data.name}</h2>

            <div class="weather-cards">

                <div class="card temp">
                    <i class="fas fa-temperature-high"></i>
                    <p>Temperature</p>
                    <h3>${Math.round(data.main.temp)} °C</h3>
                </div>

                <div class="card feels">
                    <i class="fas fa-face-smile"></i>
                    <p>Feels Like</p>
                    <h3>${Math.round(data.main.feels_like)} °C</h3>
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

            </div>
        `;

    } catch (error) {
        result.innerHTML = "<h2>Something went wrong</h2>";
        console.error(error);
    }
}