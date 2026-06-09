import { create } from 'zustand';
import { storage } from '@/infrastructure/storage/local-storage';

export type Theme = 'dark' | 'light';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggle: () => void;
}

function apply(theme: Theme) {
  const root = document.documentElement;
  root.classList.remove('dark', 'light');
  root.classList.add(theme);
  root.style.colorScheme = theme;
}

export const useThemeStore = create<ThemeState>((set, get) => ({
  theme: storage.get<Theme>('theme', 'dark'),
  setTheme(theme) {
    storage.set('theme', theme);
    apply(theme);
    set({ theme });
  },
  toggle() {
    get().setTheme(get().theme === 'dark' ? 'light' : 'dark');
  },
}));

// Apply persisted theme on first load (default dark).
if (typeof document !== 'undefined') {
  apply(useThemeStore.getState().theme);
}
