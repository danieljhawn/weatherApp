function searchCity(city){
    let queryURL = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    console.log(queryURL)
    $.ajax({url: queryURL, method: "GET"})
    .then(function(searchData) {
        console.log(searchData.main.temp);
        uvIndex(searchData.coord.lat, searchData.coord.lon);
        localStorage.setItem('lastCity', JSON.stringify(searchData));
        // $("#cityLast").text(JSON.stringify(localStorage.lastCity));
        $("#cityLast").text(localStorage.lastCity.cod);
        $("#tempLast").text(localStorage.lastCity.main.temp);

    })
}

function forecast(city){
    let queryURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
    console.log(queryURL)
    $.ajax({url: queryURL, method: "GET"})
    .then(function(searchData) {
        console.log(searchData);
    })
}

function uvIndex(lat, lon){
    let uvi = `http://api.openweathermap.org/data/2.5/uvi?lat=${lat}&lon=${lon}&APPID=a01fee2d80b973ab3b18ce1990905e04&units=imperial`
}
$('#searchBtn').on('click', function() {
    let city = $("#searchForm").val()
    console.log(city);
    searchCity(city);
    forecast(city);
})

// function populateMain {
//     $(".mainBox").prepend(localStorage.lastCity);
// }