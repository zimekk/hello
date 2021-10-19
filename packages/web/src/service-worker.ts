/// <reference lib="webworker" />
import { precacheAndRoute } from "workbox-precaching";

declare const self: Window & ServiceWorkerGlobalScope;

export {};

precacheAndRoute(self.__WB_MANIFEST);

// Additional code goes here.
