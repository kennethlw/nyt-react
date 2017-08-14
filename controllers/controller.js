// Node Dependencies
const express = require('express');
const router = express.Router();


// Import the Article model
const Article = require('../models/Article.js');

// This will display the ReactJS application.
router.get('/', function(req, res) {
  res.render('index');
});

// API GET - the components will use this to query MongoDB for all saved articles.
router.get('/api/saved', function(req, res) {
  
  // Query Mongo for the Articles
   Article.find({}).exec(function(err, doc){
      // log any errors
      if (err){
        console.log(err);
      } 
      // or send the doc to the browser as a json object
      else {
        res.json(doc);
      }
   });
});



// API DELETE - your components will use this to delete a saved article in the database
router.delete("/api/saved/:id", function(req, res) {
  console.log(req.params.id);
  Article.findByIdAndRemove(req.params.id, function (err, todo) {
    if (err) {
      console.log(err);      
      res.send(err);
    } 
    else {
      res.send(todo);
    }
  });

});

// This redirect user to the "/" route for any unknown cases
router.get("*", function(req, res) {
  res.redirect("/");
});

// Export Router to Server.js
module.exports = router;