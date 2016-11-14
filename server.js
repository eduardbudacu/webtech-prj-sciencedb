var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var Sequelize = require("sequelize");

var sequelize = new Sequelize('agilereseach_sciencedb', 'b288dc53bdf0ab', '8359236a', {
   dialect: 'mysql',
   host: 'eu-cdbr-azure-west-a.cloudapp.net',
   port: 3306
});

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

var app = express();
app.use(bodyParser.json());
app.use(cors());


var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

// REST methods
app.get('/articles', function(req,res){
    /*global Author*/
    Article.findAll().then(function(articles){
        res.status(200).send(articles);
    });
});

app.get('/articles/:id', function(req,res){
    Article.findAll({
        where: {
            id: req.params.id
        }
    }).then(function(article){
        if(article.length > 0) {
            res.status(200).send(article[0]);
        } else {
            res.status(404).send();
        }
    });
});

app.post('/articles', function(req,res) {
   Article.create(req.body).then(function(){
        res.status(201).send();
    }).catch(function(err){
        console.warn(err);
    });
});

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