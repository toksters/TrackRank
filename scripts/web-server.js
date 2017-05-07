var express = require('express');
var path = require('path');
var elo = require('./elo');
var app = express();
var rootpath = path.normalize(__dirname + '/../');

app.use(express.static(rootpath + "app"));

var router = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Welcome to our API'});
});

app.use('/', router);

app.listen(8080);

console.log("Server is now running");
elo.testFunc();

var MongoClient = require('mongodb').MongoClient;
var db;
var connected = false;
MongoClient.connect('mongodb://localhost:27017/test', function (err, dbobj) {
        if (err) throw err
        database = dbobj;
        connected = true;
        console.log("Connected to database");
});

if(connected){
    db.collection('sample').find().toArray(function (err, result) {
        if (err) throw err

            console.log(result)
    });
}


