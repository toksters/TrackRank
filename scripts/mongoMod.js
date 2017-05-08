var MongoClient = require('mongodb').MongoClient;
var state = {
    db: null
};

exports.connect = function(url){
    if (state.db) {
        console.log("Already connected");
    }
    
    return MongoClient.connect(url, function(err, dbobj){
        if(err) throw err
        state.db = dbobj;
        console.log("Connected to database");
        return state.db;
    });
};

exports.get = function(){
    return state.db;
}

exports.close = function(){
    if(state.db){
        state.db.close(function(err, result){
            state.db = null;
            state.mode = null;
        });
    }
}
