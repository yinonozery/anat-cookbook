const bodyParser = require('body-parser'),
    express = require('express'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    app = express(),
    dotenv = require('dotenv').config(),
    routers = require('./routes/routes'),
    path = require('path');

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

// app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/', routers);

// app.get('*', (_, res) => {
//     res.sendFile(path.join(__dirname, '/client/build', 'index.html'));
// });

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
    console.log(`Listening to port ${server.address().port}...`);
});
