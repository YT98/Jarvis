import startRecording from './audio/startRecording';
const fs = require('fs');
const path = require('path');
import express from 'express';
const app = express();
import cors from 'cors';

import ws from './ws';
const socket = ws.setConnection();

app.use(cors());
app.get("/record", (req, res) => {
    socket.send(JSON.stringify("It works?"));
});

app.use(express.static('./dist/client/'));
app.get("*", (req, res) => {
    res.sendFile(path.resolve('dist/client/index.html'));
});
app.listen(5000, console.log("App listening on port 5000"));