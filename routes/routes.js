const express = require('express'),
    recipeRoutes = require('./recipes'),
    //ingredientRoutes = require('./ingredients'),
    categoriesRoutes = require('./categories');

const app = express;
// Recipes
app.get('/data/recipe/:id', recipeRoutes.getRecipe);
app.get('/data/recipes/', recipeRoutes.getRecipes);
app.post('/data/recipe/', recipeRoutes.createRecipe);

// Categories
app.get('/data/categories/', categoriesRoutes.getCategories);
app.get('/data/categories/:name', categoriesRoutes.getCategory);

module.exports = router;
