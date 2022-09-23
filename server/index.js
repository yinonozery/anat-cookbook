const express = require('express'),
    cors = require('cors'),
    routers = require('./routes/routes.js'),
    path = require('path');
require('./db/mongoose');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: '*',
    })
);

// Folders
app.use('/', routers);

const PORT = process.env.PORT || 4000;
const server = app.listen(PORT, () => {
    console.log('listening on port %s...', server.address().port);
});
