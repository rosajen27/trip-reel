window.onload = function () {

// This .on("click") function will trigger the AJAX Call
$("#search-button").on("click", function (event) {

  event.preventDefault();

  // grab text from the search-input box
  var movie = $("#search-input").val();

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

          $("#movie-list").append("<img class='resultImg' id='" + data.imdbID + "' src='" + data.Poster + "'>" + "<h4 id=" + data.imdbID + ">" + data.Title + "</h4>" + data.Released + "<br> Rated: " + data.Rated + "<br>" + data.Metascore + "/100 Metascore <br>" + "Genre: " + data.Genre + "<hr>");

        }
      });

    });

  });





$("#movie-list").on('click', 'img, h4', function (event) {
  event.preventDefault();

  var movieID = event.target.id;

  var queryURL = "http://www.omdbapi.com/?i=" + movieID + "&apikey=3814d304"

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {

    const movieDetails = {
      poster: response.Poster,
      title: response.Title,
      rating: response.Rated,
      runtime: response.Runtime,
      release: response.Released,
      genre: response.Genre,
      metascore: response.Metascore,
      plot: response.Plot,
    }
    
    window.localStorage.setItem('movie', JSON.stringify(movieDetails));
    window.location.href = "details2.html"
  });
});
});
}