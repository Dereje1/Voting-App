"use strict"
var mongoose = require('mongoose');
var activeSchema = mongoose.Schema({
   active: String
});

var ActivePoll = mongoose.model('ActivePoll',activeSchema);
module.exports = ActivePoll;
