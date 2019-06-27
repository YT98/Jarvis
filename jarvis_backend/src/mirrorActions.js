import weatherSwitch from './weatherApi/weatherSwitch';

function testTranscription(word, transcription) {
    let regex = RegExp(word);
    return regex.test(transcription);
}

function actionSwitch(transcription) {
    switch(true) {
        case (testTranscription(/weather/, transcription)):
            return weatherSwitch(transcription);
            break;
        case (testTranscription(/calendar/, transcription)):
            return "calendar";
            break;
        default:
            return "no match found";
    }
}

export { actionSwitch, testTranscription };