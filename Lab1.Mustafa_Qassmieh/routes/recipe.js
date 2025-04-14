import express from 'express';
import { recipeController } from '../controller/RecipeController.js';
export const router = express.Router()


/**
 * a router file relating all logic to a conroller object
 * this is very useful for scalability and sustaining
 */
router.get('/api/recipes', recipeController.getAllRecipes);
router.get('/api/recipe/:name', recipeController.getRecipeByName);
router.get('api/recipe/id/:id',recipeController.getRecipe)
router.post('/api/recipes', recipeController.createRecipe);
router.put('/api/recipes/:id', recipeController.updateRecipe);
router.delete('/api/recipes/:id', recipeController.delete);

export default router
