var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=f9d78f5a";
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
        Poster: obj[1].Poster,

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
    Object.keys(movieObj).forEach(function (key){
        a.append("<h4>"+key+"</h4><h5>"+movieObj[key]+"</h5><br>");
        
    });
});

