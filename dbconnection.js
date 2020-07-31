//|--------------------------------------------|
//    Written By: Niraj Kumar Pandey
//|--------------------------------------------|  

const mysql = require('mysql'); 
var pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"root",
    database:"projectbase"
});

var getConnection = function(callback) {
    pool.getConnection(function(err, connection) {
        if(err){console.log("Some error with connection to the DB");}
        callback(err, connection);
    });
};


module.exports = getConnection;
