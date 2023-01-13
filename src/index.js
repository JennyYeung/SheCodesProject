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

//
function showTemp(response) {
  console.log(response.data);
}
function showCity(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-input");
  console.log(citySearch.value);
  let apiCity = citySearch.value;
  let cityResult = document.querySelector("#current-city");
  cityResult.innerHTML = citySearch.value;

  let searchFunction = document.querySelector("#search-city");
  searchFunction.addEventListener("submit", showCity);

  let apiKey =
    "91e4be9d3f0ce62462b88df7804804aeaa09763d916df0424c840d55bfc2d2c9";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${apiCity}&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemp);
  console.log(apiUrl);
}
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
