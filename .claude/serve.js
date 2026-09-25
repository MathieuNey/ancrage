// Local preview of ancrage.html (used to test changes before publishing the artifact)
require('http').createServer((q, s) => {
  require('fs').readFile(__dirname + '/../ancrage.html', (e, d) => { s.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); s.end(d); });
}).listen(8766);
