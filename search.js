// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function(event) {
    event.preventDefault();

// grab text from the search-input box
var movie = $("#search-input").val();

// hit the queryURL with $ajax
//take response data and display it in the console log
// response will return an array with all movies matching searched title
var queryURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=3814d304"

$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {

    console.log(response);
    
      // storing the data from the AJAX request in the results variable
      var results = response.Search;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {

        // Creating a paragraph tag with the result item's rating
        var movieTitle = $("<h1>").text(response.Search[i].Title);
        var movieYear = $("<p>").text("Year: " + response.Search[i].Year);
        var movieRating = $("<p>").text("Rating: " + response.Search[i].Rated);
        var movieGenre = $("<p>").text("Genre: " + response.Search[i].Genre);
        var moviePlot = $("<p>").text("Plot: " + response.Search[i].Plot);
        var moviePoster = $("<img>").attr("src", response.Search[i].Poster);

        $("#movie-view").empty();
        $("#movie-view").append(movieTitle, movieYear, movieRating, movieGenre, moviePlot, moviePoster);
      }
});
});