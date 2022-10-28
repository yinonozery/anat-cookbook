const bodyParser = require('body-parser'),
    express = require('express'),
    cors = require('cors'),
    jwt = require('jsonwebtoken'),
    cookieParser = require('cookie-parser'),
    app = express(),
    dotenv = require('dotenv').config(),
    routers = require('./routes/routes');

// Mongoose connection
require('./db/mongoose');

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json(), bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);

app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/', routers);

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
    console.log(`Listening to port ${server.address().port}...`);
});
