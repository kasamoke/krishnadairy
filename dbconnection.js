const mysql = require('mysql'); 
var con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"root",
    database:"projectbase"
});

con.connect((err)=>{
    if(err) console.log("Following error occurred while connecting to the database \n" + err);
    else{
        console.log("Connection successful to the database");
    }
});

module.exports = con;