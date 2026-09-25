// Local preview of ancrage.html (used to test changes before publishing the artifact)
// Serves the project folder: the page, its manifest and icons (needed to install it as a Chrome app on localhost)
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
const TYPES = { '.html':'text/html; charset=utf-8', '.webmanifest':'application/manifest+json', '.png':'image/png', '.svg':'image/svg+xml' };
require('http').createServer((q, s) => {
  const rel = decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'ancrage.html';
  const file = path.join(root, rel);
  if (!file.startsWith(root + path.sep) || !TYPES[path.extname(file)]) { s.writeHead(404); s.end(); return; }
  fs.readFile(file, (e, d) => {
    if (e) { s.writeHead(404); s.end(); return; }
    s.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] }); s.end(d);
  });
}).listen(8766);
