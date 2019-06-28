import express from 'express';
import fs from 'fs';

const router = express.Router();

router.get('/daily', (req, res) => {
    fs.readFile(__dirname + '/mockCalendar.json', (e, data) => {
        if (e) console.log(e);
        res.header("Content-Type", "application/json");
        res.send(data);
    });
});

export default router;

