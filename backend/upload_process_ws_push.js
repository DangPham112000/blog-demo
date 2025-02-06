const http = require('http');
const WebSocket = require('ws');
const port = 2000;

// Create an HTTP server
const server = http.createServer((req, res) => {
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

// Create a WebSocket server on top of the HTTP server
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
    console.log('Client connected the WebSocket connection');

    ws.on('message', message => {
        console.log(`Received: ${message}`);
        
        // Simulating music validation process
        let progress = 0;

        const interval = setInterval(() => {
            progress += Math.floor(Math.random() * 10) + 10; // Random progress between 10% - 20%
            if (progress >= 100) {
                progress = 100;
                ws.send(JSON.stringify({ status: 'complete', message: 'Music validation complete and valid!' }));
                clearInterval(interval);
            } else {
                ws.send(JSON.stringify({ status: 'in-progress', progress: progress }));
            }
        }, 1000);
    });

    ws.on('close', () => {
        console.log('Client disconnected the WebSocket connection');
    });
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
    console.log(`WebSocket server running on ws://localhost:${port}`);
});


// const socket = new WebSocket('ws://localhost:2000');

// socket.onmessage = function(event) {
//     const data = JSON.parse(event.data);
//     if (data.status === 'in-progress') {
//         console.log(`Validation progress: ${data.progress}%`);
//     } else if (data.status === 'complete') {
//         console.log(data.message);
//         socket.close();
//     }
// };

// socket.onopen = function() {
//     console.log('Connected to the server');
//     // Simulating a music upload with a title and arbitrary size
//     const musicData = {
//         title: 'My Awesome Track',
//         size: 1234
//     };
//     socket.send(JSON.stringify(musicData));
// };

// socket.onclose = function() {
//     console.log('Disconnected the WebSocket connection from the server');
// };