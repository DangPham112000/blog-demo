const express = require('express');
const app = express();
const port = 2000;

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.get('/bitcoin', (req, res) => {
    const randomValue = Math.floor(Math.random() * 111) - 10; // Random value between -10 and +100
    res.json({ coins: randomValue });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});