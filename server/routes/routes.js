const express = require('express'),
    recipeRoutes = require('./recipes'),
    //ingredientRoutes = require('./ingredients'),
    categoriesRoutes = require('./categories');
var router = express.Router();

// Recipes
router.get('/recipe/:id', recipeRoutes.getRecipe);
router.get('/recipes/', recipeRoutes.getRecipes);
router.post('/recipe/', recipeRoutes.createRecipe);

// Categories
router.get('/categories/', categoriesRoutes.getCategories);
router.get('/categories/:name', categoriesRoutes.getCategory);

module.exports = router;
