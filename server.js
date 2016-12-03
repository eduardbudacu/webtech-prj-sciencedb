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
  freezeTableName: false, // Model tableName will be the same as the model name
  timestamps: false
});

// init express application
var app = express();
app.use(bodyParser.json());
app.use(cors());

// include static files in the admin folder
app.use('/admin', express.static('admin'));

// include nodeadmin app
var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

// REST methods

// lh2zx});

// create an article
app.post('/articles', function(req,res) {
  Article.create(req.body).then(function(article) {
      Article.findById(article.id).then(function(article) {
          res.status(201).send(article);
      });
  })
});

// update a specific article by id
app.put('/articles/:id', function(req,res){
    Article
        .find({where : {id : req.params.id}})
        .then(function(article){
            return article.updateAttributes(req.body);
        })
        .then(function(){
            res.status(201).send('updated');
        })
        .catch(function(error){
            console.warn(error);
            res.status(400).send('not found');
        });
});

// delete an article by id
app.delete('/articles/:id', function(req,res){
    Article
        .find({where : {id : req.params.id}})
        .then(function(article){
            return article.destroy();
        })
        .then(function(){
            res.status(201).send('deleted');
        })
        .catch(function(error){
            console.warn(error);
            res.status(400).send('not found');
        });
});

app.listen(process.env.PORT);