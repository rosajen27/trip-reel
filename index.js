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


// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function (event) {
    event.preventDefault();

    // grab text from the search-input box
    var movie = $("#search-input").val();

    var movieObj;
    var movies = [];
    movies.push(movie);
    for (var i = 0; i < movies.length; i++) {
        makeMovObj(movies[i]).then(function (result) {
            console.dir(result);
            movieObj = result
        });
    }

    // hit the queryURL with $ajax, response will return an array with movies matching searched title
    var queryURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=3814d304"

    $.ajax({
        url: queryURL,
        method: "GET",
    }).then(function (response) {

        $("#carouselDiv").hide();

        // Store the data from the AJAX request
        let results = response.Search;

        // Looping through each result item
        results.forEach(function (movie) {

            // Obtain movieIDs in order to call another API
            var movieID = movie.imdbID;
            console.log(movieID);

            // Second API
            var queryURL2 = "http://www.omdbapi.com/?i=" + movieID + "&apikey=3814d304"
            $.ajax({
                url: queryURL2,
                method: "GET",
                success: function (data) {
                    console.log(data);

                    $("#movie-list").append("<img class='resultImg' src='" + data.Poster + "'>" + "<h4>" + data.Title + "</h4>" + data.Released + "<br> Rated: " + data.Rated + "<br>" + data.Metascore + "/100 Metascore <br>" + "Genre: " + data.Genre + "<hr>");

                }
            });

        });

    });
});


// //Need to grab movie ID through OMDb and send that to IMDb for more detail.
// var movieID;

// var settings = {
//     "async": true,
//     "crossDomain": true,
//     "url": "https://imdb8.p.rapidapi.com/title/get-overview-details?currentCountry=US&tconst=" + movieID,
//     "method": "GET",
//     "headers": {
//         "x-rapidapi-host": "imdb8.p.rapidapi.com",
//         "x-rapidapi-key": "38519610ffmsh90a3c30c45c5dbbp178690jsn61a4c17f6c68"
//     }
// }

// $.ajax(settings).then(function (response) {
//     console.log(response);
// });

// var OMDB = "https://www.omdbapi.com/?t=";
// var OMDBkey = "&apikey=f9d78f5a";

// // Initial array of movies
// var movies = ["The Matrix", "The Notebook", "Mr. Nobody", "The Lion King"];

// // displayMovieInfo function re-renders the HTML to display the appropriate content
// function displayMovieInfo() {



//     var movie = $(this).attr("data-name");

//     var queryURL = OMDB + movie + OMDBkey;


//     // Creates AJAX call for the specific movie button being clicked
//     $.ajax({
//         url: queryURL,
//         method: "GET"
//     }).then(function (response) {
//         console.log(response);
//         // YOUR CODE GOES HERE!!!
//         var holder = $("#movies-view");
//         holder.empty();

//         var im = $("<img>");
//         im.attr("src", response.Poster);
//         holder.append(im);

//         var rate = $("<h4>");
//         rate.text(response.Rated);
//         holder.append(rate);

//         var rateing = $("<h4>");
//         var ratings = response.Ratings;
//         console.log(ratings);
//         var rating;
//         for (var r = 0; r < ratings.length; r++) {
//             if (ratings[r].Source === "Internet Movie Database") {
//                 rating = ratings[r].Value;
//             }
//         }

//         rateing.text(rating);
//         holder.append(rateing);

//         var rd = $("<h5>");
//         rd.text(response.Released);
//         holder.append(rd);

//         var pl = $("<h2>");
//         pl.text(response.Plot);
//         holder.append(pl);


//     });
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

// }

// // Function for displaying movie data
// function renderButtons() {

//     // Deletes the movies prior to adding new movies
//     // (this is necessary otherwise you will have repeat buttons)
//     $("#buttons-view").empty();

//     // Loops through the array of movies
//     for (var i = 0; i < movies.length; i++) {

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



//         // Then dynamicaly generates buttons for each movie in the array
//         // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
//         var a = $("<button>");
//         // Adds a class of movie to our button
//         a.addClass("movie");
//         a.addClass("hollow button");
//         // Added a data-attribute
//         a.attr("data-name", movies[i]);
//         // Provided the initial button text
//         a.text(movies[i]);
//         // Added the button to the buttons-view div
//         $("#buttons-view").append(a);
//     }
// }

// // This function handles events where the add movie button is clicked
// $("#add-movie").on("click", function (event) {
//     event.preventDefault();
//     // This line of code will grab the input from the textbox
//     var movie = $("#movie-input").val().trim();

//     // The movie from the textbox is then added to our array
//     movies.push(movie);

//     // Calling renderButtons which handles the processing of our movie array
//     renderButtons();

// });

// // Adding click event listeners to all elements with a class of "movie"
// $(document).on("click", ".movie", displayMovieInfo);

// // Calling the renderButtons function to display the initial buttons
// renderButtons();

