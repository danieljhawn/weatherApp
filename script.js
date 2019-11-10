queryURL = "api.openweathermap.org/data/2.5/weather?q=`${city}`,`${country}`&APPID=a01fee2d80b973ab3b18ce1990905e04"
city = "Austin";
country = "us";

function searchCity(city, queryURL){
    $.ajax({url: queryURL, method: "GET"})
    .then(function(searchData) {
        console.log(searchData);
    })
}

$('#searchBtn').on('click', function() {
    alert("test")
    searchCity();
})