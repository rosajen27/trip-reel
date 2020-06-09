var OMDB = "https://www.omdbapi.com/?type=movie&t=";
var OMDBkey = "&apikey=59d81f88";
var movieObj;
function formatMovie(obj) {
    form = {
        Title: obj[0].title.title,
        Runtime: obj[0].title.runningTimeInMinutes,
        Released: obj[1].Released,
        Genre: obj[0].genres,
        Summary: obj[0].plotSummary.text,
        Rating: obj[0].certificates.US[0].ratingReason,
        Metascore: obj[1].Metascore,
        Actors: obj[1].Actors,
        Writers: obj[1].Writer,
        Awards: obj[1].Awards,
        Director: obj[1].Director,
        Languages: obj[1].Language,
        Poster: obj[0].title.image.url,

    }
    return form;

}

function getIMDbObj(movie) {
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
                "url": "https://imdb8.p.rapidapi.com/title/get-overview-details?type=movie&currentCountry=US&tconst=" + response.imdbID,
                "method": "GET",
                "headers": {
                    "x-rapidapi-host": "imdb8.p.rapidapi.com",
                    "x-rapidapi-key": "f2b30e5b86mshef9af991c5736d4p10c126jsn146e977a47d1"
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
// var movieObj;
// var movies = [];
// for (var i = 0; i < movies.length; i++) {
//     makeMovObj(movies[i]).then(function (result) {
//         console.dir(result);
//         movieObj = result
//     });
// }

var movie = decodeURI(window.location.search.substring(1));
var movieObj;
makeMovObj(movie).then(function (result) {
    console.dir(result);
    movieObj = result
}).then(function(){

    document.getElementById("loader").style.display = "none";
    document.getElementById("main").style.visibility = "visible";
    $(".headerPic").attr("style", "visibility:visible");
    $(".headerPic").attr("src", movieObj.Poster);

    var a = $(".cell");
    a.empty();
    a.append("<h1>"+movieObj.Title+"</h1>");
    a.append("<h4>"+movieObj.Runtime+" mins</h4>");
    a.append("<h4>Released: "+movieObj.Released+"</h4>");
    a.append("<p>Metascore: "+movieObj.Metascore+"/100</p>");
    a.append("<h4>"+movieObj.Rating+"</h4>");
    a.append("<p>"+movieObj.Summary+"</p>");
});

