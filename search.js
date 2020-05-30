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
      let results = response.Search;

      // Looping through each result item
      // Appending search results
      results.forEach(function(movie){

        $("#movie-list").append("<h1>" + movie.Title + "</h1> <br>" + "<img src='" + movie.Poster + "'> <br>" + movie.Year + "<br> Rated: " + movie.Rated + "<br> Genre: " + movie.Genre + "<br> Plot: " + movie.Plot + "<br> <hr>");
        
        // to do:
        // take imdbID in order to display Rated, Genre, Plot, & Ratings Array (Source + Value)
        var movieID = movie.imdbID;
        console.log(movieID);


      });

});
});




