var OMDB = "https://www.omdbapi.com/?t=";
var OMDBkey = "&apikey=59d81f88";

var best = ["The Shawshank Redemption", "The Godfather", "The Silence of the Lambs", "Pulp Fiction", "Titanic", "Jurassic Park", "Forrest Gump", "The Lord of the Rings: The Return of the King", "The Green Mile", "Saving Private Ryan", "Jaws", "Goodfellas", "Schindler's List", "Gladiator", "Raiders of the Lost Ark", "Some Like It Hot", "The Good the Bad and the Ugly", "Taxi Driver", "Apocalypse Now", "A Clockwork Orange", "The Godfather: Part II", "Star Wars: Episode IV - A New Hope", "Unforgiven", "Psycho", "Good Will Hunting", "2001: A Space Odyssey", "12 Angry Men", "One Flew Over the Cuckoo's Nest", "Braveheart", "E.T.the Extra - Terrestrial", "The Pianist", "The Exorcist", "Vertigo", "Fargo", "The Sound of Music", "Gone with the Wind", "Platoon", "The Wizard of Oz", "Casablanca", "The Deer Hunter", "A Streetcar Named Desire", "American Graffiti", "Rocky", "From Here to Eternity", "Citizen Kane", "Amadeus", "Rear Window", "North by Northwest", "West Side Story", "Chinatown", "Dr.Strangelove or: How I Learned to Stop Worrying and Love the Bomb", "Lawrence of Arabia", "Close Encounters of the Third Kind", "To Kill a Mockingbird", "Dances with Wolves", "Raging Bull", "Singin' in the Rain", "It's a Wonderful Life", "The French Connection", "Rain Man", "Annie Hall", "Midnight Cowboy", "Ben-Hur", "Network", "Sunset Blvd.", "Terms of Endearment", "Butch Cassidy and the Sundance Kid", "Bonnie and Clyde", "The Apartment", "The Great Dictator", "On the Waterfront", "Rebel Without a Cause", "The Searchers", "The Bridge on the River Kwai", "My Fair Lady", "Shane", "The Third Man", "Doctor Zhivago", "Double Indemnity", "High Noon", "The Maltese Falcon", "Giant", "The Best Years of Our Lives", "It Happened One Night", "Patton", "City Lights", "The Treasure of the Sierra Madre", "The Philadelphia Story", "All Quiet on the Western Front", "Nashville", "The African Queen", "The Grapes of Wrath", "Mr.Smith Goes to Washington", "An American in Paris", "A Place in the Sun", "Wuthering Heights", "Mutiny on the Bounty", "Yankee Doodle Dandy"]

// function getRandomInt(min, max) {
//     min = Math.ceil(min);
//     max = Math.floor(max);
//     max += 1;
//     return Math.floor(Math.random() * (max - min)) + min;
// }
// function makeRndID() {
//     var str = '' + getRandomInt(3000000, 9999999);
//     while (str.length < 7) {
//         str = '0' + str;
//     }

//     return str;
// }
// function makeRandMovies(howMany) {
//     var movieList = [];
//     for (let i = 0; i < howMany; i++) {
//         const movieID = "tt" + makeRndID();
//         movieList.push(movieID);
//     }
//     console.log(movieList)
//     return movieList;
// }
function printPoster(obj, movieID) {

    console.log(obj.Poster);
    var element = document.querySelector(movieID);
    console.log(element);
    element.style.backgroundImage = "url(" + obj.Poster + ")";
}

function getIMDB(title) {
    var queryURL = OMDB + title + OMDBkey;
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        movieObj = response;
        var movieID = "#" + movieObj.Title.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '');
        sortGenre(movieObj);
        printPoster(movieObj, movieID);

    });
}


var genreMovieArray = {};
function sortGenre(movieObj) {

    var myGenres = movieObj.Genre.split(", ");
    var myGenre = myGenres[0];

    if (myGenre.localeCompare("N/A") != 0) {
        if (myGenre in genreMovieArray) {
            //This movies genre's div exists
            genreMovieArray[myGenre].push(movieObj);
            $("#" + myGenre.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')).append(`<div class="carousel-cell" id="${movieObj.Title.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '')}></div>`);

        } else {
            //This movies genre's div does not exists
            genreMovieArray[myGenre] = [movieObj];

            $("#genres").append("<h4>" + myGenre + "</h4><hr><div class='carousel' id='" + myGenre.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '') + "' data-flickity='{ 'wrapAround': true }'> <div class='carousel-cell' id='" + movieObj.Title.replace(/[!\"#$%&'\(\)\*\+,\.\/:;<=>\?\@\[\\\]\^`\{\|\}~]/g, '') + "'></div></div><hr>");


        }
    }
}
best.forEach(getIMDB);
