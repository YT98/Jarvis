import express from 'express';
import cron from 'node-cron';
import { getCurrentWeather, saveCurrentWeather } from './getWeather';

const router = express.Router();

router.get('/current', (req, res) => {
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

// Get current weather with cron job
cron.schedule('0 * * * *', () => {
    saveCurrentWeather();
    console.log("Saving current weather - runs every hour.");
});

router.get('/currentweather', (req, res) => {
    let data = require('./currentWeather.json');
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data));
});

export default router;