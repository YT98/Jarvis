import fetch from 'node-fetch';
import fs from 'fs';
import config from '../config';

const city = "Montreal";
const countryCode = "CA";
const weatherFilePath = "./src/currentWeather.json"

// Takes in weather api data and only returns relevant data
function getRelevant(data) {
    function convertToCelsius(temp) {
        return Math.round(temp - 273.15);
    }
    return {
        currentTemp: convertToCelsius(data.main.temp),
        minTemp: convertToCelsius(data.main.temp_min),
        maxTemp: convertToCelsius(data.main.temp_max),
        weather: data.weather[0].main,
        weatherDescription: data.weather[0].description
    }
}

// Gets weather from open source map api
function getCurrentWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${config.weatherApiKey}`)
    .then(res => res.json())
    .catch(e => console.log(e));
}

// Saves weather api data to locally stored json file
function saveCurrentWeather() {
    getCurrentWeather()
    .then(data => {
        let weatherJson = JSON.stringify(getRelevant(data));
        fs.writeFile(weatherFilePath, weatherJson, (e) => {
            if (e) console.log(e);
            console.log(`Successfully saved weather to file ${weatherFilePath}`)
        });
    })
    .catch(e => console.log(e));
}

export { 
    getCurrentWeather,
    saveCurrentWeather
}

