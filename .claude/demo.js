// Demo preview of ancrage.html: the page believes today is Friday (this week's, or the last one on a weekend) and shows the sample data
// Own port = own origin, so the demo's saved data never mixes with the real local preview (serve.js, port 8766)
// No service worker here: a cached copy would skip the injected clock
const fs = require('fs'), path = require('path'), root = path.join(__dirname, '..');
const TYPES = { '.html':'text/html; charset=utf-8', '.webmanifest':'application/manifest+json', '.png':'image/png', '.svg':'image/svg+xml' };

/* Runs before the app: shifts the clock by whole days to Friday (time of day stays real),
   and starts again from the sample data whenever that Friday changes (or with ?reset) */
const CLOCK = `<script>(() => {
  const Real = Date, now = new Real(), wd = now.getDay();
  const back = wd === 6 ? 1 : wd === 0 ? 2 : wd - 5; // Saturday → yesterday, Sunday → 2 days ago, weekdays → this week's Friday
  const shift = -back * 864e5;
  class FakeDate extends Real {
    constructor(...a) { a.length ? super(...a) : super(Real.now() + shift); }
    static now() { return Real.now() + shift; }
  }
  window.Date = FakeDate;
  const friday = new FakeDate().toDateString();
  try {
    if (location.search.includes('reset') || localStorage.getItem('demo.friday') !== friday) {
      localStorage.removeItem('semainier.v1'); localStorage.removeItem('semainier.v1.ui');
      localStorage.setItem('demo.friday', friday);
    }
  } catch {}
})();</script>`;

require('http').createServer((q, s) => {
  const rel = decodeURIComponent(q.url.split('?')[0]).replace(/^\/+/, '') || 'ancrage.html';
  const file = path.join(root, rel);
  if (!file.startsWith(root + path.sep) || !TYPES[path.extname(file)]) { s.writeHead(404); s.end(); return; }
  fs.readFile(file, (e, d) => {
    if (e) { s.writeHead(404); s.end(); return; }
    if (path.extname(file) === '.html') d = d.toString().replace('<head>', '<head>' + CLOCK);
    s.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] }); s.end(d);
  });
}).listen(8767);
