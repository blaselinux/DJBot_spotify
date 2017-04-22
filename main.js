/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Sound = require('node-aplay');
var _ = require('underscore');
var request = require("request");
var fs = require('fs');
var exec = require('child_process').exec;
const spawn = require('child_process').spawn;
const spotifyList = require('./addToSpotifyPlaylist.js');


function chooseTrack(data){
    canPlay = true;
    if (data.length === 0){
        console.log("Cannot find the music");
        canPlay = false;
    }
    var choose = 0;
    if (canPlay === true){
        for (var i = 1; i < data.length; i++){
            if (data[choose].popularity < data[i].popularity){
                choose =i;
            }
        }
        console.log("=== Playing: " + data[choose].track + " by " + data[choose].artist + ", and popularity is " + data[choose].popularity + " ===");
        spotifyList.addTrackToPlaylist(data[choose].spotify);
        downloadFile(data[choose].preview);
    }
}



function searchTrack(rtrack){
    rtrack = rtrack.toLowerCase();
    var searchterm = rtrack;
    console.log("searching spotify for " + searchterm + " ....");
    var searchtype = "artist,track";
    var options = {
        method: 'GET',
        url: "https://api.spotify.com/v1/search",
        qs: {
            q: searchterm.replace(/ /g, "+"),
            type: searchtype,
            market: "HU",
            limit: 50
        }
    };
    var selectedtrack, selectedartist, selectedpopular, selectedprev, selectedSpotify;
    var data = [];

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            
            if (result.tracks.items.length > 0) {
                
                console.log("For ciklus: " + result.tracks.items.length);
                for (var i = 0; i < result.tracks.items.length; i++){
                    selectedtrack = result.tracks.items[i];
                    var ftrack = selectedtrack.name.toLowerCase();
                    console.log(selectedtrack.name);
                    if (ftrack === rtrack){
                        for (var j = 0; j < result.tracks.items[i].artists.length; j++){
                            selectedartist = result.tracks.items[i].artists[j];
                            var fartist = selectedartist.name.toLowerCase();
                            console.log("Artist: " + selectedartist.name + " Track: " + selectedtrack.name);
                            console.log("Found : " + ftrack, " by ", fartist, result.tracks.items[i].popularity);
                            console.log("selectedtrack.preview_url: "+ result.tracks.items[i].preview_url);
                            selectedpopular = result.tracks.items[i].popularity;
                            selectedprev = result.tracks.items[i].preview_url;
                            selectedSpotify = result.tracks.items[i].uri;
                            data.push({"artist":selectedartist.name,"track":selectedtrack.name,"popularity":selectedpopular,"preview":selectedprev,"spotify":selectedSpotify});
                            break;
                        }
                    }
                }
                console.log("For ciklus vége");
                console.log(data);
                chooseTrack(data);

            } else {
                console.log("no song found from spotify");
		console.log("StatusCode: "+response.statusCode);
                setTimeout(function() {}, 800);
            }

        } else {
            console.log(error + " error" + response.statusCode);
        }
    });
}


function searchArtist(rartist){
    rartist = rartist.toLowerCase();
    var searchterm = rartist;
    console.log("searching spotify for " + searchterm + " ....");
    var searchtype = "artist,track";
    var options = {
        method: 'GET',
        url: "https://api.spotify.com/v1/search",
        qs: {
            q: searchterm.replace(/ /g, "+"),
            type: searchtype,
            market: "HU",
            limit: 50
        }
    };
    var selectedtrack, selectedartist, selectedpopular, selectedprev, selectedSpotify;
    var data = [];
    
    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            
            if (result.tracks.items.length > 0) {
                
                console.log("For ciklus: " + result.tracks.items.length);
                for (var i = 0; i < result.tracks.items.length; i++){
                    selectedtrack = result.tracks.items[i];
                    var ftrack = selectedtrack.name.toLowerCase();
                    console.log(selectedtrack.name);
                    for (var j = 0; j < result.tracks.items[i].artists.length; j++){
                        selectedartist = result.tracks.items[i].artists[j];
                        var fartist = selectedartist.name.toLowerCase();
                        if (fartist === rartist){
                            console.log("Artist: " + selectedartist.name + " Track: " + selectedtrack.name);
                            console.log("Found : " + ftrack, " by ", fartist, result.tracks.items[i].popularity);
                            console.log("selectedtrack.preview_url: "+ result.tracks.items[i].preview_url);
                            selectedpopular = result.tracks.items[i].popularity;
                            selectedprev = result.tracks.items[i].preview_url;
                            selectedSpotify = result.tracks.items[i].uri;
                            data.push({"artist":selectedartist.name,"track":selectedtrack.name,"popularity":selectedpopular,"preview":selectedprev,"spotify":selectedSpotify});
                            break;
                        }
                    }
                }
                console.log("For ciklus vége");
                console.log(data);
                chooseTrack(data);

            } else {
                console.log("no song found from spotify");
		console.log("StatusCode: "+response.statusCode);
                setTimeout(function() {}, 800);
            }

        } else {
            console.log(error + " error" + response.statusCode);
        }
    });
    
}

