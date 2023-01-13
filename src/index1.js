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

function showActualLocation(response) {
  console.log(response);
  let geoCity = document.querySelector("#current-city");
  geoCity.innerHTML = response.data.name;
  //let nowWeather = document.querySelector("#main-weather");
  //nowWeather.innerHTML = response.data.weather.main;
}
function handlePosition(position) {
  console.log(position.coords.latitude);
  console.log(position.coords.longitude);
  let latitude = Math.trunc(position.coords.latitude * 100) / 100;
  let longitude = Math.trunc(position.coords.longitude * 100) / 100;
  let locationUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=f81614abe2395d5dfecd45b9298041de`;
  axios.get(locationUrl).then(showActualLocation);
}
function geoLocation() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let currentLocation = document.querySelector("#location");
currentLocation.addEventListener("click", geoLocation);
//
function showTemp(response) {
  console.log(response);
  let showCelsius = document.querySelector("#show-temp");
  showCelsius.innerHTML = Math.round(response.data.main.temp);
  let celcius = Math.round(response.data.main.temp);
  let fahrenheit = Math.round((celcius * 9) / 5 + 32);
  function changeTemp(event) {
    event.preventDefault();
    let showfahrenheit = document.querySelector("#show-temp");
    showfahrenheit.innerHTML = fahrenheit;
  }
  let tempFahrenheit = document.querySelector("#fahrenheit");
  tempFahrenheit.addEventListener("click", changeTemp);
  let feltTemperature = document.querySelector("#tempFelt");
  let feltTemp = Math.round(response.data.main.feels_like);
  feltTemperature.innerHTML = `Feels like: ${feltTemp} ℃`;
  let showHumidity = document.querySelector("#humidity");
  showHumidity.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let showWind = document.querySelector("#wind");
  showWind.innerHTML = `Wind: ${windSpeed}Km/h`;
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
//

function changeTemp(event) {
  event.preventDefault();
  let showfahrenheit = document.querySelector("#show-temp");
  showfahrenheit.innerHTML = "35";
}
let tempFahrenheit = document.querySelector("#fahrenheit");
tempFahrenheit.addEventListener("click", changeTemp);

function revertTemp(event) {
  event.preventDefault();
  let showCelsius = document.querySelector("#show-temp");
  showCelsius.innerHTML = "12";
}
let tempCelsius = document.querySelector("#celsius");
tempCelsius.addEventListener("click", revertTemp);
