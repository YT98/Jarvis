import express from 'express';
import fs from 'fs';
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
    fs.readFile(__dirname + '/../currentWeather.json', (e, data) => {
        if (e) console.log(e);
        res.header("Content-Type", "application/json");
        res.send(data);
    });
});

router.get('/current/save', (req, res) => {
    saveCurrentWeather();
    res.send("Current weather saved");
})

export default router;