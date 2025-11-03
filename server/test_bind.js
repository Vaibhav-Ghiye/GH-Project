const http = require('http');
const PORT = 5000;
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('bind-ok');
});
server.listen(PORT, '0.0.0.0', () => {
  console.log(`test_bind listening on http://localhost:${PORT} (pid=${process.pid})`);
});

setInterval(() => {}, 10000);
