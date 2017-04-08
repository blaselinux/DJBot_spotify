/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var Sound = require('node-aplay');
//var AudioContext = require('web-audio-api').AudioContext
//context = new AudioContext
var _ = require('underscore');
var request = require("request");
var fs = require('fs');
var exec = require('child_process').exec;
const spawn = require('child_process').spawn;

function searchSpotify(rartist, rtrack, rgenre) {
    rartist = rartist.toLowerCase();
    rtrack = rtrack.toLowerCase();
    rartist = rartist.toLowerCase();
    var searchterm = rartist;
    console.log("searching spotify for " + searchterm + " ....");
    var searchtype = "artist,track"
    var options = {
        method: 'GET',
        url: "https://api.spotify.com/v1/search",
        qs: {
            q: searchterm.replace(/ /g, "+"),
            type: searchtype,
            market: "HU",
            limit: 50
        }
    }
    var trackartists = ""
    //var maxpopularity = 0;
    var selectedtrack, selectedartist, selectedpopular, selectedprev;
    var data = [];

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body)
            
            if (result.tracks.items.length > 0) {
                //downloadFile(result.tracks.items[0].preview_url) ; // download preview file
                //selectedtrack = result.tracks.items[0];
                
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
                                data.push({"artist":selectedartist.name,"track":selectedtrack.name,"popularity":selectedpopular,"preview":selectedprev});
                                //index++;
                                break;
                            }
                        }
                    }
                }
                console.log("For ciklus vége");
                console.log(data);
                var choose = 0;
                for (var i = 1; i < data.length; i++){
                    if (data[choose].popularity < data[i].popularity){
                        choose =i;
                    }
                }
                downloadFile(data[choose].preview);
                
                
                /*
                result.tracks.items.forEach(function(track) {

                    selectedtrack = track.popularity > maxpopularity ? track : selectedtrack;
                    maxpopularity = track.popularity > maxpopularity ? track.popularity : maxpopularity;
                    console.log("selectedtrack: " + result.tracks.items[0].name);
                    console.log("Artist: " + result.tracks.items[0].artists[0].name);

                })*/
                //get selected track artists
                /*if (selectedtrack !== undefined) {
                        selectedtrack.artists.forEach(function(artist) {
                            trackartists = trackartists + artist.name + ", "
                        })
                        console.log("Found : " + selectedtrack.name, " by ", trackartists, selectedtrack.popularity)
                        console.log("selectedtrack.preview_url: "+selectedtrack.preview_url)
                        //downloadFile(selectedtrack.preview_url);
                }*/

            } else {
                console.log("no song found from spotify")
		console.log("StatusCode: "+response.statusCode)
               // setLEDColor("red", 255)
                setTimeout(function() {
                   // setLEDColor("white", 255);
                }, 800);
            }

        } else {
            console.log(error + " error" + response.statusCode)
        }
    })
}


function searchSpotifyTrack(rartist, rtrack, rgenre) {
    rartist = rtrack.toLowerCase();
    rtrack = rtrack.toLowerCase();
    rartist = rartist.toLowerCase();
    var searchterm = rartist;
    console.log("searching spotify for " + searchterm + " ....");
    var searchtype = "artist,track"
    var options = {
        method: 'GET',
        url: "https://api.spotify.com/v1/search",
        qs: {
            q: searchterm.replace(/ /g, "+"),
            type: searchtype,
            market: "HU",
            limit: 50
        }
    }
    var trackartists = ""
    //var maxpopularity = 0;
    var selectedtrack, selectedartist, selectedpopular, selectedprev;
    var data = [];

    request(options, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            var result = JSON.parse(body)
            
            if (result.tracks.items.length > 0) {
                //downloadFile(result.tracks.items[0].preview_url) ; // download preview file
                //selectedtrack = result.tracks.items[0];
                
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
                                data.push({"artist":selectedartist.name,"track":selectedtrack.name,"popularity":selectedpopular,"preview":selectedprev});
                                //index++;
                                break;
                            }
                        }
                    }
                }
                console.log("For ciklus vége");
                console.log(data);
                var choose = 0;
                for (var i = 1; i < data.length; i++){
                    if (data[choose].popularity < data[i].popularity){
                        choose = i;
                    }
                }
                downloadFile(data[choose].preview);
                
                
                /*
                result.tracks.items.forEach(function(track) {

                    selectedtrack = track.popularity > maxpopularity ? track : selectedtrack;
                    maxpopularity = track.popularity > maxpopularity ? track.popularity : maxpopularity;
                    console.log("selectedtrack: " + result.tracks.items[0].name);
                    console.log("Artist: " + result.tracks.items[0].artists[0].name);

                })*/
                //get selected track artists
                /*if (selectedtrack !== undefined) {
                        selectedtrack.artists.forEach(function(artist) {
                            trackartists = trackartists + artist.name + ", "
                        })
                        console.log("Found : " + selectedtrack.name, " by ", trackartists, selectedtrack.popularity)
                        console.log("selectedtrack.preview_url: "+selectedtrack.preview_url)
                        //downloadFile(selectedtrack.preview_url);
                }*/

            } else {
                console.log("no song found from spotify")
		console.log("StatusCode: "+response.statusCode)
               // setLEDColor("red", 255)
                setTimeout(function() {
                   // setLEDColor("white", 255);
                }, 800);
            }

        } else {
            console.log(error + " error" + response.statusCode)
        }
    })
}


function playsound(soundfile) {
    isplaying = true;
    console.log("Playing soundfile " + soundfile);
    const ls = spawn('mpg321', [soundfile, '-g', '50']);

    ls.on('close', (code) => {
        console.log('Done with music playback!');
        isplaying = false
    });
}

function downloadFile(url) {
    var destinationfile = "preview.mp3"
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
       // dance(destinationfile);
	console.log("Download of prewiev.mp3 was successful");
	playsound("preview.mp3");

    });

    file.on('error', function(err) { // Handle errors
        fs.unlink(destinationfile); // Delete the file async. (But we don't check the result)
    });
}

searchSpotify("Tankcsapda", "üdvözöl a pokol", "rock");
//searchSpotifyTrack("Tankcsapda", "üdvözöl a pokol", "rock");