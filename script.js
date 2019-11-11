//this variable stores the last search as an object in localStorage
var lastCity = JSON.parse(localStorage.getItem('lastCity'));


function searchCity(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
        // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function(searchData) {
            console.log(searchData);
            console.log(searchData.name);
            uvIndex(searchData.coord.lat, searchData.coord.lon);
            localStorage.setItem('lastCity', JSON.stringify(searchData));
        })
}

function forecast(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
        // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function(searchData) {
            console.log(searchData);
        })
}

function uvIndex(lat, lon) {
    let uvi = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
}
$('#searchBtn').on('click', function() {
    let city = $("#searchForm").val()
    console.log(city);
    searchCity(city);
    forecast(city);
    populateMain();
})

function populateMain() {
    $("#cityLast").text(lastCity.name);
    $("#tempLast").text(lastCity.main.temp + " Farenheight");
    $("#humiLast").text("Humidity: " + lastCity.main.humidity + " %");
    $("#speedLast").text(lastCity.wind.speed + " MPH");

}
populateMain();