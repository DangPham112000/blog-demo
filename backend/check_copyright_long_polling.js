const express = require('express');
const app = express();
const port = 2000;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/validate-music', (req, res) => {
    const { musicName, capacity } = req.body;

    // Simulate processing time with a random delay between 5 to 10 seconds
    const delay = Math.floor(Math.random() * 6) + 5;

    console.log(`Received request to validate music: ${musicName}, capacity: ${capacity}`);
    
    setTimeout(() => {
        res.json({ message: `The music "${musicName}" is valid.` });
    }, delay * 1000);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});


// function validateMusic(musicName, capacity) {
//     fetch('http://localhost:2000/validate-music', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({ musicName, capacity })
//     })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data.message);
//     });
// }
  
// validateMusic('Supernova', '5MB');