//|--------------------------------------------|
//    Written By: Niraj Kumar Pandey
//|--------------------------------------------|    

const express = require('express');
const app = express();

var getConnection = require('./dbconnection');
require('./user')(app,getConnection);
require('./reg_order')(app,getConnection);
require('./rep_order')(app,getConnection);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/',(req,res)=>{
    res.sendFile(__dirname + '/index.html');
});

app.listen(3000, () => {
    console.log("Server started on port 3000");
});
