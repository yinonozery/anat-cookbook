const mongoose = require('mongoose');

var categoriesSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, trim: true },
        picture_url: { type: String, required: false, trim: true },
        list: [{ type: mongoose.Schema.Types.ObjectId, ref: 'recipes' }],
    },
    { versionKey: false }
);

const Category = mongoose.model('categories', categoriesSchema);

module.exports = Category;
