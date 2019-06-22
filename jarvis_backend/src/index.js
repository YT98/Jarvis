const express = require('express');
const PORT = process.env.PORT || 5000;
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const cors = require('cors');
const SOCKET_PORT = 8000;
const APP_PORT = 5000;

// Socket configuration
io.on('connection', (client) => {
    client.on('message', (message) => console.log(message));
});

// Express middleware configuration
app.use((req, res, next) => {
    req.io = io;
    next();
});
app.use(cors());

// App specific routes for development purposes
// To be later replaced by speech recognition fx
const weatherAppJson = {
    "app": "weather",
    "options": {
        "scale": "day",
        "date": "01/01/2019",
        "startDate": "null",
        "endDate": "null"
    }
}
const calendarAppJson = {
    "app": "calendar",
    "options": {
        "scale": "day",
        "date": "01/01/2019",
        "startDate": "null",
        "endDate": "null"
    }
}
app.get('/weather', (req, res) => {
    req.io.emit('message', JSON.stringify(weatherAppJson));
});
app.get('/calendar', (req, res) => {
    req.io.emit('message', JSON.stringify(calendarAppJson));
});


// Socket server listening
io.listen(SOCKET_PORT);
console.log(`Socket server listening on port ${SOCKET_PORT}`);
// Express server listening
app.listen(APP_PORT, () => console.log(`Express server listening on port ${APP_PORT}`));