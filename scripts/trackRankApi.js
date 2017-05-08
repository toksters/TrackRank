var express = require('express');
var mongo = require('./mongoMod');

var router = express.Router();
var dburl = 'mongodb://localhost:27017/test';

mongo.connect(dburl);

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

exports.getRouter = function(){
    return router;
}   
