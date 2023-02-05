let now = new Date();
let weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}
let day = weekDay[now.getDay()];
console.log(day);
let time = now.getHours() + ":" + addZero(now.getMinutes());
let dateTime = day + " " + time;
console.log(dateTime);
let todayDate = document.querySelector("#show-date");
console.log(todayDate);
todayDate.innerHTML = dateTime;

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}
function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` 
                <div class="col">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>  
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="70"
                  />
               <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div> 
              </div>
              `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}
function getForecast(coordinates) {
  console.log(coordinates);
  let latitude = Math.trunc(coordinates.lat * 100) / 100;
  let longitude = Math.trunc(coordinates.lon * 100) / 100;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=f81614abe2395d5dfecd45b9298041de&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function showActualLocation(response) {
  console.log(response);
  let geoCity = document.querySelector("#current-city");
  geoCity.innerHTML = response.data.name;
  let nowWeather = document.querySelector("#main-weather");
  nowWeather.innerHTML = response.data.weather[0].description;
  let showHumidity1 = document.querySelector("#humidity");
  showHumidity1.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed1 = Math.round(response.data.wind.speed);
  let showWind1 = document.querySelector("#wind");
  showWind1.innerHTML = `Wind: ${windSpeed1}Km/h`;
  let showCelsius1 = document.querySelector("#show-temp");
  showCelsius1.innerHTML = Math.round(response.data.main.temp);
  let celsius1 = Math.round(response.data.main.temp);
  let fahrenheit1 = Math.round((celsius1 * 9) / 5 + 32);
  function changeTemp1(event) {
    event.preventDefault();
    let showfahrenheit1 = document.querySelector("#show-temp");
    showfahrenheit1.innerHTML = fahrenheit1;
  }
  let tempFahrenheit1 = document.querySelector("#fahrenheit");
  tempFahrenheit1.addEventListener("click", changeTemp1);
  let feltTemperature1 = document.querySelector("#tempFelt");
  let feltTemp1 = Math.round(response.data.main.feels_like);
  feltTemperature1.innerHTML = `Feels like: ${feltTemp1}℃`;
  let iconElement1 = document.querySelector("#icon");
  iconElement1.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement1.setAttribute("alt", response.data.weather[0].description);
}

function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = Math.trunc(position.coords.latitude * 100) / 100;
  let longitude = Math.trunc(position.coords.longitude * 100) / 100;
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f81614abe2395d5dfecd45b9298041de&units=metric`;
  axios.get(locationUrl).then(showActualLocation);
  function formatDay(timestamp) {
    let date = new Date(timestamp * 1000);
    let day = date.getDay();
    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[day];
  }
  function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");

    let forecastHTML = `<div class="row">`;
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon", "Tue", "Wed"];
    forecast.forEach(function (forecastDay, index) {
      if (index < 6) {
        forecastHTML =
          forecastHTML +
          ` 
                <div class="col">
                  <div class="weather-forecast-date">${formatDay(
                    forecastDay.dt
                  )}</div>  
                  <img src="http://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png"
                  alt=""
                  width="70"
                  />
               <div class="weather-forecast-temperatures">
                <span class="weather-forecast-temperature-max">${Math.round(
                  forecastDay.temp.max
                )}°</span>
                <span class="weather-forecast-temperature-min">${Math.round(
                  forecastDay.temp.min
                )}°</span>
              </div> 
              </div>
              `;
      }
    });

    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
  }
  function getForecast(coordinates) {
    console.log(coordinates);
    let latitude = Math.trunc(coordinates.lat * 100) / 100;
    let longitude = Math.trunc(coordinates.lon * 100) / 100;
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=f81614abe2395d5dfecd45b9298041de&units=metric`;

    axios.get(apiUrl).then(displayForecast);
  }
}

//
function showTemp(response) {
  console.log(response);
  let showCelsius = document.querySelector("#show-temp");
  showCelsius.innerHTML = Math.round(response.data.main.temp);
  let celsius = Math.round(response.data.main.temp);
  let fahrenheit = Math.round((celsius * 9) / 5 + 32);
  let celsiusConversion = Math.round(response.data.main.temp);
  function changeTemp(event) {
    event.preventDefault();
    let showfahrenheit = document.querySelector("#show-temp");
    tempCelsius.classList.remove("active");
    tempFahrenheit.classList.add("active");
    showfahrenheit.innerHTML = fahrenheit;
  }
  function revertTemp(event) {
    event.preventDefault();
    let showCelsius = document.querySelector("#show-temp");
    tempCelsius.classList.add("active");
    tempFahrenheit.classList.remove("active");
    showCelsius.innerHTML = celsiusConversion;
  }

  let tempCelsius = document.querySelector("#celsius");
  tempCelsius.addEventListener("click", revertTemp);
  let tempFahrenheit = document.querySelector("#fahrenheit");
  tempFahrenheit.addEventListener("click", changeTemp);
  let feltTemperature = document.querySelector("#tempFelt");
  let feltTemp = Math.round(response.data.main.feels_like);
  feltTemperature.innerHTML = `Feels like: ${feltTemp}℃`;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `Wind: ${windSpeed}Km/h`;
  let condition = document.querySelector("#main-weather");
  condition.innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}
function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  console.log(citySearch.value);
  let cityResult = document.querySelector("#current-city");
  cityResult.innerHTML = citySearch.value;

  let apiKey = "f81614abe2395d5dfecd45b9298041de";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch.value}&appid=f81614abe2395d5dfecd45b9298041de&units=metric`;
  axios.get(url).then(showTemp);
  console.log(url);
}
let searchFunction = document.querySelector("#search-city");
searchFunction.addEventListener("submit", showCity);
