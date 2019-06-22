import fetch from 'node-fetch';
import fs from 'fs';
import config from './config';

const city = "Montreal";
const countryCode = "CA";
const weatherFilePath = "./src/currentWeather.json"

// Gets weather from open source map api
function getCurrentWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${config.weatherApiKey}`)
    .then(res => res.json())
    .catch(e => console.log(e));
}

function saveCurrentWeather() {
    getCurrentWeather()
    .then(data => {
        let weatherJson = JSON.stringify(data);
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

