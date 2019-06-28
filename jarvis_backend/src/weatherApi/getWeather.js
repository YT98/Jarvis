import fetch from 'node-fetch';
import fs from 'fs';
import config from '../config';
import cron from 'node-cron';

const lat = "45.485350";
const long = "-73.598900"
const weatherFilePath = "./src/currentWeather.json"

// Takes in weather api data and only returns relevant data
function sanitizeData(data) {
    return {
        currentTemp: Math.round(data.currently.temperature),
        weather: data.currently.icon,
        description: data.currently.summary
    }
}

// Gets weather from open source map api
function getCurrentWeather() {
    return fetch(`https://api.darksky.net/forecast/${config.weatherApiKey}/${lat},${long}?units=si&exclude=minutely,alerts,flags`)
        .then(res => res.json())
        .catch(e => console.log(e));
}

// Saves weather api data to locally stored json file
function saveCurrentWeather() {
    getCurrentWeather()
    .then(data => {
        let weatherJson = JSON.stringify(sanitizeData(data));
        fs.writeFile(weatherFilePath, weatherJson, (e) => {
            if (e) console.log(e);
            console.log(`Successfully saved weather to file ${weatherFilePath}`)
        });
    })
    .catch(e => console.log(e));
}


function initializeWeatherCron() {
    // Get current weather with cron job
    cron.schedule('0 * * * *', () => {
        saveCurrentWeather();
        console.log("Saving current weather - runs every hour.");
    });
}

export { 
    getCurrentWeather,
    saveCurrentWeather,
    initializeWeatherCron
}

