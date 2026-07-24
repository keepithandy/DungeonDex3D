export interface GamePreferences {
  cameraSensitivity: number;
  reducedMotion: boolean;
}

export const PREFERENCES_STORAGE_KEY: string;
export const DEFAULT_PREFERENCES: Readonly<GamePreferences>;
export function normalizePreferences(value: Partial<GamePreferences> | null | undefined): GamePreferences;
export function loadPreferences(storage?: Pick<Storage, "getItem"> | null): GamePreferences;
export function savePreferences(storage: Pick<Storage, "setItem"> | null | undefined, preferences: Partial<GamePreferences>): GamePreferences;
