const mongoose = require('mongoose');
const { listenerCount } = require('process');

const recipeSchema = new mongoose.Schema({
  
    title: { type: String, required: true },
    imageUrl:String,
    ingredients: [{ type: String, required: true }], 
    instructions: { type: String, required: true }, 
    cookingTime: { type: Number, required: true }
  });
  
const Recipe = mongoose.model("Recipe", recipeSchema);


module.exports = Recipe;