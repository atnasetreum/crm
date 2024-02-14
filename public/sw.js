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

  const icon =
    "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/notification-circle-blue-512.png";

  const image =
    "https://f.hubspotusercontent00.net/hubfs/5283157/30.%20%5BArticulo%5D%20CRM%20m%C3%B3vil%20%C2%BFcu%C3%A1les%20son%20sus%20ventajas/CRM%20Movil.jpg";

  const iconCall =
    "https://assets.stickpng.com/images/5a452570546ddca7e1fcbc7d.png";

  if (event.data) {
    const {
      title,
      event: eventData,
      ...payload
    } = JSON.parse(event.data.text());

    const optionsDefault = {
      icon,
      image,
      badge: icon,
      dir: "auto",
      vibrate: [100, 50, 100],
      data: eventData,
      actions: [
        {
          action: "call-action",
          title: "Llamar",
          icon: iconCall,
        },
      ],
    };

    const options = {
      ...optionsDefault,
      ...payload,
    };

    console.log(options);

    event.waitUntil(self.registration.showNotification(title, options));
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked");

  const notification = event.notification;
  const action = event.action;

  if (action === "call-action") {
    console.log("Calling...");
    // window.open("tel:+1800229933");
  }

  console.log({ notification, action });

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
