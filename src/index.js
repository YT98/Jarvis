import startRecording from './startRecording';
const fs = require('fs');
const path = require('path');

// Create path to write recordings to
const recordingsDirectory = "recordings";
if (!fs.existsSync(recordingsDirectory)) {
    fs.mkdirSync(recordingsDirectory);
}
// Create file path with random name
const fileName = path.join(recordingsDirectory, Math.random().toString(36).replace(/[^a-z]+/g, ``).substr(0, 4).concat(`.wav`));
console.log("Writing new recording file at", fileName, "\n");
// Start recording and pipe to fileName
startRecording(fileName);

// Keep process alive
process.stdin.resume();
console.warn("Press ctrl+c to exit.");