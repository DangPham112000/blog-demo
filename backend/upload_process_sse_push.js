const http = require('http');
const port = 2000;

let currentProgress = 0;

const server = http.createServer((req, res) => {
    if (req.method === 'GET' && req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('Hello, World!');
    } else if (req.method === 'POST' && req.url === '/upload') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log('Received music data:', body);

            currentProgress = 0;

            let interval = setInterval(() => {
                currentProgress += Math.floor(Math.random() * 10) + 10; // Random progress between 10% - 20%
                if (currentProgress >= 100) {
                    currentProgress = 100;
                    clearInterval(interval);
                }
            }, 1000);

            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Music data received and processing started');
        });
    } else if (req.method === 'GET' && req.url === '/uploadprogress') {
        // Set headers for SSE
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive'
        });

        let interval = null;
        const sendProgress = () => {
            if (currentProgress < 100) {
                res.write(`data: ${JSON.stringify({ status: 'in-progress', progress: currentProgress })}\n\n`);
            } else {
                res.write(`data: ${JSON.stringify({ status: 'complete', message: 'Music validation complete and valid!' })}\n\n`);
                clearInterval(interval);
                res.end(); 
            }
        };

        interval = setInterval(sendProgress, 1000);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});






// function uploadMusicData() {
//     const musicData = {
//         title: 'My Awesome Track',
//         size: 1234
//     };

//     fetch('http://localhost:2000/upload', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(musicData)
//     })
//     .then(response => response.text())
//     .then(data => {
//         console.log(data);

//         // Create an EventSource connection to the server
//         const eventSource = new EventSource('http://localhost:2000/uploadprogress');

//         eventSource.onmessage = function(event) {
//             const data = JSON.parse(event.data);
//             if (data.status === 'in-progress') {
//                 console.log(`Validation progress: ${data.progress}%`);
//             } else if (data.status === 'complete') {
//                 console.log(data.message);
//                 eventSource.close();
//             }
//         };

//         eventSource.onopen = function() {
//             console.log('Connected to the server for progress updates');
//         };
//     });
// }

// uploadMusicData();
