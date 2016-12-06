var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");

// init sequelize connexion
var sequelize = new Sequelize('sciencedb', 'eduardbudacu', '', {
   dialect: 'mysql',
   host: '127.0.0.1',
   port: 3306
});

// define entity
var Article = sequelize.define('articles', {
  title: {
    type: Sequelize.STRING,
    field: 'title'
  },
  abstract: {
    type: Sequelize.STRING,
    field: 'abstract'
  },
  authors: {
    type: Sequelize.STRING,
    field: 'authors'
  },
  keywords: {
    type: Sequelize.STRING,
    field: 'keywords'
  },
  url: {
    type: Sequelize.STRING,
    field: 'url'
  }
}, {
  timestamps: false
});

// init express application
var app = express();
app.use(bodyParser.json());
app.use(cors());

// include nodeadmin app
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

// REST methods

// create an article
app.post('/articles', function(request,response) {
  Article.create(request.body).then(function(article) {
      Article.findById(article.id).then(function(article) {
          response.status(201).send(article);
      });
  });
});

app.get('/articles', function(request,response){
     /*global Article*/
    Article.findAll().then(function(articles){
        response.status(200).send(articles);
    });
});

app.get('/articles/:id', function(request,response){
    Article.findById(request.params.id).then(function(article){
        if(article) {
            response.status(200).send(article);
        } else {
            response.status(404).send();
        }
    });
});

// update a specific article by id
app.put('/articles/:id', function(request,response){
    Article
        .findById(request.params.id)
        .then(function(article){
            if(article) {
                article
                    .updateAttributes(request.body)
                    .then(function(){
                        response.status(202).send('updated');
                    })
                    .catch(function(error){
                        console.warn(error);
                        response.status(400).send('server error');
                    });
            } else {
                response.status(404).send();
            }
        });
});

// delete an article by id
app.delete('/articles/:id', function(req,res){
    Article
        .findById(req.params.id)
        .then(function(article){
            if(article) {
                article
                    .destroy()
                    .then(function(){
                        res.status(204).send();
                    })
                    .catch(function(error){
                        console.warn(error);
                        res.status(400).send('server error');
                    });
            } else {
                res.status(404).send();
            }
        });
});

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