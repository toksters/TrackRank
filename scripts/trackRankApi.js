var express = require('express');
var mongo = require('./mongoMod');
var elo = require('./elo');

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

var processScores = function(obj){
    var db = mongo.get();
    if(obj._id == undefined){
        obj._id = obj.mbid;
        delete obj.mbid;
    }
    db.collection('AlbumInfo').find({_id : obj._id }).toArray(function(err, docs){
        if (err) throw err; 
        var tracksByNum = docs[0].tracks;
        //Add existing elo scores to the new rankings
        for (i in obj.tracks ){
            var eloVar = tracksByNum[obj.tracks[i].trackNum-1].eloScore;
            obj.tracks[i].eloScore = eloVar;
        };

        //Apply ranking wins and losses to the current obj
        for(var i = 0; i < obj.tracks.length - 1; i++){
            //Get expected outcome of the winner
            for(var j = i + 1; j < obj.tracks.length; j++){
                var expectedOutcome = elo.getExpectedOutcome(obj.tracks[i].eloScore, obj.tracks[j].eloScore);   
                var newWinnerRating = elo.getNewRating(obj.tracks[i].eloScore, 1, expectedOutcome);
                var newLoserRating = elo.getNewRating(obj.tracks[j].eloScore, 0, 1 - expectedOutcome);
                obj.tracks[i].eloScore = newWinnerRating;
                obj.tracks[j].eloScore = newLoserRating;
            }
        }
        obj.tracks.sort(function(track1, track2){
            return track1.trackNum - track2.trackNum;
        });
        obj.voteCount = docs[0].voteCount + 1;
        db.collection('AlbumInfo').update({_id: obj._id}, obj, {upsert: true}, function(err, fin){
            if(err) throw err;
            console.log("SUCCESS");
        });
    });
}

var createNewAlbum = function(obj){
    var mbid = obj.mbid;
    var db = mongo.get();
    var writeObj = obj;
    writeObj._id = writeObj.mbid;
    delete writeObj.mbid;
    //initialize elo score value for each track!
    writeObj.voteCount = 0;
    writeObj.tracks.forEach(function(track){
        track.eloScore = 1400;
    });
    db.collection('AlbumInfo').insert(writeObj, function(){
        processScores(obj);   
    });
}

router.post('/api/updateAlbum', function(req, res, next){
    var db = mongo.get();
    var mbid = req.body.mbid;
    var resSize = 0;
    db.collection('AlbumInfo').count({_id:  mbid }, function(err, count){
        if(count == 0){
            createNewAlbum(req.body);
        } else {
            //Update the scores here
            processScores(req.body);
        }
    });
});


exports.getRouter = function(){
    return router;
}   
