"use strict"
var mongoose = require('mongoose');
var pollSchema = mongoose.Schema({
   title: String,
   options: [[]]
});

var Polls = mongoose.model('Polls',pollSchema);
module.exports = Polls;
