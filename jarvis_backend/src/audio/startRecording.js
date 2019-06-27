const AudioRecorder = require('node-audiorecorder');
const fs = require('fs');
const path = require('path');
const recordingsFormat = "raw";
const recordingsDirectory = "recordings";

// Audio Recorder object initialization
const options = {
    program: `rec`,
    device: null,

    bits: 16,
    channels: 1,
    encoding: `signed-integer`,
    format: `S16_LE`,
    rate: 16000,
    type: `${recordingsFormat}`,

    silence: 2,
    tresholdStart: 0.5,
    tresholdStop: 0.5,
    keepSilence: true
};
const logger = console;
let audioRecorder = new AudioRecorder(options, logger);

function startRecording() {
    // Create path to write recordings to
    
    if (!fs.existsSync(recordingsDirectory)) {
        fs.mkdirSync(recordingsDirectory);
    }
    // Create file path with random name
    const d = Date.now();
    const fileName = path.join(recordingsDirectory, d.toString().concat(`.${recordingsFormat}`));
    console.log("Writing new recording file at", fileName);
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

export { startRecording, recordingsFormat, recordingsDirectory };