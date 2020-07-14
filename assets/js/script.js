var cityInputEl = document.querySelector("#city");
var searchFormEl = document.querySelector("#search");
var currentInfoEl = document.querySelector("#current");
var searchHistoryEl = document.querySelector("#search-history");
var displayCityNameEl = document.querySelector("#displayCityName");
var displayDateEl = document.querySelector("#displayDate");
var listEl = document.querySelector("#list");
var listTwoEl = document.querySelector("#list-2");
var uvIndexNumEl = document.querySelector("#uv-index-num");


var searchList = [];
var searchListTally = 0;
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

            dailyArray = data.daily;
            currentArray = data.current;
            
            var currentIcon = currentArray.weather[0].icon;
            
            listEl.innerHTML = "<ol><img src='http://openweathermap.org/img/wn/" + 
                currentIcon + 
                "@2x.png'></ol><ol> Temp: <span class='font-weight-light'>" + 
                currentTemp + 
                "</span></ol><ol> Humidity: <span class='font-weight-light'>" + 
                currentHumidity + 
                "</span></ol><ol> Wind Speed: <span class='font-weight-light'>" + 
                windSpeed + "</span></ol>" +
                "</span></ol><ol> UV Index: ";

                uvIndexNumEl.innerHTML = uvIndex;

            if (uvIndex >= 8) {
                uvIndexNumEl.classList = "p-2 rounded bg-danger text-white";
                ////////////// 
            } else if (uvIndex >= 5) {
                uvIndexNumEl.classList = "p-2 rounded bg-warning text-white";
            } else {
                uvIndexNumEl.classList = "p-2 rounded bg-info text-white";
            };


            for (var i = 1; i < dailyArray.length - 2; i++) {

                var otherDates = new Date(dailyArray[i].dt * 1000);
                var otherTemp = dailyArray[i].temp.day;
                var otherHumidity = dailyArray[i].humidity;

                var dailyIcon = dailyArray[i].weather[0].icon;
                
                if (date !== dailyArray[i].dt) {

                    var fiveForecastEl = document.createElement("div");
                    fiveForecastEl.classList = "card text-white bg-primary col m-1";
                    fiveForecastEl.innerHTML = "<ol> Date: " + 
                    otherDates + 
                    "<ol class='text-center'><img src='http://openweathermap.org/img/wn/" + 
                    dailyIcon + "@2x.png'></ol><ol class='text-center card-text'> Temp: " + 
                    otherTemp +
                    "</ol><ol class='text-center card-text'> Humidity: " + 
                    otherHumidity +
                    "</ol>";
                };
                listTwoEl.appendChild(fiveForecastEl);
            }
        });
    listTwoEl.innerHTML = "";
    loadSearches();
};
    

var formSubmitHandler = function(event) {
    event.preventDefault();
    
    var cityName = cityInputEl
        .value
        .trim();

    if (cityName) {
        getCities(cityName);
        searchFormEl.reset();
    } else {
        alert("Please enter a city name!");
    }
    searchList = cityName;
    saveSearches();
};

var saveSearches = function() {
    localStorage.setItem("search", searchList);
};

var loadSearches = function() {
    for (var i=0; i < searchList.length; i++) {
        var searches = localStorage.getItem("search");
        searchHistoryEl.innerHTML = "<ol>" + searches + "<ol>";
    }
};


searchFormEl.addEventListener("submit", formSubmitHandler);
