import assert from "node:assert/strict";
import fs from "node:fs";
import {
  clampArenaPosition,
  isSpawnInsideArena,
  normalizeMovementInput,
} from "../src/game/movementModel.mjs";
import {
  DEFAULT_PREFERENCES,
  loadPreferences,
  normalizePreferences,
  savePreferences,
} from "../src/game/preferences.mjs";
import {
  enqueueNotification,
  tickNotificationState,
} from "../src/game/notificationQueue.mjs";

const cardinal = normalizeMovementInput(true, false, false, false);
const diagonal = normalizeMovementInput(true, false, false, true);
assert.equal(Math.hypot(cardinal.x, cardinal.z), 1);
assert.equal(Math.hypot(diagonal.x, diagonal.z), 1, "diagonal input must not move faster");
assert.deepEqual(clampArenaPosition([99, 7, -99], 19), [19, 1.6, -19]);
assert.equal(isSpawnInsideArena([0, 1, 0], 19), true);
assert.equal(isSpawnInsideArena([20, 1, 0], 19), false);

assert.deepEqual(normalizePreferences({ cameraSensitivity: 99, reducedMotion: true }), {
  cameraSensitivity: 2,
  reducedMotion: true,
});
assert.deepEqual(normalizePreferences({ cameraSensitivity: -2 }), {
  cameraSensitivity: 0.5,
  reducedMotion: false,
});
assert.deepEqual(loadPreferences({ getItem: () => "not-json" }), DEFAULT_PREFERENCES);
let stored = "";
const saved = savePreferences({ setItem: (_key, value) => { stored = value; } }, {
  cameraSensitivity: 1.25,
  reducedMotion: true,
});
assert.deepEqual(JSON.parse(stored), saved);

let state = { notification: "", notificationTimer: 0, notificationQueue: [] };
state = enqueueNotification(state, "one", 0.1);
state = enqueueNotification(state, "two", 0.2);
state = enqueueNotification(state, "three", 0.3);
assert.deepEqual(state.notificationQueue.map((entry) => entry.message), ["two", "three"]);
state = tickNotificationState(state, 0.1);
assert.equal(state.notification, "two");
state = tickNotificationState(state, 0.2);
assert.equal(state.notification, "three");
state = tickNotificationState(state, 0.3);
assert.equal(state.notification, "");
assert.deepEqual(enqueueNotification(state, "   "), state, "blank messages must be ignored");

const playerSource = fs.readFileSync("src/game/Player.tsx", "utf8");
assert.match(playerSource, /normalizeMovementInput/);
assert.match(playerSource, /clampArenaPosition/);
assert.match(playerSource, /pointerlockerror/);
assert.match(playerSource, /requestPointerLock/);

const storeSource = fs.readFileSync("src/game/store.ts", "utf8");
for (const field of ["enemies: []", "loot: []", "bullets: []", "killCount: 0", "notificationQueue: []", "exitActive: false"]) {
  assert.match(storeSource, new RegExp(field.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
}
assert.match(storeSource, /position: \[0, 1, 0\]/);
assert.match(storeSource, /totalKills: newTotalKills/);

const hudSource = fs.readFileSync("src/game/HUD.tsx", "utf8");
assert.match(hudSource, /maxWidth/);
assert.match(hudSource, /whiteSpace: "normal"/);
assert.match(hudSource, /overflowWrap: "anywhere"/);

const gameSource = fs.readFileSync("src/game/Game.tsx", "utf8");
assert.match(gameSource, /ErrorBoundary/);
assert.match(gameSource, /SceneResourceFallback/);

console.log("DungeonDex3D alpha hardening smoke passed");
console.log("movementBoundaries=ok");
console.log("pointerLockContracts=ok");
console.log("preferencesRepair=ok");
console.log("encounterResetContracts=ok");
console.log("notificationQueueRegression=ok");
console.log("resourceFallbackContract=ok");
console.log("responsiveHudContract=ok");
