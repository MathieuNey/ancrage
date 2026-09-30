// Demo preview of index.html: tells the page it is the demo, so a first visit loads the example tasks (around the real today)
// Own port = own origin, so the demo's saved data never mixes with the real local preview (serve.js, port 8766)
// No service worker here: a cached copy would skip the injected flag
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
const TYPES = { '.html':'text/html; charset=utf-8', '.webmanifest':'application/manifest+json', '.png':'image/png', '.svg':'image/svg+xml' };

/* Runs before the app: sets the demo flag, and starts again from the examples every new day (or with ?reset) */
const DEMO = `<script>(() => {
  window.DEMO = true;
  const day = new Date().toDateString();
  try {
    if (location.search.includes('reset') || localStorage.getItem('demo.day') !== day) {
      localStorage.removeItem('semainier.v1'); localStorage.removeItem('semainier.v1.ui');
      localStorage.setItem('demo.day', day);
    }
  } catch {}
})();</script>`;

require('http').createServer((q, s) => {
  const rel = decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(root, rel);
  if (!file.startsWith(root + path.sep) || !TYPES[path.extname(file)]) { s.writeHead(404); s.end(); return; }
  fs.readFile(file, (e, d) => {
    if (e) { s.writeHead(404); s.end(); return; }
    if (path.extname(file) === '.html') d = d.toString().replace('<head>', '<head>' + DEMO);
    s.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] }); s.end(d);
  });
}).listen(8767);
