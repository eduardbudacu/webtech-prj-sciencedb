var models  = require('../models');
var express = require('express');
var router  = express.Router();

var Article = models.Article;

// create an article
router.post('/articles', function(request,response) {
  Article.create(request.body).then(function(article) {
      Article.findById(article.id).then(function(article) {
          response.status(201).send(article);
      });
  });
});

// returns all articles
router.get('/articles', function(request,response){
     /*global Article*/
    Article.findAll().then(function(articles){
        response.status(200).send(articles);
    });
});

// returns one article by id
router.get('/articles/:id', function(request,response){
    Article.findById(request.params.id).then(function(article){
        if(article) {
            response.status(200).send(article);
        } else {
            response.status(404).send();
        }
    });
});

// update a specific article by id
router.put('/articles/:id', function(request,response){
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
router.delete('/articles/:id', function(req,res){
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

module.exports = router;