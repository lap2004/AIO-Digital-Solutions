import { useLanguageStore, type Lang } from './language.store';
import { translate } from './translations';

export type { Lang };
export { useLanguageStore };

interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  /** Translate a dictionary dot-path, e.g. t('home.heroDesc'). */
  t: (path: string) => string;
  /** Pick a value by current language: pick(viValue, enValue). */
  pick: <T>(vi: T, en: T) => T;
}

/** Single hook for all i18n needs in components. */
export function useI18n(): I18n {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const toggle = useLanguageStore((s) => s.toggle);
  return {
    lang,
    setLang,
    toggle,
    t: (path: string) => translate(lang, path),
    pick: <T,>(vi: T, en: T) => (lang === 'en' ? en : vi),
  };
}
