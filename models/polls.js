"use strict"//schema for a poll
var mongoose = require('mongoose');
var pollSchema = mongoose.Schema({
   title: String,
   options: [[]],
   created: String,
   voted: [String]
});

var Polls = mongoose.model('Polls',pollSchema);
module.exports = Polls;
