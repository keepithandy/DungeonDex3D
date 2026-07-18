export const DEFAULT_NOTIFICATION_DURATION = 2.5;

function normalizeDuration(duration) {
  return Number.isFinite(duration) && duration > 0
    ? duration
    : DEFAULT_NOTIFICATION_DURATION;
}

function normalizeQueue(queue) {
  return Array.isArray(queue)
    ? queue
        .filter((entry) => entry && typeof entry.message === "string" && entry.message.trim())
        .map((entry) => ({
          message: entry.message,
          duration: normalizeDuration(entry.duration),
        }))
    : [];
}

export function enqueueNotification(state, message, duration = DEFAULT_NOTIFICATION_DURATION) {
  const nextMessage = typeof message === "string" ? message.trim() : "";
  const queue = normalizeQueue(state.notificationQueue);

  if (!nextMessage) {
    return {
      notification: state.notification || "",
      notificationTimer: Math.max(0, state.notificationTimer || 0),
      notificationQueue: queue,
    };
  }

  const nextEntry = {
    message: nextMessage,
    duration: normalizeDuration(duration),
  };

  if (!state.notification || state.notificationTimer <= 0) {
    const firstEntry = queue.shift() || nextEntry;
    if (firstEntry !== nextEntry) queue.push(nextEntry);

    return {
      notification: firstEntry.message,
      notificationTimer: firstEntry.duration,
      notificationQueue: queue,
    };
  }

  return {
    notification: state.notification,
    notificationTimer: state.notificationTimer,
    notificationQueue: [...queue, nextEntry],
  };
}

export function tickNotificationState(state, dt) {
  const queue = normalizeQueue(state.notificationQueue);
  const elapsed = Number.isFinite(dt) && dt > 0 ? dt : 0;
  let notification = state.notification || "";
  let notificationTimer = Math.max(0, state.notificationTimer || 0);

  if (!notification || notificationTimer <= 0) {
    const firstEntry = queue.shift();
    return firstEntry
      ? {
          notification: firstEntry.message,
          notificationTimer: firstEntry.duration,
          notificationQueue: queue,
        }
      : {
          notification: "",
          notificationTimer: 0,
          notificationQueue: [],
        };
  }

  notificationTimer -= elapsed;

  while (notificationTimer <= 0) {
    const nextEntry = queue.shift();
    if (!nextEntry) {
      return {
        notification: "",
        notificationTimer: 0,
        notificationQueue: [],
      };
    }

    notification = nextEntry.message;
    notificationTimer += nextEntry.duration;
  }

  return {
    notification,
    notificationTimer,
    notificationQueue: queue,
  };
}
