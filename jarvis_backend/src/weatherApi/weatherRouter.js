import express from 'express';
import { getCurrentWeather, saveCurrentWeather } from './getWeather';

const router = express.Router();

// router.get('/save', (req, res) => {
//     getCurrentWeather()
//         .then(weatherData => {
//             let socketData = {
//                 "app": "weather",
//                 "data": weatherData
//             }
//             req.io.emit('message', JSON.stringify(socketData));
//             res.send("Data emitted.");
//         });
// });

router.get('/current', (req, res) => {
    let data = require('../currentWeather.json');
    res.header("Content-Type", "application/json");
    res.send(JSON.stringify(data));
});

router.get('/current/save', (req, res) => {
    saveCurrentWeather();
    res.send("Current weather saved");
})

export default router;