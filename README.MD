
# spotify_player [Beta - meaning still in development]

## How It Works
- Download the song preview (mp3) from Spotify
- Play song.
- Create the playlist on Spotify (if it not exist)
- Add track to the playlist


## Dependencies

This app requires mpg321 to play an mp3 file.

    sudo apt-get update
    sudo apt-get install mpg321

Following this, you will need to install node Dependencies
    npm install

## Running

Start the application.

    node main.js     



Dependencies List

- [web-audio-api](https://www.npmjs.com/package/web-audio-api) : implementation (partial) of the HTML5 web audio api, used to decode sound files.
- [underscorejs](https://www.npmjs.com/package/underscore) : functional programming helper library for data manipulation.
- [node-aplay](https://www.npmjs.com/package/node-aplay) : Simple nodejs wrapper for aplay.
- [rpi-ws281x-native](https://www.npmjs.com/package/rpi-ws281x-native) : basic set of functions to write data to a strip of ws2811/ws2812 LEDs.
- [spotify-web-api-node](https://www.npmjs.com/package/spotify-web-api-js) : This is a lightweight wrapper for the Spotify Web API.
- [superagent](https://www.npmjs.com/package/superagent) : SuperAgent is a small progressive client-side HTTP request library, and Node.js module with the same API, sporting many high-level HTTP client features.