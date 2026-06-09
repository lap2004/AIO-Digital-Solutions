import type { ReactNode } from 'react';
import { useI18n } from '@/core/i18n';
import { cn } from '@/core/utils/cn';
import { FlagVN, FlagGB } from './Flags';

/** Two-flag language toggle (🇻🇳 / 🇬🇧). Default Vietnamese. */
export function LanguageSwitcher({ className }: { className?: string }) {
  const { lang, setLang } = useI18n();

  const Btn = ({ code, label, flag }: { code: 'vi' | 'en'; label: string; flag: ReactNode }) => (
    <button
      onClick={() => setLang(code)}
      aria-pressed={lang === code}
      aria-label={code === 'vi' ? 'Chuyển sang Tiếng Việt' : 'Switch to English'}
      title={label}
      className={cn(
        'flex h-7 w-9 items-center justify-center rounded-md transition',
        lang === code ? 'bg-white/15 ring-1 ring-brand-accent/50' : 'opacity-55 hover:opacity-100',
      )}
    >
      <span className="h-4 w-6 overflow-hidden rounded-[3px] ring-1 ring-white/20">{flag}</span>
    </button>
  );

  return (
    <div className={cn('flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 p-0.5', className)}>
      <Btn code="vi" label="Tiếng Việt" flag={<FlagVN className="h-full w-full" />} />
      <Btn code="en" label="English" flag={<FlagGB className="h-full w-full" />} />
    </div>
  );
}
