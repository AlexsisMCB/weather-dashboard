var cityInputEl = document.querySelector("#city");
var searchFormEl = document.querySelector("#search");
var currentInfoEl = document.querySelector("#current");
var searchHistoryEl = document.querySelector("#search-history");
var tempLi = document.querySelector("#temp");
var humidityLi = document.querySelector("#humidity");
var windSpeedLi = document.querySelector("#wind-speed");
var displayCityNameEl = document.querySelector("#displayCityName");

var getCities = function(city) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&units=imperial&appid=e7f07e75bc7f6dd6457bd758e76aaac8";

    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(data) {

                
                displayCityNameEl.textContent = data.name;
                //console.log(data);
                displayCurrentForecast(data.name, city);
                //console.log(data.main.temp);
                //console.log(data.main.humidity);
                //console.log(data.wind.speed);

            });
        }); 

}
     

var formSubmitHandler = function(event) {
    event.preventDefault();
    // get value from input element
    var cityName = cityInputEl
        .value
        .trim();

    if (cityName) {
        getCities(cityName);
        cityInputEl.value = "";
        tempLi.textContent = "";
    } else {
        alert("Please enter a city name!");
    }

    localStorage.setItem("search", cityName);
    
};

/* var displayCurrentForecast = function(city) {
    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&units=imperial&appid=e7f07e75bc7f6dd6457bd758e76aaac8";

    fetch(apiUrl)
        .then(function(response) {
            response.json().then(function(data) {
                //console.log(data);
                displayCurrentForecast(data.name, city);
                var currentTemp = data.main.temp;
                var currentHumidity = data.main.humidity;
                var windSpeed = data.wind.speed;

                tempLi.textContent = currentTemp;
                humidityLi.textContent = currentHumidity;
                windSpeedLi.textContent = windSpeed;
            });
        });
}*/

//getCities();
searchFormEl.addEventListener("submit", formSubmitHandler);
