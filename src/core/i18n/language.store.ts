import { create } from 'zustand';
import { storage } from '@/infrastructure/storage/local-storage';

export type Lang = 'vi' | 'en';

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  lang: 'vi',
  setLang() {
    storage.set('lang', 'vi');
    document.documentElement.lang = 'vi';
    set({ lang: 'vi' });
  },
  toggle() {},
}));

// Apply the persisted language to <html lang> on first load.
if (typeof document !== 'undefined') {
  document.documentElement.lang = 'vi';
}

