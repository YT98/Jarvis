import { testTranscription } from '../mirrorActions';
import { getWeatherFromFile } from './getWeather';
import fs from 'fs';

function weatherData() {
    let weatherData;
    fs.readFile(__dirname + '/../currentWeather.json', (e, data) => {
        if (e) console.log(e);
        weatherData = data;
    });
    return weatherData;
}

function weatherSwitch(transcription) {
    let weatherData = getWeatherFromFile();
    switch(true) {
        case(testTranscription(/today/, transcription)):
            return {
                appName: "weather",
                appData: {
                    type: "daily",
                    dataPoints: weatherData.daily
                }
            };
            break;
        case(testTranscription(/next week/, transcription)):
            return "weather next week";
            break;
        case(testTranscription(/tomorrow/, transcription)):
            return "weather tomorrow";
            break;
        default:
            return "weather today";
    }
}

export default weatherSwitch;