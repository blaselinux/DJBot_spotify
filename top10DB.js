/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


exports.addToTop10 = function (data) {
    // Retrieve
    var MongoClient = require('mongodb').MongoClient;

    // Connect to the db
    MongoClient.connect("mongodb://localhost:27017/djbot", function(err, db) {
        if(!err) {
            console.log("We are connected");
        }
    });
    console.log(data);
    var artist = data.artist;
    var track = data.track;
    var status = "A";
    console.log('artist \t track \t status');
    console.log(artist + " " + track + " " + status);
    
    var collection = db.collection('test');
    var doc = {mykey:1, fieldtoupdate:1};

    collection.insert(doc, {w:1}, function(err, result) {
        collection.update({mykey:1}, {$set:{fieldtoupdate:2}}, {w:1}, function(err, result) {});
    });
};

