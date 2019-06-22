import fetch from 'node-fetch';
import config from './config';

const city = "Montreal";
const countryCode = "CA";

function getCurrentWeather() {
    return fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${countryCode}&appid=${config.weatherApiKey}`)
    .then(res => res.json())
    .catch(e => console.log(e));
}

export { getCurrentWeather }

