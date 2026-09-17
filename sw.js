const CACHE='grupos-app-v3';
const ASSETS=['./','./index.html','./manifest.json'];
self.addEventListener('install',event=>{event.waitUntil((async()=>{const cache=await caches.open(CACHE);for(const asset of ASSETS){try{const response=await fetch(asset,{cache:'no-store'});if(response.ok)await cache.put(asset,response);}catch(e){}}await self.skipWaiting();})())});
self.addEventListener('activate',event=>{event.waitUntil((async()=>{const keys=await caches.keys();await Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)));await self.clients.claim();})())});
self.addEventListener('fetch',event=>{if(event.request.method!=='GET')return;if(event.request.url.includes('/index.html')||event.request.url.endsWith('/administrador-grupos/')){event.respondWith(fetch(event.request,{cache:'no-store'}).catch(()=>caches.match(event.request)));return}event.respondWith(caches.match(event.request).then(c=>c||fetch(event.request)))})
