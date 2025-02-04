const http = require('http');

const server = http.createServer((req, res) => {
    console.log(`Received request: ${req.method} ${req.url}`);

    if (req.url === '/hello') {
        if (req.method === 'POST') {
            let body = '';

            req.on('data', chunk => {
                body += chunk.toString(); // Convert buffer to string
            });

            req.on('end', () => {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                if (body.trim() === "ping") {
                    res.end('pong');
                } else {
                    res.end('');
                }
            });

        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('world');
        }
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(2000, () => {
    console.log('Server is listening on port 2000');
});

