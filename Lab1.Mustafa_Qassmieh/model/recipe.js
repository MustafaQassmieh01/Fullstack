import mongoose from "mongoose";

const recipeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: [String],
    preparationSteps: [String],
    cookingTime:String,
    origin: String,
    spiceLevel:String
})

const Recipe = mongoose.model("Recipe",recipeSchema,'Recipe');

export default Recipe