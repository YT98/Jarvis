// Audio imports
import startRecording from './audio/startRecording';
const fs = require('fs');
const path = require('path');
// Express imports
import express from 'express';
const app = express();
import cors from 'cors';

app.use(cors());
app.get("/record", (req, res) => {
    startRecording();
});

app.use(express.static('./dist/client/'));
app.get("*", (req, res) => {
    res.sendFile(path.resolve('dist/client/index.html'));
});
app.listen(5000, console.log("App listening on port 5000"));