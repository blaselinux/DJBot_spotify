/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var userID = "blasiusblay";
var request = require("request");
var playlistName = "DJBotPlaylist";
var SpotifyWebApi = require('spotify-web-api-node');


function createPlaylist(playlistName){
    console.log(playlistName);
    /*var options = {
        method: 'POST',
        headers: {
           Authorization: AuthToken,
           "Content-Type": "application/json"
        },
        url: "https://api.spotify.com/v1/users/" + userID + "/playlists",
        BodyParameters: {
            name: playlistName,
            public: true,
            description: "DJBot playlist for EFOTT"
        }
    };
    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('Playlist successfully created!' + body);
        } else {
            console.log("Couldn\'t create the playlist. " + error + " error " + response.statusCode);
        }
    });*/
}

exports.addTrackToPlaylist = function (spotifyuri) {
    
    console.log("---Spotify track link: " + spotifyuri);
    
    //Declare variables
    
    var scopes = ['user-read-private', 'user-read-email', 'playlist-read-private', 'playlist-modify-public'],
            redirectUri = 'http://localhost:8888/callback',     // Here you can check the code variable
            clientId = 'e033a6e946f5419ba56501e1fe4390f5',      // Client ID from registered application
            clientSecret = '01dc62c9319a49af8d2fa63a8d76468e',  // Client secret from registered application
            state = 'blase';                                    // Something which identify your session
    var credentials = {
        clientId : clientId,
        clientSecret : clientSecret,
        redirectUri : redirectUri
    };
    
    var spotifyApi = new SpotifyWebApi(credentials);
    
    // Set variables for Spotify athentication
    
    spotifyApi.setCredentials({
        'accessToken' : 'BQBu1uhZNm4OYJnPpMzg1qomwGC8gRjBFuUVUMw3EZNKWoC6moWtOiymz81ZSAhvTKlxKi-ydBuK2cULi9SyNzABXi8LHKqEGfdnjaSm-LzZEKx9luR4Pq-IcNOC6XkAnJcE7EujhYj5V2cBykMenU_ryxjkA23o_ydOOjU2Y-McrqH5jykQ21E1j48IgmHbB9LaW7K8soA0zDgaiYuj9dq5UuuP',
        'refreshToken' : 'AQCCGC0N_BidXKcxzsCyjYPk7nLVp15JA9DczsDIjDH28NawHcXZMxMjGxxWx0Ku3cCddGktEdZVb9_enBnTsCpvbgGQ1HX0Z_hC7Vh5F1wetfwcDzNr2_ioQGo2-Hjhn9Y',
        'redirectUri' : 'http://localhost:8888/callback',
        'clientId ' : 'e033a6e946f5419ba56501e1fe4390f5',
        'clientSecret' : '01dc62c9319a49af8d2fa63a8d76468e'
    });
    
    // Get the credentials one by one - need only the first run
    /*console.log('The access token is ' + spotifyApi.getAccessToken());
    console.log('The refresh token is ' + spotifyApi.getRefreshToken());
    console.log('The redirectURI is ' + spotifyApi.getRedirectURI());
    console.log('The client ID is ' + spotifyApi.getClientId());
    console.log('The client secret is ' + spotifyApi.getClientSecret());
    
    spotifyApi.setAccessToken('BQAIK0nZEAPwjfMpDSAkmb2wR6EbZffXaqidC4aPaNEd');*/
    
    // Create the authorization URL
//    var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com/authorize?client_id=e033a6e946f5419ba56501e1fe4390f5&response_type=code&redirect_uri=http://localhost:8888/callback&scope=user-read-private%20user-read-email%20playlist-read-private%20playlist-modify-public&state=blase
//    console.log(authorizeURL);
    
    
   /* var code = 'AQAqwMAAcPs7vpp3vLi_nKx9whcrqssbpgL714fnlHtatjQnaPOG3w9fh72bB3Ty3EEkP42st6nu2idae4AKronreqa-wWvD0EbyAV0v3HqmP6U9mnJEmHDDzFfGvL_IOc1E9kptyTzCLfKhov5Lo_aYZaVDjEudTch18Nr_pd2r0T4W6SKF3oWW2Sqssy2Ui1oABup6U-ku_jjZGNKv7MMqA6gP2ffBt7XvR4Q5EZPJfOGwp98ZKuw5QC3TDRWYobCnNjd4mDffHQOD22tlfq1KdcmBolBxS-1lRxA0bwtqnMNfT9qW';
    spotifyApi.authorizationCodeGrant(code).then(function(data) {
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        console.log('The refresh token is ' + data.body['refresh_token']);
        // Set the access token on the API object to use it in later calls
        spotifyApi.setAccessToken(data.body['access_token']);
        spotifyApi.setRefreshToken(data.body['refresh_token']);
    }, function(err) {
        console.error('Something went wrong! ', err);
    });*/
    
    spotifyApi.refreshAccessToken().then(function(data) {
        console.log('REFRESH: The access token has been refreshed!');
        
        console.log('The token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);
        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
        console.error('Could not refresh access token ', err);
    });
    
    // Check playlist
    
    var foundList = false, playlistID = '';
    spotifyApi.getUserPlaylists(userID).then(function(data) {
        console.log('Retrieved playlists ', data.body);
        for (var i = 0; i < data.body.items.length; i++){
            if (data.body.items[i].name === playlistName){
                foundList = true;
                playlistID = data.body.items[i].id;
                console.log("Data name: " + data.body.items[i].name);
                console.log("ID: " + data.body.items[i].id);
            }else{
                //console.log("Nem találtam: " + data.body.items[i].name);
            }
        };
        console.log(foundList);
        if (foundList){
            // Add song to the exist playlist
            spotifyApi.addTracksToPlaylist(userID, playlistID, [spotifyuri]).then(function(data) {
                console.log('Added tracks to playlist: ' + spotifyuri);
            }, function(err) {
                console.log('Something went wrong! ', err);
            });
        }else{
            // Create playlist if it is not exist
            spotifyApi.createPlaylist(userID, playlistName, { 'public' : true }).then(function(data) {
                console.log('Created playlist: ' + playlistName);
            }, function(err) {
                console.log('Something went wrong!', err);
            });
            
        }
    },function(err) {
        console.log('Something went wrong!', err);
    });
    
    
};


