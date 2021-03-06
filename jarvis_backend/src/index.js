import cors from 'cors';
import express from 'express';
import weatherRouter from './weatherApi/weatherRouter';
import calendarRouter from './calendarApi/calendarRouter';
import { initializeWeatherCron } from './weatherApi/getWeather';
import { initializeSocket } from './socket';
import { startRecording } from './audio/startRecording';
import { actionSwitch } from './mirrorActions';
import { getTranscription } from './speechApi/speechApi';
const app = express();

// Express middleware configuration
app.use(cors());

// Weather
app.use('/weather', weatherRouter);
initializeWeatherCron();

// Calendar
app.use('/calendar', calendarRouter);

// Socket initialization
const SOCKET_PORT = 8000;
initializeSocket(SOCKET_PORT, app);

// Speech recognition
app.get('/transcribe', async (req, res) => {
    startRecording()
        .then(fileName => {
            getTranscription(fileName)
                .then(transcription => {
                    let action = actionSwitch(transcription);
                    let appInfo = {
                        appName: action,
                        data: null
                    }
                    req.io.emit('message', JSON.stringify(appInfo));
                    res.send(action);
                })
                .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
});

// Express server listening
const APP_PORT = 5000;
app.listen(APP_PORT, () => console.log(`Express server listening on port ${APP_PORT}`));