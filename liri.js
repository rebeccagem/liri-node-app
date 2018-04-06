require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");
var fs = require("fs");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//grabs the arugments passed in the command line
var arg1 = process.argv[2];
var arg2 = process.argv[3];

// my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
switch (arg1) {
    case 'my-tweets':
        client.get('statuses/user_timeline', function (error, tweets, response) {
            if (error) throw error;
            for (var i = 0; i < 10; i++) {
                console.log("------------------------------------");
                console.log("Tweet: " + tweets[i].text);
                console.log("Time Stamp: " + tweets[i].created_at);
            }
        });
        break;
    // spotify-this-song
    //This will show the following information about the song in your terminal/bash window
    // - Artist(s), The song's name, A preview link of the song from Spotify, The album that the song is from
    // - If no song is provided then your program will default to "The Sign" by Ace of Base.
    case 'this-song':
        song();
        break;
    //movie-this shows movie info from OMDB        
    case 'movie-this':
        movie();
        break;
        // do-what-it-says pulls info from random.txt to run as spotify search command
    case 'random':
        // The code will store the contents of the reading inside the variable "data"
        fs.readFile("random.txt", "utf8", function (error, data) {

            // If the code experiences any errors it will log the error to the console.
            if (error) {
                return console.log(error);
            }
            // Then split it by commas (to make it more readable)
            var dataArr = data.split(",");
            arg2 = dataArr[1];
            song();
        });

}


function movie() {
    //checks to see if there is no 2nd arg, if not, then it shows the default search 
    if (!arg2) {
        arg2 = "Mr. Nobody";
    }
    // Then run a request to the OMDB API with the movie specified
    request("https://www.omdbapi.com/?t=" + arg2 + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            // Parse the body of the site and recover just the imdbRating
            // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
            console.log("------------------------------------");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("IMDB Rating: " + JSON.parse(body).imdbRating);
            console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
            console.log("Country: " + JSON.parse(body).Country);
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("Actors: " + JSON.parse(body).Actors);
            console.log("------------------------------------");
            // console.log(JSON.parse(body));
        }
    });
}

function song() {
    //checks to see if there is no 2nd arg, if not, then it shows the default search 
    if (!arg2) {
        arg2 = "Ace of Base";
    }
    spotify.search({ type: 'track', query: arg2 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log("------------------------------------");
        console.log("Artist(s): " + data.tracks.items[0].artists[0].name);
        console.log("Song Title: " + data.tracks.items[0].name);
        console.log("Listen Here: " + data.tracks.items[0].album.external_urls.spotify);
        console.log("Name of Album: " + data.tracks.items[0].album.name);
        console.log("------------------------------------");
    });
}