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
    var myJSON = JSON.stringify(response);
    document.getElementById("movie-view").innerHTML = myJSON;
  });

  // -----------------------------------------------------------------------

  // To do:
  // Display movie information with API codes
  // loop through to display all matching results



});


// API Codes:
// Search (array of matching movies)
// Title
// Year
// Rated
// Release Date
// Genre
// Plot
// Poster
// Rarings --> Source & Value