var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var models  = require('./models');

// define entity
var Article = models.Article;

// init express application
var app = express();
app.use(bodyParser.json());
app.use(cors());

// REST methods
app.use(require("./routes/articles.js"));
app.use(require("./routes/terms.js"));

// include static files in the admin folder
app.use('/sciencedb', express.static('sciencedb'));
app.use(express.static('app'));

// include swagger api docummentation
var swaggerUi = require('swaggerize-ui'); // second change

app.get('/swagger', function(req, res){
    var api = require('./config/api.json');
    api.host = undefined;
    res.status(200).send(api);
});

app.use('/docs', swaggerUi({
  docs: '/swagger'  
}));

app.listen(process.env.PORT);