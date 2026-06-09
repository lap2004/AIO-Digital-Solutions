/** Thin typed wrapper around localStorage with namespacing + JSON safety. */
const PREFIX = 'aio.';

export const storage = {
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(PREFIX + key);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      /* ignore quota / serialization errors */
    }
  },
  remove(key: string): void {
    localStorage.removeItem(PREFIX + key);
  },
};
