const express = require('express');
const app = express();

var getConnection = require('./dbconnection');
require('./user')(app, getConnection);
require('./reg_order')(app, getConnection);


var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
    console.log("Server started on port 3000");
});