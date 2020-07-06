var cityInputEl = document.querySelector("#city");
var searchFormEl = document.querySelector("#search");
var currentInfoEl = document.querySelector("#current");
var searchHistoryEl = document.querySelector("#search-history");
var displayCityNameEl = document.querySelector("#displayCityName");
var displayDateEl = document.querySelector("#displayDate");
var listEl = document.querySelector("#list");

var date = new Date();


var getCities = function(city) {

    // format api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    city + 
    "&units=imperial&appid=e7f07e75bc7f6dd6457bd758e76aaac8";

    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        }).then(function(data) {
            displayCityNameEl.textContent = data.name;
            displayDateEl.textContent = date;
            var lat = data.coord.lat;
            var lon = data.coord.lon;

            return fetch(
                "https://api.openweathermap.org/data/2.5/onecall?lon=" + 
                lon +
                "&lat=" + 
                lat +
                "&units=imperial&exclude=hourly,minutely&appid=e7f07e75bc7f6dd6457bd758e76aaac8"
            );
        }).then(function(response) {
            return response.json();
        }).then(function(data) {

            var currentTemp = data.current.temp;
            var currentHumidity = data.current.humidity;
            var windSpeed = data.current.wind_speed;
            var uvIndex = data.current.uvi;

            
            listEl.innerHTML =  "<li> Temperature: <span class='font-weight-light'>" + 
                currentTemp + 
                "</span></li><li> Humidity: <span class='font-weight-light'>" + 
                currentHumidity + 
                "</span></li><li> Wind Speed: <span class='font-weight-light'>" + 
                windSpeed + "</span></li>" +
                "</span></li><li> UV Index: <span class='font-weight-light'>" + 
                uvIndex + 
                "</span></li>";
            


            console.log(data.current.dt);
            var timeStamp = data.daily.dt;
            var futureDate = new Date(timeStamp * 1000);
            console.log(date);
            console.log(futureDate);
            console.log(data);
            console.log(data.current.uvi);

            //if(!date === data.daily[i]dt) {
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
    } else {
        alert("Please enter a city name!");
    }
    localStorage.setItem("search", cityName);
    searchHistoryEl.getItem("search");
};

var clearEntries = function() {
    tempLi.textContent= "";
    humidityLi.textContent="";
    windSpeedLi.textContent="";
};

/* var displayCurrentForecast = function(getCities) {
    // format api url
    var apiUrlTwo = "https://api.openweathermap.org/data/2.5/weather?q=" + 
    getCities + 
    "&units=imperial&appid=e7f07e75bc7f6dd6457bd758e76aaac8";

    fetch(apiUrlTwo)
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
} */

//getCities();
searchFormEl.addEventListener("submit", formSubmitHandler);
