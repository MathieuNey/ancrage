// Service worker: lets the installed app open without network.
// The page itself: network first (a deploy shows up on the next launch), cached copy when offline.
// Manifest, icons, Google Fonts: served from the cache at once and refreshed behind the scenes.
// Bump VERSION only to drop old caches; the page updates without it.
const VERSION = 'ancrage-v1';
const SHELL = ['./ancrage.html', './manifest.webmanifest', './icons/icon.svg', './icons/icon-192.png',
  './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const fonts = url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com';
  if (url.origin !== location.origin && !fonts) return;

  if (req.mode === 'navigate') {
    e.respondWith(fetch(req)
      .then(res => { if (res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put('./ancrage.html', copy)); } return res; })
      .catch(() => caches.match('./ancrage.html')));
    return;
  }

  e.respondWith(caches.open(VERSION).then(async c => {
    const hit = await c.match(req);
    const fresh = fetch(req).then(res => { if (res.ok || res.type === 'opaque') c.put(req, res.clone()); return res; });
    if (hit) { fresh.catch(() => {}); return hit; }
    return fresh;
  }));
});
