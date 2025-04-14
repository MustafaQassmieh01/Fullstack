import Recipe from '../model/recipe.js'

export const recipeController = {};

recipeController.verify = (req,res,next,id) => {

}
recipeController.getAllRecipes = async (req,res)=> {
    try{
        const recipes = await Recipe.find();
        res.status(200).json(recipes);
    }catch(err){
        res.status(500).json({message: err.message})
    }
}


recipeController.getRecipeByName =async (req,res)=> {
    try{
        const recipes = await Recipe.find({ name: { $regex: req.params.name, $options: 'i' } });
        res.status(200).json(recipes)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}
recipeController.getRecipe =async (req,res)=> {
    try{
        const recipe = await Recipe.findById(req.params.id)
        res.status(200).json(recipe)
    }catch(err){
        res.status(404).json({message: err.message})
    }
}

recipeController.createRecipe = async (req, res)=> {
    try{
        const newRecipe = new Recipe(req.body);
        await newRecipe.save()
        res.status(200).json(newRecipe)
    }catch(err){
        if(err.name === 'ValidationError'){
            return res.status(400).json({message: 'Validation failed', errors: err.errors})
        }
        res.status(500).json({message: 'error creating recipe',error: err.message})
    }
}


/**
 * 
 * @param {Number,body} req 
 * @param {status, json} res 
 * @returns 
 */
recipeController.updateRecipe = async (req,res)=>{
    try{
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.id,req.body); // so this returns null if the recipe is not found which means the code will continue error-less
        // If no recipe was found and updated, send a 404 error
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json({message: "update succesfull", updatedRecipe})
    }catch(err){
        // here checking if the body sent is in fact in the correct format
        if(err.name === 'ValidationError'){
            return res.status(400).json({message: 'Validation failed', errors: err.errors})
        }
        // server errors are still a thing
        res.status(500).json({message: 'error creating recipe',error: err.message})
    }
}
recipeController.delete = async (req,res)=> {
    try{
        const deleteRecipe = await Recipe.findByIdAndDelete(req.params.id)
        if(!deleteRecipe){
            return res.status(404).json({message: 'Id not found'})
        }
    }catch(err){
        res.status(500).json({message: 'could not Delete Recipe', errors: err})
    }
}