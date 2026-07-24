export const PREFERENCES_STORAGE_KEY = "dungeondex3d.preferences.v1";
export const DEFAULT_PREFERENCES = Object.freeze({
  cameraSensitivity: 1,
  reducedMotion: false,
});

export function normalizePreferences(value) {
  const sensitivity = Number(value?.cameraSensitivity);
  return {
    cameraSensitivity: Number.isFinite(sensitivity)
      ? Math.max(0.5, Math.min(2, sensitivity))
      : DEFAULT_PREFERENCES.cameraSensitivity,
    reducedMotion: value?.reducedMotion === true,
  };
}

export function loadPreferences(storage) {
  if (!storage || typeof storage.getItem !== "function") return { ...DEFAULT_PREFERENCES };
  try {
    const raw = storage.getItem(PREFERENCES_STORAGE_KEY);
    return raw ? normalizePreferences(JSON.parse(raw)) : { ...DEFAULT_PREFERENCES };
  } catch {
    return { ...DEFAULT_PREFERENCES };
  }
}

export function savePreferences(storage, preferences) {
  const normalized = normalizePreferences(preferences);
  if (storage && typeof storage.setItem === "function") {
    storage.setItem(PREFERENCES_STORAGE_KEY, JSON.stringify(normalized));
  }
  return normalized;
}
