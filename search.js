// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function(event) {
    event.preventDefault();

// grab text from the search-input box
var movie = $("#search-input").val();

// hit the queryURL with $ajax
//take response data and display it in the console log
var queryURL ="http://www.omdbapi.com/?t=" + movie + "&apikey=3814d304";

$.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });

  // -----------------------------------------------------------------------

});
