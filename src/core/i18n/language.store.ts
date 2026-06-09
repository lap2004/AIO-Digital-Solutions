import { create } from 'zustand';
import { storage } from '@/infrastructure/storage/local-storage';

export type Lang = 'vi' | 'en';

interface LanguageState {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
}

export const useLanguageStore = create<LanguageState>((set, get) => ({
  lang: storage.get<Lang>('lang', 'vi'),
  setLang(lang) {
    storage.set('lang', lang);
    document.documentElement.lang = lang;
    set({ lang });
  },
  toggle() {
    get().setLang(get().lang === 'vi' ? 'en' : 'vi');
  },
}));

// Apply the persisted language to <html lang> on first load.
if (typeof document !== 'undefined') {
  document.documentElement.lang = useLanguageStore.getState().lang;
}
