const mongoose = require('mongoose');

mongoose.connect(
    'mongodb+srv://anat_cookbook:c3RjRDwsCydcC5V3@anatcookbook.bgwqhqd.mongodb.net/?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);

// mongoose.connect(process.env.MONGODB_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
