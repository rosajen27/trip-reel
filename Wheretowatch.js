var movieID = decodeURI(window.location.search.substring(1));
var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?country=US&source_id=" + movieID + "&source=imdb",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        "x-rapidapi-key": "b1775e8ec7msh788e5c7c96cfc8fp1af385jsnc2d02c379eb2"
    }
}

$.ajax(settings).done(function (response) {
    console.log(response);

    var UtellyObj = response
    console.log(UtellyObj.collection.locations)
    ProvidersArray = UtellyObj.collection.locations;


    var WheretoWatchList = $("<ul>");
    for (var i = 0; i < ProvidersArray.length; i++) {
        if ((ProvidersArray[i].country[0] === 'us') && !(ProvidersArray[i].display_name.includes("IVAUS"))) {
            var ProviderList = $("<li>");
            var Providers = $("<img class='brightness'>");

            var URLink = $('<a class="utellyB">')

            URLink.attr("href", ProvidersArray[i].url)
            Providers.attr("src", ProvidersArray[i].icon)


            URLink.append(Providers)
            ProviderList.append(URLink);
            WheretoWatchList.append(ProviderList)
        }

    }
    $("#streaming").append(WheretoWatchList)

});