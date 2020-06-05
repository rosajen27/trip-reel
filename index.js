var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=f9d78f5a";
var genres = [];
var movies = [];

function getIMDbObj(movie) {
    var queryURL = OMDB + movie + OMDBkey;

    var promise = new Promise( function(resolve, reject) {
        $.ajax({
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
                resolve(response);
            });
        }); 
    }); 
    return promise;

}


function formatMovie(obj) {
    form = {
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
    return form;

}

//Use this to get an object filled with movie info
function makeMovObj(movie) {

    var promise = new Promise(function (resolve, reject) {
        getIMDbObj(movie).then(function (i) {
            resolve(formatMovie(i));
        });
    });
    return promise;
}


// displayMovieInfo function re-renders the HTML to display the appropriate content
function displayMovieInfo() {

    console.log("Clicked on a movie");

    /**  YOUR CODE GOES HERE!!!
     * 
     * deatals drop down when a Poster is clicked
     * 
     * 
    var holder = $("#movies-view");
    holder.empty();

    var rd = $("<h5>");
    rd.text(response.Released);
    holder.append(rd);

    var pl = $("<h2>");
    pl.text(response.Plot);
    holder.append(pl);
*/

}

// Function for displaying movie data
function renderButtons() {

    /** 
     * Need more work on how we are going to 
     * propogate. Have first result be the closest to
     * the search query, follow by movies in same genre,
     * cascade down most relavent search results. Potentialy
     * add filters?
     * 
    let genreTag = "#" + $(this).attr("data-genre");
    // Deletes the movies prior to adding new movies
    // (this is necessary otherwise you will have repeat buttons)
    $(genreTag).empty();

    // Loops through the array of movies
    for (var i = 0; i < movies.length; i++) {

        let movieObj = makeMovObj(movies[i]);
        console.log(movieObj);
        console.log(movies);
        var a = $("carousel-cell");
        // Adds a class of movie to our button
        a.addClass("movie");
        a.css("background-image", `url(${movieObj.poster})`);
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        a.attr("data-genre", movieObj.genres);
        // Added the button to the buttons-view div
        $(genreTag).append(a);
    }

    Following is placeholder to help development
    */


    for (var i = 0; i < movies.length; i++) {
        var movieObj;
        makeMovObj(movies[i]).then(function (result) {
            console.dir(result);
            movieObj = result
        });


        let genreTag = "#ActionAdventure"; //+ movieObj.genres[0];
        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $(genreTag).empty();

        console.log("movies " + movies);
        console.log("movie obj " + movieObj);

        var a = $("carousel-cell");
        a.attr("data-name", movies[i]);
        // Adds a class of movie to our button
        a.addClass("movie");
        a.css("background-image", `url(${movieObj.poster})`);
        // Added a data-attribute
        a.attr("data-name", movies[i]);
        a.attr("data-genre", movieObj.genres);
        // Added the button to the buttons-view div
        $(genreTag).append(a);
    }
}

// This function handles events where the add movie button is clicked
$("#movie-search").on("click", function (event) {
    event.preventDefault();
    console.log("Clicked search");
    // This line of code will grab the input from the textbox
    var movie = $("#movie-input").val().trim();

    // First movie in Movies is the searched movie; movies[0] == search query
    movies.push(movie);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();

});

// Adding click event listeners to all elements with a class of "movie"
$(document).on("click", ".movie", displayMovieInfo);


