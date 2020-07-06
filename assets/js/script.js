var cityInputEl = document.querySelector("#city");
var searchFormEl = document.querySelector("#search");
var currentInfoEl = document.querySelector("#current");
var searchHistoryEl = document.querySelector("#search-history");
var displayCityNameEl = document.querySelector("#displayCityName");
var displayDateEl = document.querySelector("#displayDate");
var listEl = document.querySelector("#list");
var oneEl = document.querySelector("#day-one");
var twoEl = document.querySelector("#day-two");
var threeEl = document.querySelector("#day-three");
var fourEl = document.querySelector("#day-four");
var fiveEl = document.querySelector("#day-five");

var dailyArray = {};

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
            
            if (uvIndex.value > 8) {
                uvIndex.classList = "bg-danger";
            };

            dailyArray = data.daily;

            console.log(dailyArray);

            for (var i = 0; i < dailyArray.length - 3; i++) {
            
                if (date !== dailyArray[i].dt) {
                    oneEl.classList = "card text-white bg-primary col m-1";
                    oneEl.innerHTML = "<ol> Date: " + dailyArray[1].dt + 
                    "</ol><ol> Temp: " + 
                    dailyArray[1].day +
                    "</ol><ol> Humidity: " + 
                    dailyArray[1].humidity +
                    "</ol>";

                    twoEl.classList = "card text-white bg-primary col m-1";
                    twoEl.innerHTML = "<ol> Date: " + dailyArray[2].dt + 
                    "</ol><ol> Temp: " + 
                    dailyArray[2].day +
                    "</ol><ol> Humidity: " + 
                    dailyArray[2].humidity +
                    "</ol>";

                    threeEl.classList = "card text-white bg-primary col m-1";
                    threeEl.innerHTML = "<ol> Date: " + dailyArray[3].dt + 
                    "</ol><ol> Temp: " + 
                    dailyArray[3].day +
                    "</ol><ol> Humidity: " + 
                    dailyArray[3].humidity +
                    "</ol>";

                    fourEl.classList = "card text-white bg-primary col m-1";
                    fourEl.innerHTML = "<ol> Date: " + dailyArray[4].dt + 
                    "</ol><ol> Temp: " + 
                    dailyArray[4].day +
                    "</ol><ol> Humidity: " + 
                    dailyArray[4].humidity +
                    "</ol>";

                    fiveEl.classList = "card text-white bg-primary col m-1";
                    fiveEl.innerHTML = "<ol> Date: " + dailyArray[5].dt + 
                    "</ol><ol> Temp: " + 
                    dailyArray[5].day +
                    "</ol><ol> Humidity: " + 
                    dailyArray[5].humidity +
                    "</ol>";
                };

                /*if (date === dailyArray[i].dt) {
                    console.log("today's date")
                } else {
                    futureEl.classList = "card text-white bg-primary col m-1";
                    futureEl.innerHTML = "<ol>" + futureDate + 
                    "</ol><ol>" + 
                    dailyArray.temp_day +
                    "</ol><ol>" + 
                    dailyArray.humidity +
                    "</ol>";

                }*/
            }
            
        });
}
     
var loadArray = function() {

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
        //var modalEl = document.createElement("div");
        //modalEl.classList = "modal";
        //modalEl.innerHTML = "Please enter a city name!";
        alert("Please enter a city name!");
    }
    localStorage.setItem("search", cityName);
    
};

var loadSearches = function() {
    searches = localStorage.getItem("search");
    searchHistoryEl.innerHTML = "<li>" + searches + "</li>";
}

//getCities();
searchFormEl.addEventListener("submit", formSubmitHandler);
