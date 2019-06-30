import express from 'express';
import { getWeatherFromFile, saveCurrentWeather } from './getWeather';

const router = express.Router();

router.get('/current', (req, res) => {
    res.header('content-type', 'application/json');
    res.send(getWeatherFromFile());
});

router.get('/current/save', (req, res) => {
    saveCurrentWeather();
    res.send("Current weather saved");
})

export default router;