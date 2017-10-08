"use strict"
var mongoose = require('mongoose');
var recipeSchema = mongoose.Schema({
   name: String,
   ingredients: [String]
});

var Recipes = mongoose.model('Recipes',recipeSchema);
module.exports = Recipes;
