var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//APIs Start
var db = require('./models/db') //mongoose required schema
var Polls = require('./models/polls')

//Add New Poll//
app.post('/polls', function(req,res){
  var pollAdd = req.body;
  Polls.create(pollAdd,function(err,poll){
    if(err){
      throw err;
    }
    res.json(poll)
  })
})

//Get all Polls/single poll or user defined polls
app.get('/polls/:user?', function(req,res){
  //example /polls/ --> all data
  // /polls/jdoe --> param = jdoe , use to pull user data
  // /polls/?singlepoll=xyz , use to pull data only for xyz
  var query;

  if(req.params.user){
    query = {created: req.params.user};
  }
  else if(req.query.singlepoll){
    query = {_id: req.query.singlepoll};
  }
  else{
    query ={}
  }
  Polls.find(query,function(err,poll){
    if(err){
      res.json (err) ;
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
   // change to findByIdAndUpdate to make it congruent with delete
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
