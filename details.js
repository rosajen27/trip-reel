var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=f9d78f5a";
var movieObj;

function getIMDB(movie) {
    var queryURL = OMDB + movie + OMDBkey;
    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var settings = {
            "async": true,
            "crossDomain": true,
            "url": "https://imdb8.p.rapidapi.com/title/get-overview-details?currentCountry=US&tconst=" + response.imdbID,
            "method": "GET",
            "headers": {
                "x-rapidapi-host": "imdb8.p.rapidapi.com",
                "x-rapidapi-key": "38519610ffmsh90a3c30c45c5dbbp178690jsn61a4c17f6c68"
            }
        }
        $.ajax(settings).then(function (response) {
            console.log(response);
        });
    });

}
//Get the JSON object
getIMDB(movie).done(function(response){movieObj = response;});

function formatMovie(obj) {
    return form = {
        title: obj.title.title,
        runtime: obj.title.runningTimeInMinutes,
        release: obj.title.year,
        genres: obj.genres,
        plotOutline: obj.plotOutline.text,
        plotSummary: obj.plotSummary.text,
        rating: obj.certificates.US[0].certificate,
        ratingR: obj.certificates.US[0].ratingReason,
        reviewRate: obj.ratings.rating,
        poster: obj.title.image.url,


    }
    
}
formatMovie(movieObj);