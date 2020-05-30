//Need to grab movie ID through OMDb and send that to IMDb for more detail.
var movieID;

var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://imdb8.p.rapidapi.com/title/get-overview-details?currentCountry=US&tconst=" + movieID,
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "38519610ffmsh90a3c30c45c5dbbp178690jsn61a4c17f6c68"
    }
}

$.ajax(settings).then(function (response) {
    console.log(response);
});




var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=f9d78f5a";


// Initial array of movies
var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {



    var movie = $(this).attr("data-name");

    var queryURL = OMDB + movie + OMDBkey;


    // Creates AJAX call for the specific movie button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // YOUR CODE GOES HERE!!!
        var holder = $("#movies-view");
        holder.empty();

        var im = $("<img>");
        im.attr("src", response.Poster);
        holder.append(im);

        var rate = $("<h4>");
        rate.text(response.Rated);
        holder.append(rate);

        var rateing = $("<h4>");
        var ratings = response.Ratings;
        console.log(ratings);
        var rating;
        for (var r = 0; r < ratings.length; r++) {
            if (ratings[r].Source === "Internet Movie Database") {
                rating = ratings[r].Value;
            }
        }

        rateing.text(rating);
        holder.append(rateing);

        var rd = $("<h5>");
        rd.text(response.Released);
        holder.append(rd);

        var pl = $("<h2>");
        pl.text(response.Plot);
        holder.append(pl);

    });

}

// Function for displaying movie data
function renderButtons() {

    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        // Then dynamicaly generates buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adds a class of movie to our button
        a.addClass("movie");
        a.addClass("hollow button");
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        // Provided the initial button text
        a.text(movies[i]);
        // Added the button to the buttons-view div
        $("#buttons-view").append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#add-movie").on("click", function (event) {
    event.preventDefault();
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // The movie from the textbox is then added to our array
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);

// Calling the renderButtons function to display the initial buttons
renderButtons();
