var models  = require('../models');
var express = require('express');
var router  = express.Router();

var Term = models.Termș

router.post('/terms', function(request,response) {
  Article.create(request.body).then(function(article) {
      Article.findById(article.id).then(function(article) {
          response.status(201).send(article);
      });
  });
});

router.get('/terms', function(request,response){
     /*global Article*/
   /* Article.findAll().then(function(articles){
        response.status(200).send(articles);
    });*/
    response.status(200).send([{id: 1, term:"Sprint Planning", term_ro: "Planificarea Sprintului", description: "Meeting", description_ro: "Întălnire de proiect"}]);
});

router.get('/terms/:id', function(request,response){
    Article.findById(request.params.id).then(function(article){
        if(article) {
            response.status(200).send(article);
        } else {
            response.status(404).send();
        }
    });
});

router.put('/terms/:id', function(request,response){
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