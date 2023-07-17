const mongoose = require('mongoose');

var ingredientsSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        picture_url: { type: String, required: false, trim: true },
        calories: { type: Number, required: true },
    },
    { versionKey: false }
);

const Ingredient = mongoose.model('ingredients', ingredientsSchema);

module.exports = Ingredient;
