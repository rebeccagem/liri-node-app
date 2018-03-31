require("dotenv").config();

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// my-tweets
// This will show your last 20 tweets and when they were created at in your terminal/bash window.

// spotify-this-song
//This will show the following information about the song in your terminal/bash window
// - Artist(s)
// - The song's name
// - A preview link of the song from Spotify
// - The album that the song is from
// - If no song is provided then your program will default to "The Sign" by Ace of Base.

// movie-this

// do-what-it-says