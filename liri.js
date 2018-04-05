require("dotenv").config();

var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
var keys = require("./keys.js");


var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);


var arg1 = process.argv[2];
var arg2 = process.argv[3];


// my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.
switch (arg1) {
    case 'my-tweets':
        client.get('statuses/user_timeline', function (error, tweets, response) {
            if (error) throw error;
                 for (var i = 0; i < 3; i++) {
                    console.log("Tweet: " + tweets[i].text);
                    console.log("Time Stamp: " + tweets[i].user.created_at);
            }
        });
        break;
    case 'this-song':
        console.log("spotify");
        break;
    case 'movie-this':
        console.log("omdb");
        break;
    case 'random':
        console.log("random");

}
// spotify-this-song
//This will show the following information about the song in your terminal/bash window
// - Artist(s)
// - The song's name
// - A preview link of the song from Spotify
// - The album that the song is from
// - If no song is provided then your program will default to "The Sign" by Ace of Base.

// movie-this

// do-what-it-says