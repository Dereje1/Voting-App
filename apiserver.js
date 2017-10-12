var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs Start
var mongoose = require('mongoose')
mongoose.connect("mongodb://localhost:27017/votingapp")
var Polls = require('./models/polls')

//Add New Poll//
app.post('/polls', function(req,res){
  var pollAdd = req.body;
  //console.log(recipe)
  Polls.create(pollAdd,function(err,poll){
    if(err){
      throw err;
    }
    res.json(poll)
  })
})
//Get all Polls
app.get('/polls', function(req,res){
  Polls.find(function(err,poll){
    if(err){
      throw err;
    }
    res.json(poll)
  })
})
//Get specific Poll
app.get('/polls/:user', function(req,res){
  var query = {created: req.params.user};
  Polls.find(query,function(err,poll){
    if(err){
      throw err;
    }
    res.json(poll)
  })
})
//Delete polls
app.delete('/polls/:_id', function(req,res){
  var query = {_id: req.params._id};
  Polls.remove(query, function(err, poll){
    if(err){
    throw err;
    }
    res.json(poll);
  })
})

//update polls from db
app.put('/polls/:_id', function(req, res){
   var pollToUpdate = req.body;
   var pollID = req.params._id;
   // if the field doesn't exist $set will set a new field
   //change to findByIdAndUpdate to make it congruent with delete
   var update = { '$set': {options: pollToUpdate.options, voted: pollToUpdate.voted}};
   // When true returns the updated document
   var modified = {new: true};
   Polls.findByIdAndUpdate(pollID, update, modified, function(err, poll){
       if(err){
         throw err;
       }
       res.json(poll);
   })
})

//APIs end

app.listen(3001,function(err){
  if(err){
    console.log(err)
  }
  console.log("API Server is listening on port 3001")
})
