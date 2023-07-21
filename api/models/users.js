const mongoose = require('mongoose');

var usersSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, trim: true },
        email: { type: String, required: true, trim: true, unique: true },
        password: { type: String, required: true },
        isAdmin: { type: Boolean, required: true },
        recipesList: [{ type: mongoose.Schema.ObjectId, ref: 'recipes' }],
        favoritesList: [{ type: mongoose.Schema.ObjectId, ref: 'recipes' }],
    },
    { versionKey: false }
);

const User = mongoose.model('users', usersSchema);

module.exports = User;
