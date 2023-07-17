const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose);

const id_validator = require('mongoose-id-validator');

var recipesSchema = new mongoose.Schema(
    {
        rid: { type: Number },
        title: { type: String, required: false, trim: true },
        summary: { type: String, required: false },
        picture_url: { type: String, required: false },
        duration: { type: Number, required: false },
        serving: { type: Number, required: false },
        calories: { type: Number, required: false },
        category: [{ type: mongoose.Schema.ObjectId, ref: 'categories' }],
        difficulty: { type: String, required: false },
        ingredients: [
            {
                name: { type: String },
                qty: { type: Number },
                unit: { type: String },
            },
        ],
        instructions: [{ type: String, required: false }],
        author: { type: mongoose.Schema.ObjectId, ref: 'users' },
        views: { type: Number },
        createdOn: { type: Date, default: Date.now() },
    },
    { versionKey: false }
);

recipesSchema.plugin(autoIncrement, { id: 'order_seq', inc_field: 'rid' });
recipesSchema.plugin(id_validator);

const Recipe = mongoose.model('recipes', recipesSchema);

module.exports = Recipe;
