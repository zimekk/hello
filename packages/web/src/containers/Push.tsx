import React, { useCallback, useEffect, useState } from "react";
import styles from "./Push.module.scss";

export default function Section() {
  const [text, setText] = useState("");

  useEffect(() => {
    const status = document.getElementById("status");
    status.textContent = "supported";

    const received = document.getElementById("received");
    const inbox = {};

    navigator.serviceWorker.addEventListener("message", function (event) {
      // A message has been received, now show the message on the page.
      var clientId = event.data.client;
      var node;
      // A message from this client hasn’t been received before, so we need to setup a place to show its messages.
      if (!inbox[clientId]) {
        node = document.createElement("div");
        received.appendChild(node);
        inbox[clientId] = node;
      }
      // Show the message.
      node = inbox[clientId];
      node.textContent = "Client " + clientId + " says: " + event.data.message;
    });
  }, []);

  const handleChangeText = useCallback((e) => {
    const { value: text } = e.target;
    setText(text);
  }, []);

  const handleSendMessage = useCallback(() => {
    setText("");
    // sendMessage({ uuid, text });

    if (!navigator.serviceWorker.controller) {
      const status = document.getElementById("status");
      status.textContent = "error: no controller";
      return;
    }
    // Send the message to the service worker.
    navigator.serviceWorker.controller.postMessage(text);
  }, [text]);

  const handleKeyDown = useCallback(
    (e) =>
      e.key === "Enter" &&
      !e.shiftKey &&
      (e.preventDefault(), handleSendMessage()),
    [handleSendMessage]
  );

  return (
    <section className={styles.Section}>
      <h2>Push</h2>
      <p>
        This demo shows how to register for push notifications and how to send
        them.
      </p>

      <form>
        Notification delay:{" "}
        <input id="notification-delay" type="number" defaultValue="5"></input>{" "}
        seconds Notification Time-To-Live:{" "}
        <input id="notification-ttl" type="number" defaultValue="0"></input>{" "}
        seconds
      </form>

      <button id="doIt">Try to conquer Italy!</button>

      <p>
        Open another window with this page and type some text in below to
        postMessage it to the ServiceWorker which will forward the message
        along.
      </p>
      <span id="status"></span>
      <div id="received"></div>
      <input
        value={text}
        onChange={handleChangeText}
        onKeyDown={handleKeyDown}
      />
      <button onClick={handleSendMessage} disabled={!text.length}>
        send
      </button>
    </section>
  );
}
