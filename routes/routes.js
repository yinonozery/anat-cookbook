const express = require('express'),
    recipeRoutes = require('./recipes'),
    //ingredientRoutes = require('./ingredients'),
    categoriesRoutes = require('./categories');
var router = express.Router();

// Recipes
router.get('/data/recipe/:id', recipeRoutes.getRecipe);
router.get('/data/recipes/', recipeRoutes.getRecipes);
router.post('/data/recipe/', recipeRoutes.createRecipe);

// Categories
router.get('/data/categories/', categoriesRoutes.getCategories);
router.get('/data/categories/:name', categoriesRoutes.getCategory);

module.exports = router;
