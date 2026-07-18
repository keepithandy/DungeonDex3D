import assert from "node:assert/strict";
import fs from "node:fs";
import {
  enqueueNotification,
  tickNotificationState,
} from "../src/game/notificationQueue.mjs";

const emptyState = {
  notification: "",
  notificationTimer: 0,
  notificationQueue: [],
};

const firstVisible = enqueueNotification(emptyState, "First message", 0.1);
assert.equal(firstVisible.notification, "First message", "first message should display immediately");
assert.equal(firstVisible.notificationQueue.length, 0, "first message should not remain queued");

const secondQueued = enqueueNotification(firstVisible, "Second message", 0.2);
assert.equal(secondQueued.notification, "First message", "active message should remain visible");
assert.deepEqual(
  secondQueued.notificationQueue.map((entry) => entry.message),
  ["Second message"],
  "second message should queue behind the visible message",
);

const secondVisible = tickNotificationState(secondQueued, 0.1);
assert.equal(secondVisible.notification, "Second message", "next message should advance after duration");
assert.equal(secondVisible.notificationQueue.length, 0, "advanced message should leave the queue");

const cleared = tickNotificationState(secondVisible, 0.2);
assert.equal(cleared.notification, "", "empty queue should clear the visible message");
assert.equal(cleared.notificationTimer, 0, "empty queue should clear the timer");
assert.deepEqual(cleared.notificationQueue, [], "empty queue should remain empty");

const recoveredFromQueue = tickNotificationState({
  notification: "",
  notificationTimer: 0,
  notificationQueue: [{ message: "Recovered message", duration: 0.25 }],
}, 0.1);
assert.equal(
  recoveredFromQueue.notification,
  "Recovered message",
  "ticker should surface the first queued message when no message is visible",
);

const gameSource = fs.readFileSync("src/game/Game.tsx", "utf8");
assert.match(gameSource, /<NotificationTicker\s*\/>/, "Game should mount NotificationTicker once");
assert.equal(
  (gameSource.match(/window\.setInterval/g) || []).length,
  1,
  "NotificationTicker should schedule one interval",
);
assert.equal(
  (gameSource.match(/window\.clearInterval/g) || []).length,
  1,
  "NotificationTicker should clear its interval on unmount",
);

const hudSource = fs.readFileSync("src/game/HUD.tsx", "utf8");
assert.match(
  hudSource,
  /EXIT PORTAL OPENS AFTER FINAL ENEMY/,
  "HUD objective should explain when the exit portal opens",
);

const storeSource = fs.readFileSync("src/game/store.ts", "utf8");
assert.match(storeSource, /notificationQueue: NotificationEntry\[\]/, "store should expose a typed notification queue");
assert.match(storeSource, /enqueueNotification/, "store notification writes should use the queue helper");
assert.match(storeSource, /tickNotificationState/, "store ticker should use deterministic queue transitions");

console.log("DungeonDex3D encounter clarity smoke passed");
console.log("objectiveCopy=ok");
console.log("firstQueuedMessage=ok");
console.log("nextMessageAfterDuration=ok");
console.log("emptyQueueClears=ok");
console.log("singleTickerLifecycle=ok");
