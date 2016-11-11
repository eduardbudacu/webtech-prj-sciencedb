var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

var app = express();
app.use(bodyParser.json());
app.use(cors());


var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

// REST methods
app.get('/articles', function(req,res){
    res.status(200).send([]);
});

app.listen(process.env.PORT);