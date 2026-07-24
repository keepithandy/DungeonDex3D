export interface GamePreferences {
  cameraSensitivity: number;
  reducedMotion: boolean;
}

export interface PreferenceReader {
  getItem(key: string): string | null;
}

export interface PreferenceWriter {
  setItem(key: string, value: string): void;
}

export const PREFERENCES_STORAGE_KEY: string;
export const DEFAULT_PREFERENCES: Readonly<GamePreferences>;
export function normalizePreferences(value: Partial<GamePreferences> | null | undefined): GamePreferences;
export function loadPreferences(storage?: PreferenceReader | null): GamePreferences;
export function savePreferences(storage: PreferenceWriter | null | undefined, preferences: Partial<GamePreferences>): GamePreferences;
