import React from "react";
import styles from "./Push.module.scss";

export default function Section() {
  return (
    <section className={styles.Section}>
      <h2>Push</h2>
      <p>
        This demo shows how to register for push notifications and how to send
        them.
      </p>

      <form>
        Notification delay:{" "}
        <input id="notification-delay" type="number" value="5"></input> seconds
        Notification Time-To-Live:{" "}
        <input id="notification-ttl" type="number" value="0"></input> seconds
      </form>

      <button id="doIt">Try to conquer Italy!</button>
    </section>
  );
}
