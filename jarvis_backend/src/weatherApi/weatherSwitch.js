import { testTranscription } from '../mirrorActions';

function weatherSwitch(transcription) {
    switch(true) {
        case(testTranscription(/today/, transcription)):
            return "weather today";
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