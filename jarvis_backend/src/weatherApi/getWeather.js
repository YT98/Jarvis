import fetch from 'node-fetch';
import fs from 'fs';
import config from '../config';
import cron from 'node-cron';

const lat = "45.485350";
const long = "-73.598900"
const weatherFilePath = "./src/currentWeather.json"

// Takes in UNIX timestamp and returns formatted time
function formatTime(time) {
    let date = new Date(time*1000);
    return {
        hour: date.getHours(),
        day: date.getDate()
    }
}

// Takes in weather api data and only returns relevant data
function sanitizeData(data) {

    function relevantData(data) {
        if (data.temperature) {
            return {
                temp: Math.round(data.temperature),
                weather: data.icon,
                description: data.summary,
                hour: formatTime(data.time).hour
            }
        }
        if (data.temperatureMin) {
            return {
                minTemp: Math.round(data.temperatureLow),
                maxTemp: Math.round(data.temperatureHigh),
                weather: data.icon,
                description: data.summary,
                day: formatTime(data.time).day
            }
        }
    }

    let daily = [];
    data.daily.data.forEach(day => {
        daily.push(relevantData(day));
    });

    let hourly = [];
    data.hourly.data.forEach(hour => {
        hourly.push(relevantData(hour));
    });

    return {
        currentTemp: Math.round(data.currently.temperature),
        currentWeather: data.currently.icon,
        currentDescription: data.daily.data[0].summary,
        daily: daily,
        hourly: hourly
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

// Initialization function for cron job that
// fetches weather information every hour
function initializeWeatherCron() {
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

