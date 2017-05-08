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

var createNewAlbum = function(obj){
    var mbid = obj.mbid;
    var db = mongo.get();
    var writeObj = obj;
    writeObj._id = writeObj.mbid;
    delete writeObj.mbid;
    //initialize elo score value for each track!
    writeObj.tracks.forEach(function(track){
        track.eloScore = 1400;
    });
    db.collection('AlbumInfo').insert(writeObj);
}

router.post('/api/updateAlbum', function(req, res, next){
    var db = mongo.get();
    var mbid = req.body.mbid;
    console.log(mbid);
    var resSize = 0;
    db.collection('AlbumInfo').count({_id:  mbid }, function(err, count){
        if(resSize == 0){
            createNewAlbum(req.body);
        } else {
            //Update the scores here
            
        }
    });
});


exports.getRouter = function(){
    return router;
}   
