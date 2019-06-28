import speech from '@google-cloud/speech';
import fs from 'fs';
import { recordingsDirectory, recordingsFormat } from '../audio/startRecording';

async function getTranscription(fileName) {
    const client = new speech.SpeechClient();

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