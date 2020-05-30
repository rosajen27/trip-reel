// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function(event) {
    event.preventDefault();

// grab text from the search-input box
var movie = $("#search-input").val();

// hit the queryURL with $ajax, response will return an array with movies matching searched title
var queryURL = "http://www.omdbapi.com/?s=" + movie + "&apikey=3814d304"

$.ajax({
    url: queryURL,
    method: "GET",
  }).then(function(response) {
    
      // Store the data from the AJAX request
      let results = response.Search;

      // Looping through each result item
      results.forEach(function(movie){

        // Obtain movieIDs in order to call another API
        var movieID = movie.imdbID;
        console.log(movieID);

        // Second API
        var queryURL2 = "http://www.omdbapi.com/?i=" + movieID + "&apikey=3814d304"
        $.ajax({
          url: queryURL2,
          method: "GET",
          success: function(data) {
          console.log(data);

          $("#movie-list").append("<h1>" + data.Title + "</h1> <br>" + "<img src='" + data.Poster + "'> <br>" + data.Released + "<br> Rated: " + data.Rated + "<br> Genre: " + data.Genre + "<br> Plot: " + data.Plot + "<br> <hr>");
 
          }
        });

      });

});
});
       

// to do:
// display review arrays