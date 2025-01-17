const http = require('http');
const fs = require('fs');
const path = require('path');

const certLocation = '/home/dangpham/Auth/ssl_cert';

const options = {
    // key: fs.readFileSync(path.resolve(certLocation, 'localhost.key')), 
    // cert: fs.readFileSync(path.resolve(certLocation, 'localhost.crt')), 
};


// Create a server
const server = http.createServer(options,(req, res) => {
    if (req.url === '/hello' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('world');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
    }
});

server.listen(444, () => {
    console.log('Server is listening on port 443');
});
