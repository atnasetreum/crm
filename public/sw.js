// const CACHE_NAME = "my-cache";

self.addEventListener("install", (event) => {
  console.log("Installing service worker!");

  self.skipWaiting();
  /*event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(["/"]);
    })
  );*/
});

self.addEventListener("activate", () => {
  console.log("Service worker activated");
  /*event.waitUntil(
        caches.keys().then((cacheNames) => {
        return Promise.all(
            cacheNames.map((cacheName) => {
            if (CACHE_NAME !== cacheName && cacheName.startsWith("my-")) {
                return caches.delete(cacheName);
            }
            })
        );
        })
    );*/
});

self.addEventListener("fetch", (event) => {
  // console.log("fetching service worker!!");
  /*event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );*/
});

self.addEventListener("push", (event) => {
  console.log("Push notification received", event);

  let data = { title: "New!", content: "Something new happened!" };

  if (event.data) {
    //data = JSON.parse(event.data.text());
  }

  const options = {
    //body: data.content,
    body: "data.content",
  };

  event.waitUntil(self.registration.showNotification(data.title, options));
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked");
  event.notification.close();
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed");
});

self.addEventListener("sync", (event) => {
  console.log("Syncing...");
  console.log(event);
  console.log(event.tag);
});
