var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=f9d78f5a";
var movieObj;

var action = ["Taken", "Robocop", "The Avengers", "Bloodshot", "Black Panther", "Jumanji", "Mad Max", "Dunkirk", "Mission Impossible", "Logan"];
var comedy = ["City Lights", "Airplane", "Some Like it Hot", "The Hustle", "The Lovebirds", "Good Boys", "Onward", "Murder Mystery", "Trolls", "Booksmart"]; 
var horror = ["The Grudge", "The Blair Witch Project", "Hereditary", "IT", "Drag Me to Hell", "Final Destination", "Midsommar", "Ma", "The Lodge", "The Silence" ];
action.forEach(getIMDBaction);
comedy.forEach(getIMDBcomedy);
horror.forEach(getIMDBhorror);

function getIMDBaction(movie) {
    var queryURL = OMDB + movie + OMDBkey;
    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        movieObj = response;
        var genre = "#actionCC" + action.indexOf(movie);
        printPoster(movieObj, genre);
    });
}

function getIMDBcomedy(movie) {
    var queryURL = OMDB + movie + OMDBkey;
    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        movieObj = response;
        var genre = "#comedyCC" + comedy.indexOf(movie);
        printPoster(movieObj, genre);
    });
}


function getIMDBhorror(movie) {
    var queryURL = OMDB + movie + OMDBkey;
    return $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        movieObj = response;
        var genre = "#horrorCC" + horror.indexOf(movie);
        printPoster(movieObj, genre);
    });
}



function printPoster(obj, genre) {

   console.log(obj.Poster);
   var element = document.querySelector(genre); 
   console.log(element); 
   element.style.backgroundImage = "url("+ obj.Poster +")"; 

} 
