var lastCity = JSON.parse(localStorage.getItem('lastCity'));
var lastUV = "";
var lastForecast = JSON.parse(localStorage.getItem('lastForecast'));
var searchList = [];

// this function takes the input from the search field and uses it to create an AJAX request
function searchCity(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
        // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function(searchData) {
            // console.log(searchData);
            // console.log(searchData.name);
            uvIndex(searchData.coord.lat, searchData.coord.lon);
            localStorage.setItem('lastCity', JSON.stringify(searchData));
            searchList.push(searchData);
        })
}

function forecast(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
        // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function(searchData) {
            console.log(searchData);
            uvIndex(searchData.city.coord.lat, searchData.city.coord.lon);
            localStorage.setItem('lastForecast', JSON.stringify(searchData));
        })
}

function uvIndex(lat, lon) {
    let uvi = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    $.ajax({ url: uvi, method: "GET" })
        .then(function(searchData) {
            console.log(searchData);

        })

}
uvIndex();

$('#searchBtn').on('click', function() {
    let city = $("#searchForm").val()
    console.log(city);
    searchCity(city);
    forecast(city);
    renderSearches();
})

function populateMain() {
    $("#cityLast").text(lastCity.name);
    $("#tempLast").text(lastCity.main.temp + " Farenheit");
    $("#humiLast").text("Humidity: " + lastCity.main.humidity + " %");
    $("#speedLast").text(lastCity.wind.speed + " MPH");
    $("#uvLast").text(lastCity.wind.speed + " MPH");
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
        render.addClass("row bg-light text-dark mb-2 p-2")
        render.text(searchList[i].name);
        $("#prevSearches").append(render);
    }
}