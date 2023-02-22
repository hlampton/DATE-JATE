import { precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, StaleWhileRevalidate } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';

precacheAndRoute(self.__WB_MANIFEST);

// Cache pages with a CacheFirst strategy
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

// Warm the page cache for the URLs that the user is likely to visit
const pageCacheUrls = ['/index.html', '/'];
registerRoute(pageCacheUrls, ({ url }) => {
  return pageCache.handle({ request: new Request(url) });
});

// Cache assets with a StaleWhileRevalidate strategy
const assetCache = new StaleWhileRevalidate({
  cacheName: 'asset-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
  ],
});

// Cache assets by their destination (style, script, worker)
const assetCacheDestinations = ['style', 'script', 'worker'];
registerRoute(({ request }) => {
  return assetCacheDestinations.includes(request.destination);
}, ({ request }) => {
  return assetCache.handle({ request });
});
