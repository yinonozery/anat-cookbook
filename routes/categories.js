const Category = require('../models/categories');

module.exports = {
    // READ
    getCategories: (req, res) => {
        Category.find()
            .then((categories) => res.send(categories))
            .catch((e) => res.status(500).send());
    },
    getCategory: (req, res) => {
        Category.findOne({ name: req.params.name })
            .populate('list')
            .then((recipe) => {
                res.status(200).send(recipe.list);
            })
            .catch((e) => res.status(500).send());
    },
};
