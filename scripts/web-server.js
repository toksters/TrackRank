var express = require('express');
var path = require('path');
var elo = require('./elo');
var mongo = require('./mongoMod');
var app = express();
var rootpath = path.normalize(__dirname + '/../');

app.use(express.static(rootpath + "app"));
/* Connect to database */
var dburl = 'mongodb://localhost:27017/test';


app.use('api/test', function(req, res){
    
});

var router = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Welcome to our API'});
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

