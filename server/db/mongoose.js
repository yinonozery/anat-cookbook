const mongoose = require('mongoose');

mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to mongoDB server...'))
    .catch(() => console.log('Could not connect to mongoDB server'));
