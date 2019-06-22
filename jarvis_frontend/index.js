let express = require('express');
const app = express();

app.use(express.static('./dist'));
app.get('', (req, res) => {
    res.send('dist/index.html');
});

const PORT = 3000;

app.listen(PORT, console.log(`Jarvis_frontend listening on port ${PORT}`));