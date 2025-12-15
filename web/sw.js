var cacheName = 'global-chat-pwa';
var filesToCache = [
  '/',
  '/index.html',
  '/script.js',
  '/pico.min.css',
  "/socket.io.min.js"
];

self.addEventListener('install', ev => {
	ev.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  )
  self.skipWaiting()
})


self.addEventListener('fetch', (ev) => 
	ev.respondWith(
    	caches.match(ev.request).then(
    		res => res || fetch(ev.request)
    	)
  	)
);