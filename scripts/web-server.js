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



