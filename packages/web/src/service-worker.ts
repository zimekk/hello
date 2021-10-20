/// <reference lib="webworker" />

// https://stackoverflow.com/questions/63116331/how-to-migrate-service-worker-from-js-to-ts
/* eslint-disable no-redeclare */
declare var self: ServiceWorkerGlobalScope;

export {};

// Register event listener for the 'push' event.
self.addEventListener("push", function (event) {
  // Keep the service worker alive until the notification is created.
  event.waitUntil(
    // Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
    self.registration.showNotification("ServiceWorker Cookbook", {
      body: "Alea iacta est",
    })
  );
});
