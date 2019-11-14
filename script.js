var lastCity = JSON.parse(localStorage.getItem('lastCity'));
var lastUV = "";
var lastForecast = JSON.parse(localStorage.getItem('lastForecast'));
var searchList = [];
// var lat = lastCity.coord.lat
// var lon = lastCity.coord.lon


// takes the input from the search field and uses it to create an AJAX request. The response of that request gets saved to localStorage
function searchCity(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
        // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function(searchData) {
            localStorage.setItem('lastCity', JSON.stringify(searchData));
            searchList.push(searchData);
        })
}

// similar to the searchCity function, except it requests the forecast data.
function forecast(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
        // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function(searchData) {
            console.log(searchData);
            // uvIndex(searchData.city.coord.lat, searchData.city.coord.lon);
            localStorage.setItem('lastForecast', JSON.stringify(searchData));
        })
}

function uvIndex(lat, lon) {
    var lon = lastCity.coord.lon
    var lat = lastCity.coord.lat
    var uvi = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    $.ajax({ url: uvi, method: "GET" })
        .then(function(searchData) {
            console.log(searchData);
        })
}
uvIndex();

// takes the value of whatever is in the search box and applies it to several functions
$('#searchBtn').on('click', function() {
    let city = $("#searchForm").val()
    console.log(city);
    searchCity(city);
    forecast(city);
    populateMain(city);
})

// $('.searched').on('click', function loadSearch(searched) {
//     let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${searched}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
//     let searched = $(this).text()
//     $.ajax({ url: queryURL, method: "GET" })
//         .then(function(searchData) {
//             $("#cityLast").text(searchData.name);
//             $("#tempLast").text(searchData.main.temp + " Farenheit");
//             $("#humiLast").text("Humidity: " + searchData.main.humidity + " %");
//             $("#speedLast").text(searchData.wind.speed + " MPH");
//             $("#uvLast").text();
//         })
// })

function populateMain() {
    $("#cityLast").text(lastCity.name);
    $("#tempLast").text(lastCity.main.temp + " Farenheit");
    $("#humiLast").text("Humidity: " + lastCity.main.humidity + " %");
    $("#speedLast").text(lastCity.wind.speed + " MPH");
    $("#uvLast").text();
}
populateMain();

function populateForecast() {
    let dateShort = JSON.parse(localStorage.getItem('lastForecast'))

    $("#day0 > .fdate").text(dateShort.list[0].dt_txt.slice(0, 10))
    $("#day0 > .ficon").html(dateShort.list[0].weather.icon)
    $("#day0 > .ftemp").text(dateShort.list[0].main.temp + " F")
    $("#day0 > .fhumidity").text(dateShort.list[0].main.humidity + "%")

    $("#day1 > .fdate").text(dateShort.list[8].dt_txt.slice(0, 10))
    $("#day1 > .ficon").html(dateShort.list[8].weather.icon)
    $("#day1 > .ftemp").text(dateShort.list[8].main.temp + " F")
    $("#day1 > .fhumidity").text(dateShort.list[8].main.humidity + "%")

    $("#day2 > .fdate").text(dateShort.list[16].dt_txt.slice(0, 10))
    $("#day2 > .ficon").html(dateShort.list[16].weather.icon)
    $("#day2 > .ftemp").text(dateShort.list[16].main.temp + " F")
    $("#day2 > .fhumidity").text(dateShort.list[16].main.humidity + "%")

    $("#day3 > .fdate").text(dateShort.list[24].dt_txt.slice(0, 10))
    $("#day3 > .ficon").html(dateShort.list[24].weather.icon)
    $("#day3 > .ftemp").text(dateShort.list[24].main.temp + " F")
    $("#day3 > .fhumidity").text(dateShort.list[24].main.humidity + "%")

    $("#day4 > .fdate").text(dateShort.list[32].dt_txt.slice(0, 10))
    $("#day4 > .ficon").html(dateShort.list[32].weather.icon)
    $("#day4 > .ftemp").text(dateShort.list[32].main.temp + " F")
    $("#day4 > .fhumidity").text(dateShort.list[32].main.humidity + "%")

}
populateForecast();

function renderSearches() {
    $("#prevSearches").empty();
    for (var i = 0; i < searchList.length; i++) {
        let render = $("<div>");
        render.addClass("row bg-light text-dark mb-2 p-2 searched")
        render.text(searchList[i].name);
        $("#prevSearches").prepend(render);
    }
}

setInterval(renderSearches, 100);
window.setInterval(populateMain, 100);