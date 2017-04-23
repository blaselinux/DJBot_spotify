
# spotify_player [Beta - meaning still in development]

## How It Works
- Download the song preview (mp3) from Spotify
- Play song.
- Create the playlist on Spotify (if it not exist)
- Add track to the playlist


## Dependencies

### Install mp3 player
This app requires mpg321 to play an mp3 file.

    sudo apt-get update
    sudo apt-get install mpg321

### Install npm
Following this, you will need to install node Dependencies

    npm install

### Install mongoDB on (Ubuntu/Linux Mint)

[MongoDB install guide for Ubuntu](https://docs.mongodb.com/master/tutorial/install-mongodb-on-ubuntu/)

    sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6
    echo "deb [ arch=amd64,arm64 ] http://repo.mongodb.org/apt/ubuntu xenial/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list
    sudo apt-get update
    sudo apt-get install -y mongodb-org


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
- [mongodb](https://www.npmjs.com/package/mongodb) : The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.