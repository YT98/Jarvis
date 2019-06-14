const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');

// Audio Recorder object initialization
const options = {
    program: `rec`,
    device: null,

    bits: 16,
    channels: 1,
    encoding: `signed-integer`,
    format: `S16_LE`,
    rate: 16000,
    type: `wav`,

    silence: 2,
    tresholdStart: 0.5,
    tresholdStop: 0.5,
    keepSilence: true
};
const logger = console;
let audioRecorder = new AudioRecorder(options, logger);

function startRecording(fileName) {
    // Create write stream
    const fileStream = fs.createWriteStream(fileName, { encoding: "binary" });
    // Start and write to file
    audioRecorder.start().stream().pipe(fileStream);

    // Log information on the following events
    audioRecorder.stream().on(`close`, function (code) {
        console.warn(`Recording closed. Exit code: `, code);
    });
    audioRecorder.stream().on(`end`, function () {
        console.warn(`Recording ended.`);
    });
    audioRecorder.stream().on(`error`, function () {
        console.warn(`Recording error.`);
    });
}

export default startRecording;