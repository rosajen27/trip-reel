var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=f9d78f5a";
var movieObj;
function formatMovie(obj) {
    form = {
        title: obj[0].title.title,
        runtime: obj[0].title.runningTimeInMinutes,
        release: obj[0].title.year,
        genres: obj[0].genres,
        plotOutline: obj[0].plotOutline.text,
        plotSummary: obj[0].plotSummary.text,
        rating: obj[0].certificates.US[0].certificate,
        ratingR: obj[0].certificates.US[0].ratingReason,
        reviewRate: obj[0].ratings.rating,
        metascore: obj[1].Metascore,
        poster: obj[0].title.image.url,
        actors: obj[1].Actors,
        writer: obj[1].Writer,
        awards: obj[1].Awards,
        director: obj[1].Director,
        languages: obj[1].Language,
        type: obj[1].Type,

    }
    return form;

}

function getIMDbObj(movie) {
    var OMDB = "https://www.omdbapi.com/?t=";
    var OMDBkey = "&apikey=f9d78f5a";
    var queryURL = OMDB + movie + OMDBkey;
    var omdbInf;
    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            omdbInf = response;
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
                resolve([response, omdbInf]);
            });
        });
    });
    return promise;
}

//Use this to get an object filled with movie info
function makeMovObj(movie) {

    var promise = new Promise(function (resolve, reject) {
        getIMDbObj(movie).then(function (i) {
            console.dir(i);
            resolve(formatMovie(i));
        });
    });
    return promise;
}
//This is how you use the makeMovObj function
var movieObj;
var movies = [];
for (var i = 0; i < movies.length; i++) {
    makeMovObj(movies[i]).then(function (result) {
        console.dir(result);
        movieObj = result
    });
}

var movie = decodeURI(window.location.search.substring(1));
var movieObj;
makeMovObj(movie).then(function (result) {
    console.dir(result);
    movieObj = result
}).then(function(){

    $(".headerPic").attr("src", movieObj.poster);

    var a = $(".cell");
    a.empty();
    Object.keys(movieObj).forEach(function (key){
        a.append("<h1>"+key+"</h1><br><h4>"+movieObj[key]+"</h4>");
        
    });
});

