var movie = decodeURI(window.location.search.substring(1));
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/lookup?term=" + movie + "&country=us",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "b1775e8ec7msh788e5c7c96cfc8fp1af385jsnc2d02c379eb2"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);

    var UtellyObj = response

    ProvidersArray = UtellyObj.results[0].locations

    for (var i = 0; i < ProvidersArray.length; i++) {

        var WheretoWatchDiv = $("<div>");

        var Providers = $("<img>");

        var URLink = $('<a>')

        URLink.attr("href", ProvidersArray[i].url)
        Providers.attr("src", ProvidersArray[i].icon)

        URLink.append(Providers)
        WheretoWatchDiv.append(URLink)

        $("#streaming").append(WheretoWatchDiv)
    }
});