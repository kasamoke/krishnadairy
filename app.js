const express = require('express');
const app = express();

var con = require('./dbconnection');
require('./user')(app,con);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.listen(3000,()=>{
    console.log("Srver started on port 3000");
});