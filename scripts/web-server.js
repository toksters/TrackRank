var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongo = require('./mongoMod');
var api = require('./trackRankApi');
var app = express();
var rootpath = path.normalize(__dirname + '/../');

app.use(express.static(rootpath + "app"));
/* Connect to database */
/*
app.use('api/test', function(req, res){
    var db = mongo.get();
    res.send(db.collection('sample').find());    
});
*/
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', api.getRouter());
app.listen(8080);

console.log("Server is now running");


/*
    db.collection('sample').find().toArray(function (err, result) {
        if (err) throw err

            console.log(result)
    });
*/

