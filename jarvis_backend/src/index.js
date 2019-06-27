import express from 'express';
const app = express();
import cors from 'cors';
import cron from 'node-cron';
import { initializeSocket } from './socket';
import { getCurrentWeather, saveCurrentWeather } from './getWeather';
import { getHeadlines } from './getNews';
const SOCKET_PORT = 8000;
const APP_PORT = 5000;

// Express middleware configuration
app.use(cors());

// Socket initialization
initializeSocket(SOCKET_PORT, app);

// Get current weather with cron job
cron.schedule('0 * * * *', () => {
    saveCurrentWeather();
    console.log("Saving current weather - runs every hour.");
});

// App specific routes for development purposes
// To be later replaced by speech recognition fx
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
    getCurrentWeather()
    .then(weatherData => {
        let socketData = {
            "app": "weather",
            "data": weatherData
        }
        req.io.emit('message', JSON.stringify(socketData));
        res.send("Data emitted.");
    });
});

app.get('/currentweather', (req, res) => {
    let data = require('./currentWeather.json');
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data));
});

app.get('/news', (req, res) => {
    getHeadlines();
});

import { startRecording } from './audio/startRecording';
app.get('/record', (req, res) => {
    startRecording();
    res.send("Recording started");
});

import { actionSwitch } from './mirrorActions';
import { getTranscription } from './speechApi';
app.get('/transcribe', async (req, res) => {
    startRecording()
    .then(fileName => {
        getTranscription(fileName)
        .then(transcription => {
            let action = actionSwitch(transcription);
            res.send(action);
        })
        .catch(e => console.log(e));
    })
    .catch(e => console.log(e));
});


// Socket server listening
// Express server listening
app.listen(APP_PORT, () => console.log(`Express server listening on port ${APP_PORT}`));