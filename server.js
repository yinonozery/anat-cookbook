const express = require('express'),
    cors = require('cors'),
    routers = require('./server/routes/routes.js'),
    path = require('path');
require('./server/db/mongoose');

const port = process.env.PORT;
const app = express();

app.use(
    cors({
        origin: '*',
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Folders
app.use('/js', express.static(path.join(__dirname, 'src/js')));
app.use('/css', express.static(path.join(__dirname, 'src/css')));
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));
app.use('/', routers);

const server = app.listen(port, () => {
    console.log('listening on port %s...', server.address().port);
});
