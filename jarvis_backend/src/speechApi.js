import speech from '@google-cloud/speech';
import fs from 'fs';
import { recordingsDirectory, recordingsFormat } from './audio/startRecording';

// TO-DO: Make async?
function getLatestRecording() {
    let latest;
    let files = fs.readdirSync(recordingsDirectory);
    latest = files[0].substring(0, files[0].length - 4);
    files.forEach((file) => {
        let fileTime = file.substring(0, file.length - 4);
        latest = fileTime > latest ? fileTime : latest;
    });
    latest = latest.concat(`.${recordingsFormat}`);
    return latest;
}

async function getTranscription() {
    const client = new speech.SpeechClient();
    const fileName = __dirname + '/../recordings/' + getLatestRecording();

    const file = fs.readFileSync(fileName);
    const audioBytes = file.toString('base64');

    const audio = {
        content: audioBytes
    };
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'en-US',
    };
    const request = {
        audio: audio,
        config: config
    };

    const [response] = await client.recognize(request);
    const transcription = response.results
        .map(result => result.alternatives[0].transcript)
        .join('\n');
    return transcription;
}

export { getTranscription };