const express = require('express'),
    cors = require('cors'),
    path = require('path'),
    recipeRoutes = require('./routes/recipes'),
    //ingredientRoutes = require('./ingredients'),
    categoriesRoutes = require('./routes/categories');

require('./db/mongoose');

const app = express();

// Recipes
app.get('/data/recipe/:id', recipeRoutes.getRecipe);
app.get('/data/recipes/', recipeRoutes.getRecipes);
app.post('/data/recipe/', recipeRoutes.createRecipe);

// Categories
app.get('/data/categories/', categoriesRoutes.getCategories);
app.get('/data/categories/:name', categoriesRoutes.getCategory);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: '*',
    })
);

app.use(express.static(path.join(__dirname, '/client/public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/client/public/', 'index.html'));
});

const PORT = process.env.port || 3000;
const server = app.listen(PORT, () => {
    console.log('listening on port %s...', server.address().port);
});
