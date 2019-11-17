// storing a list of searched cities to localStorage and calling the function renderSearches to load them to the sidebar
var searchList = JSON.parse(localStorage.getItem('searchList')) || [];
console.log(searchList);
if (searchList.length > 0) {
    searchCity(searchList[searchList.length - 1]);
    forecast(searchList[searchList.length - 1]);
}
renderSearches();

// takes the input from the search field and uses it to create an AJAX request. The response of that request gets saved to localStorage.
function searchCity(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function (searchData) {
            // localStorage.setItem('lastCity', JSON.stringify(searchData));
            // searchList.push(searchData);
            populateMain(searchData);
            uvIndex(searchData.coord.lat, searchData.coord.lon);
        })
};

// similar to the searchCity function, except it requests the forecast data.
function forecast(city) {
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    // console.log(queryURL)
    $.ajax({ url: queryURL, method: "GET" })
        .then(function (searchData) {
            console.log(searchData);
            // uvIndex(searchData.city.coord.lat, searchData.city.coord.lon);
            // localStorage.setItem('lastForecast', JSON.stringify(searchData));
            populateForecast(searchData);

        })
};

// similar to searchCity and forecast functions, but it makes a different API call with longitude and latitude. Once again, storing in localStorage.
function uvIndex(lat, lon) {
    var uvi = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    $.ajax({ url: uvi, method: "GET" })
        .then(function (searchData) {
            console.log(searchData);
            // localStorage.setItem('lastUV', JSON.stringify(searchData));
            populateUV(searchData.value);
        })
}

// takes the value of whatever is in the search box and applies it to several functions.
$('#searchBtn').on('click', function () {
    let city = $("#searchForm").val();
    console.log(city);
    searchCity(city);
    forecast(city);
    searchList.push(city);
    localStorage.setItem('searchList', JSON.stringify(searchList));
    renderSearches();
});


// grabs the data stored in localStorage and adds each detail to my main window.
function populateMain(lastCity) {
    $("#cityLast").text(lastCity.name);
    $("#tempLast").text(lastCity.main.temp + " Farenheit");
    $("#humiLast").text("Humidity: " + lastCity.main.humidity + " %");
    $("#speedLast").text(lastCity.wind.speed + " MPH");
}

// similar to populateMain, but this adds the 5 day forecast.
function populateForecast(dateShort) {
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
// populateForecast();

// same as other populate function, but uses latitude and longitude as the parameters
function populateUV(index) {
    $("#uvLast").text("UV Index: " + index);
}

// loads the list of searches into the sidebar
function renderSearches() {
    $("#prevSearches").empty();
    for (var i = 0; i < searchList.length; i++) {
        let render = $("<div>");
        render.addClass("row bg-light text-dark mb-2 p-2 searched")
        render.text(searchList[i]);
        $("#prevSearches").prepend(render);
    }
};

// event listener, takes previous searches and loads them into the main window
$(document).on('click', 'div.searched', function(){
    console.log('clicked');
    let city = $(this).text();
    searchCity(city);
    forecast(city);
})