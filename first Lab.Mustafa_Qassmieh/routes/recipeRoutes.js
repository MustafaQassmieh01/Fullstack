const express = require('express');
const router = express.Router();
const Recipe = require('../model/recipe');
const { Console } = require('console');

router.post('/recipes/new',async (req, res)=> {
    const {title,imageUrl, ingredients,instructions,cookingTime} = req.body;
    const newRecipe = new Recipe({title,imageUrl, ingredients,instructions,cookingTime});
    try {
        const recipe = await newRecipe.save();
        res.status(201).json(recipe);
    } catch (err) {
    res.status(400).json({message: err.message});}
    
});



router.put('/recipes/update/:_id', getRecipe, async (req, res)=> {
    console.log('recipes update');
    const {title,imageUrl, ingredients,instructions,cookingTime} = req.body;

    if(title!=null) res.recipe.title = title;
    if (imageUrl!=null) res.recipe.imageUrl = imageUrl;
    if(ingredients!=null) res.recipe.ingredients = ingredients;
    if(instructions!=null) res.recipe.instructions = instructions;
    if (cookingTime!= null) res.recipe.cookingTime = cookingTime;
    try{
        const updatedRecipe = await res.recipe.save();
        console.log(updatedRecipe);
        res.json(updatedRecipe);
    }catch(err){
        console.log(err);
        res.status(400).json({message:err.message})
    }
});



router.get('/recipes',async (req, res)=> {
    try {
        const recipes = await Recipe.find();
        // console.log(recipes);
        res.status(200).json(recipes);
    } catch (err) {
        res.status(500).json({message: err.message});
    }
});

// NOT Needed

// router.get('/recipes/title/:title',async (req, res)=> { 
//     try{
//         const title =  req.params.title;
//         const recipe = await Recipe.find({ title: new RegExp(`^${title}$`, 'i') });
//         if (recipe){
//             res.status(200).json(recipe);
//         }else{
//             res.status(404).json({ message: `Recipe not found`})
//         }
//     }catch(err){

//         res.status(500).json({error: err.message});
//     }
// });

router.get('/recipe/:id', getRecipe, async (req, res)=> {
    res.json(recipe);
});



router.delete('/recipes/delete/:_id',getRecipe, async (req, res)=> {

    try{
        console.log(req.params._id);
        const result = await res.recipe.deleteOne();
        res.json({message: 'Recipe deleted successfully'});
    }catch (err) {
    res.status(500).json({message: err.message});
    }
});



async function getRecipe(req, res, next) {
    
    let recipe;
    console.log('getting recipe');
    try {
        recipe = await Recipe.findById(req.params._id);
        console.log('r');
        if (recipe==null){
            console.log('recipe not found1');
            return res.status(404).json({message: err.message});

        }
    } catch(err){
        console.log('recipe not found error2');
        return res.status(500).json({message: err.message})
    }
    res.recipe = recipe;
    next();
}


module.exports =router;