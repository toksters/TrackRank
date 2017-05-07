var express = require('express');
var path = require('path');
var app = express();
var rootpath = path.normalize(__dirname + '/../');

app.use(express.static(rootpath + "app"));

var router = express.Router();

router.get('/', function(req, res){
    res.json({message: 'Welcome to our API'});
});

router

app.use('/', router);

app.listen(8080);

console.log("Server is now running");

var MongoClient = require('mongodb').MongoClient;
MongoClient.connect('mongodb://localhost:27017/test', function (err, db) {
          if (err) throw err

            db.collection('sample').find().toArray(function (err, result) {
                    if (err) throw err

                            console.log(result)
                                  })
            })

