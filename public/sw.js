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
  console.log("Push notification received");

  const icon =
    "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/notification-circle-blue-512.png";

  const iconCall = "/imgs/icon-call.png";

  const iconAppointment = "/imgs/icon-appointment.png";

  if (event.data) {
    const payload = JSON.parse(event.data.text() || {});

    if (Object.keys(payload)) {
      const { date, projectName, name, type, comment } = payload;

      const imageCall = "/imgs/banner-call.jpg";
      const imageAppointment = "/imgs/banner-appointment.png";

      const actions = [];

      if (type === "Llamada") {
        actions.push({
          action: "call-action",
          title: "Llamar",
          icon: iconCall,
        });
      }

      if (type === "Cita") {
        actions.push({
          action: "appointment-action",
          title: "Cita",
          icon: iconAppointment,
        });
      }

      const optionsDefault = {
        icon,
        image: type === "Llamada" ? imageCall : imageAppointment,
        badge: icon,
        dir: "auto",
        vibrate: [100, 50, 100],
        data: payload,
        actions,
      };

      const options = {
        ...optionsDefault,
        body:
          projectName +
          "\n" +
          date +
          "\n" +
          (comment ? `Nota: ${comment}` : ""),
      };

      event.waitUntil(
        self.registration.showNotification(`${type} - ${name}`, options)
      );
    }
  }
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked");

  const notification = event.notification;
  const action = event.action;
  const payload = notification.data;

  if (action === "") {
    return notification.close();
  }

  const { clientId } = payload;

  const response = clients.matchAll({ type: "window" }).then((clientsArr) => {
    const params =
      action === "call-action" ? `call=${clientId}` : `id=${clientId}&edit=1`;

    const isLocalhost = self.location.hostname === "localhost";

    const domain = isLocalhost
      ? "http://localhost:3000"
      : "https://mariogutierrezcrm.com";

    const url = `${domain}/crm/clients?${params}`;

    const client = clientsArr.find((c) => c.visibilityState === "visible");

    if (client !== undefined) {
      client.navigate(url);
      client.focus();
    } else {
      clients
        .openWindow(url)
        .then((windowClient) => (windowClient ? windowClient.focus() : null));
    }

    return notification.close();
  });

  event.waitUntil(response);
});

self.addEventListener("notificationclose", (event) => {
  console.log("Notification closed");
});

self.addEventListener("sync", (event) => {
  console.log("Syncing...");
  console.log(event);
  console.log(event.tag);
});
