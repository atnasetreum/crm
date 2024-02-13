function registerServiceWorker() {
  if (typeof window !== "undefined") {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").then((registration) => {
        Notification.requestPermission(function (status) {
          console.log("Notification permission status:", status);
          console.log("Service Worker registration successful:", registration);

          fetch("/api/vapid-keys", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then(function (response) {
              return response.text();
            })
            .then(function (text) {
              const { publicKey } = JSON.parse(text);

              registration.pushManager
                .subscribe({
                  userVisibleOnly: true,
                  applicationServerKey: publicKey,
                })
                .then(function (subscription) {
                  console.log("User is subscribed:", subscription);
                  fetch("/api/vapid-keys", {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(subscription),
                  });
                });
            });
        });
      });
    } else {
      console.error("Service Worker registration failed.");
    }
  }
}

registerServiceWorker();
