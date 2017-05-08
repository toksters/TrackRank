var express = require('express');
var mongo = require('./mongoMod');

var router = express.Router();
var dburl = 'mongodb://localhost:27017/TrackRank';

mongo.connect(dburl);

/** TEST CODE: Commented out for reference 
router.get('/api/test', function(req, res, next){
    console.log("Request recieved");
    var db = mongo.get();
    var doc = db.collection('sample').find().toArray(function(err, docs){
        console.log(docs[0]);
        res.send(docs[0]); 
    });
});

router.get('/api/test2', function(req, res, next){
    console.log("Request Recieved");
    res.send("HELLO WORLD");
});
*/

router.post('/api/writeNewAlbum', function(req, res, next){
    var mbid = req.body.mbid;
    var db = mongo.get();
    var writeObj = req.body;
    writeObj._id = writeObj.mbid;
    delete writeObj.mbid;
    //initialize elo score value for each track!
    writeObj.tracks.forEach(function(track){
        track.eloScore = 1400;
    });
    db.collection('AlbumInfo').insert(writeObj);
    res.sendStatus(200);    
});

exports.getRouter = function(){
    return router;
}   
