const Recipe = require('../models/recipes');
const Category = require('../models/categories');

module.exports = {
    // READ
    getRecipe: (req, res) => {
        Recipe.findOneAndUpdate({ rid: req.params.id }, { $inc: { views: 1 } })
            .populate('category')
            .then((recipe) => {
                res.send(recipe);
            })
            .catch((e) => res.status(500).send());
    },
    getRecipes: (req, res) => {
        Recipe.find()
            .populate('category')
            .then((recipes) => res.send(recipes))
            .catch((e) => res.status(500).send());
    },

    // CREATE
    createRecipe: async (req, res) => {
        const recipe = new Recipe(req.body);
        recipe
            .save()
            .then((rec) => {
                Category.findByIdAndUpdate(
                    rec.category,
                    { $push: { list: rec._id } },
                    { new: true },
                    (err, post) => {
                        if (err) console.log(err);
                        else console.log(post);
                    }
                );

                res.status(201).send(
                    'Recipe "' + rec.title + '" saved successfully!'
                );
            })
            .catch((e) => {
                res.status(400).send('Error: ' + e);
            });
    },
};
