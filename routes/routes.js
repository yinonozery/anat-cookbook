const express = require('express'),
    recipeRoutes = require('./recipes'),
    userRoutes = require('./users'),
    categoriesRoutes = require('./categories'),
    featuresRoutes = require('./features.js'),
    router = express.Router(),
    jwt = require('jsonwebtoken');

const verifyJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res.json({
                    isLoggedIn: false,
                    message: 'סיסמה שגויה',
                });
            res.user = {};
            res.user.id = decoded.id;
            res.user.email = decoded.email;
            next();
        });
    } else
        return res.json({
            message: 'אינך רשאי לגשת לעמוד זה',
            isLoggedIn: false,
            success: false,
        });
};

router.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, '/build', 'index.html'));
});

// Recipes
router.get('/api/recipe/:id', verifyJWT, recipeRoutes.getRecipe);
router.get('/api/recipes/', verifyJWT, recipeRoutes.getRecipes);
router.post('/api/recipe/', verifyJWT, recipeRoutes.createRecipe);

// Categories
router.get('/api/categories/', categoriesRoutes.getCategories);
router.get('/api/categories/:name', verifyJWT, categoriesRoutes.getCategory);

// Users
router.post('/api/auth/register', userRoutes.register);
router.post('/api/auth/login', userRoutes.login);
router.get('/api/auth/logout', verifyJWT, userRoutes.logout);
router.get('/api/auth/profile', verifyJWT, userRoutes.profile);

// Features
router.get('/api/user/favorites/', verifyJWT, featuresRoutes.getMyProfile);
router.post(
    '/api/user/favorites/add/',
    verifyJWT,
    featuresRoutes.addToFavorites
);
router.post(
    '/api/user/favorites/getInitialStatus/',
    featuresRoutes.getInitialStatus
);

module.exports = router;
