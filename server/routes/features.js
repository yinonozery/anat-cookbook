const Users = require('../models/users');
const jwt = require('jsonwebtoken');

module.exports = {
    getMyProfile: (req, res) => {
        let userInfo;
        jwt.verify(
            req.cookies.token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(401).json({
                        success: false,
                        message: 'בעיה באימות המשתמש',
                    });
                userInfo = decoded;
            }
        );
        Users.findById(userInfo.id)
            .populate('favoritesList')
            .populate('recipesList')
            .then((user) => {
                res.status(200).json({
                    data: user,
                    success: true,
                });
            })
            .catch((e) => res.status(500).send());
    },
    getMyRecipes: (req, res) => {
        let userInfo;
        jwt.verify(
            req.cookies.token,
            process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(401).json({
                        success: false,
                        message: 'בעיה באימות המשתמש',
                    });
                userInfo = decoded;
            }
        );
        Users.findById(userInfo.id)
            .populate('favoritesList')
            .then((user) => {
                res.status(200).json({
                    data: user.favoritesList,
                    success: true,
                });
            })
            .catch((e) => res.status(500).send());
    },
    getInitialStatus: (req, res) => {
        const favDetails = req.body;
        Users.findOne({ _id: favDetails.username })
            .then((user) => {
                user.favoritesList.forEach((f) => {
                    if (f.toString() === favDetails.recipe)
                        // user liked recipe
                        res.json({
                            message: 'ברשימת המועדפים',
                            isFavorite: true,
                        });
                });

                // user not liked recipe
                res.json({
                    message: 'לא ברשימת המועדפים',
                    isFavorite: false,
                });
            })
            .catch((e) => res.status(500).send());
    },

    addToFavorites: (req, res) => {
        const favDetails = req.body;
        Users.findOne({ _id: favDetails.username })
            .then((recipe) => {
                const oldLength = recipe.favoritesList.length;

                if (oldLength === 0) {
                    // favorites array is empty
                    recipe.favoritesList.push(favDetails.recipe);
                    recipe.save();
                    return res.status(200).json({
                        message: 'נוסף בהצלחה',
                        success: true,
                    });
                }

                recipe.favoritesList = recipe.favoritesList.filter((id) => {
                    return id.toString() !== favDetails.recipe;
                });

                const newLength = recipe.favoritesList.length;

                if (oldLength <= newLength) {
                    // like
                    recipe.favoritesList.push(favDetails.recipe);
                    recipe.save();
                    return res.status(200).json({
                        message: 'נוסף בהצלחה לרשימה',
                        success: true,
                    });
                } else {
                    // unlike
                    recipe.save();
                    return res.status(200).json({
                        message: 'נמחק בהצלחה מהרשימה',
                        success: true,
                    });
                }
            })
            .catch((e) =>
                res.status(500).json({
                    message: 'אירעה שגיאה',
                    success: false,
                })
            );
    },
};
