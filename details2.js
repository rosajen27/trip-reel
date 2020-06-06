
const obj = JSON.parse(window.localStorage.getItem('movie'));

var moviePoster = $("<img class='headerPic'>").attr("src", obj.poster);                 
var movieTitle = $("<h1>").text(obj.title);
var movieRelease = $("<h4>").text("Release Date: " + obj.release);
var movieRuntime = $("<h4>").text("Runtime: " + obj.runtime);
var movieRating = $("<h4>").text("Rated: " + obj.rating);
var movieGenre = $("<h4>").text("Genre: " + obj.genre);
var movieMetascore = $("<h4>").text(obj.metascore + "/100 Metascore");

if (obj.metascore === "N/A") {
    movieMetascore = "Metascore Unavailable";
}

var moviePlot = $("<p>").text(obj.plot);

$("#headerPic").append(moviePoster);
$("#title").append(movieTitle);
$("#releaseDate").append(movieRelease);
$("#runtime").append(movieRuntime);
$("#rating").append(movieRating);
$("#metascore").append(movieMetascore);
$("#genre").append(movieGenre);
$("#plot").append(moviePlot);
