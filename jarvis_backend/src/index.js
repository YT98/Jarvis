import startRecording from './audio/startRecording';
const fs = require('fs');
const path = require('path');
import express from 'express';
const app = express();

app.get('test', (req, res) => {
    res.status(200).set({
        "connection": "keep-alive",
        "cache-control": "no-cache",
        "content-type": "text/event-stream"
    });
    const data = {
        message: "Hello, World!"
    }
    setInterval(() => {
        data.timestamp = Date.now();
        res.write(JSON.stringify(data));
    }, 5000);
})

app.listen(5000, console.log("App listening on port 5000"));