var express = require('express');
var path = require('path');
var elo = require('./elo');
var mongo = require('./mongoMod');
var app = express();
var rootpath = path.normalize(__dirname + '/../');

app.use(express.static(rootpath + "app"));
/* Connect to database */
var dburl = 'mongodb://localhost:27017/test';

mongo.connect(dburl);
/*
app.use('api/test', function(req, res){
    var db = mongo.get();
    res.send(db.collection('sample').find());    
});
*/
var router = express.Router();

router.get('/api/test', function(req, res, next){
    console.log("Request recieved");
    var db = mongo.get();
    var doc = db.collection('sample').find().toArray(function(err, docs){
        console.log(docs[0]);
        res.send(docs[0]); 
    });
});

app.use('/', router);
app.listen(8080);

console.log("Server is now running");


/*
    db.collection('sample').find().toArray(function (err, result) {
        if (err) throw err

            console.log(result)
    });
*/