function searchSpotify(rartist, rtrack, rgenre) {
    rartist = rartist.toLowerCase();
    rtrack = rtrack.toLowerCase();
    var searchterm = rartist;
    console.log("searching spotify for " + searchterm + " ....");
    var searchtype = "artist,track";
    var options = {
        method: 'GET',
        url: "https://api.spotify.com/v1/search",
        qs: {
            q: searchterm.replace(/ /g, "+"),
            type: searchtype,
            market: "HU",
            limit: 50
        }
    };
    var selectedtrack, selectedartist, selectedpopular, selectedprev, selectedSpotify;
    var data = [];

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            
            if (result.tracks.items.length > 0) {
                
                console.log("For ciklus: " + result.tracks.items.length);
                for (var i = 0; i < result.tracks.items.length; i++){
                    selectedtrack = result.tracks.items[i];
                    var ftrack = selectedtrack.name.toLowerCase();
                    console.log(selectedtrack.name);
                    if (ftrack === rtrack){
                        for (var j = 0; j < result.tracks.items[i].artists.length; j++){
                            selectedartist = result.tracks.items[i].artists[j];
                            var fartist = selectedartist.name.toLowerCase();
                            if (fartist === rartist){
                                console.log("Artist: " + selectedartist.name + " Track: " + selectedtrack.name);
                                console.log("Found : " + ftrack, " by ", fartist, result.tracks.items[i].popularity);
                                console.log("selectedtrack.preview_url: "+ result.tracks.items[i].preview_url);
                                selectedpopular = result.tracks.items[i].popularity;
                                selectedprev = result.tracks.items[i].preview_url;
                                selectedSpotify = result.tracks.items[i].uri;
                                data.push({"artist":selectedartist.name,"track":selectedtrack.name,"popularity":selectedpopular,"preview":selectedprev,"spotify":selectedSpotify});
                                break;
                            }
                        }
                    }
                }
                console.log("For ciklus vége");
                console.log(data);
                chooseTrack(data);

            } else {
                console.log("no song found from spotify");
		console.log("StatusCode: "+response.statusCode);
                setTimeout(function() {}, 800);
            }

        } else {
            console.log(error + " error" + response.statusCode);
        }
    });
}


function searchSpotifyTrack(rartist, rtrack, rgenre) {
    rartist = rartist.toLowerCase();
    rtrack = rtrack.toLowerCase();
    var searchterm = rtrack;
    console.log("searching spotify for " + searchterm + " ....");
    var searchtype = "artist,track";
    var options = {
        method: 'GET',
        url: "https://api.spotify.com/v1/search",
        qs: {
            q: searchterm.replace(/ /g, "+"),
            type: searchtype,
            market: "HU",
            limit: 50
        }
    };

    var selectedtrack, selectedartist, selectedpopular, selectedprev, selectedSpotify;
    var data = [];

    request(options, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var result = JSON.parse(body);
            
            if (result.tracks.items.length > 0) {
                
                rtrack = rtrack.replace(/ /g, "");
                console.log("For ciklus: " + result.tracks.items.length);
                for (var i = 0; i < result.tracks.items.length; i++){
                    selectedtrack = result.tracks.items[i];
                    var ftrack = selectedtrack.name.toLowerCase();
                    var ftrackarr = [];
                    if (/-/.test(ftrack)){
                        ftrackarr = ftrack.split("-");
                    };
                    if (/\(/.test(ftrack)){
                        ftrackarr = ftrack.split("(");
                    };
                    if (ftrackarr.length > 0){
                        ftrack = String(ftrackarr[0]);
                    };
                    ftrack = ftrack.replace(/ /g, "");
                    console.log("Track check: " + selectedtrack.name + ", ftrack: " + ftrack + " =? " + rtrack);
                    if (ftrack === rtrack){
                        for (var j = 0; j < result.tracks.items[i].artists.length; j++){
                            selectedartist = result.tracks.items[i].artists[j];
                            var fartist = selectedartist.name.toLowerCase();
                            console.log("Artist check: " + selectedartist.name + " " + fartist + " =? " + rartist);
                            if (fartist === rartist){
                                console.log("Artist: " + selectedartist.name + " Track: " + selectedtrack.name);
                                console.log("Found : " + selectedtrack.name, " by ", selectedartist.name + ", " + result.tracks.items[i].popularity);
                                console.log("selectedtrack.preview_url: "+ result.tracks.items[i].preview_url);
                                selectedpopular = result.tracks.items[i].popularity;
                                selectedprev = result.tracks.items[i].preview_url;
                                selectedSpotify = result.tracks.items[i].uri;
                                data.push({"artist":selectedartist.name,"track":selectedtrack.name,"popularity":selectedpopular,"preview":selectedprev,"spotify":selectedSpotify});
                                break;
                            }
                        }
                    }
                }
                console.log("For ciklus vége");
                console.log(data);
                chooseTrack(data);

            } else {
                console.log("no song found from spotify");
		console.log("StatusCode: " + response.statusCode);
                setTimeout(function() {}, 800);
            }

        } else {
            console.log(error + " error" + response.statusCode);
        }
    });
}


function playsound(soundfile) {
    isplaying = true;
    console.log("Playing soundfile " + soundfile);
    const ls = spawn('mpg321', [soundfile, '-g', '50']);

    ls.on('close', (code) => {
        console.log('Done with music playback!');
        isplaying = false;
    });
}

function downloadFile(url) {
    var destinationfile = "preview.mp3";
    var file = fs.createWriteStream(destinationfile);
    var donwloadrequest = request.get(url);

    // verify response code
    donwloadrequest.on('response', function(response) {
        if (response.statusCode !== 200) {
            return cb('Response status was ' + response.statusCode);
        }
    });

    // check for request errors
    donwloadrequest.on('error', function(err) {
        fs.unlink(destinationfile);
    });
    donwloadrequest.pipe(file);
    file.on('finish', function() {
        file.close();
	console.log("Download of prewiev.mp3 was successful");
	playsound("preview.mp3");

    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(destinationfile); // Delete the file async. (But we don't check the result)
    });
}

//searchSpotify("Tankcsapda", "üdvözöl a pokol", "rock");
//searchSpotifyTrack("pop evil", "trenches", "rock");
searchArtist("LP");
//searchTrack("Trenches");
