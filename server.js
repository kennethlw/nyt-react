// Require Node Modules
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan'); // for debugging


// Initialize Express for debugging & body parsing
const app = express();
var PORT = process.env.PORT || 3000;

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

// Serve Static Content
app.use(express.static('public'));

// Database Configuration with Mongoose
// ---------------------------------------

var databaseUri = "mongodb://localhost/nytreact";
// Connect to localhost if not a production environment
if (process.env.MONGODB_URI) {
   mongoose.connect(process.env.MONGODB_URI); 
}
else {
  mongoose.connect(databaseUri);
}

// Create our connection to the database
var db = mongoose.connection;

// Show any Mongoose errors
db.on('error', function(err) {
  console.log('Mongoose Error: ', err);
});

// Once logged in to the db through mongoose, log a success message
db.once('open', function() {
  console.log('Mongoose connection successful.');
});

// --------------------------------------------


// Import Routes/Controller
var Article = require('./models/Article.js');

const router = require('./controllers/controller.js');
app.use('/', router);


app.post('/api/saved', function(req, res) {
  
  // Using the Article model, create a new entry 
  var newArticle = new Article({
    title: req.body.title, 
    date: req.body.date, 
    url: req.body.url
  });

  // Save the entry to MongoDB
  newArticle.save(function(err, doc) {
    // log any errors
    if (err) {
      console.log(err);
      res.send(err);
    } 
    // or log the doc that was saved to the DB
    else {
      res.send(doc);
    }
  });

});

/*
app.delete('/api/saved/:id', function(req, res){

  Article.find({'_id': req.params.id}).remove()
    .exec(function(err, doc) {
      res.send(doc);
  });

});
*/


// Launch App
app.listen(PORT, function(){
  console.log('Running on port: ' + PORT);
});