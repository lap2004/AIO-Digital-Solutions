import { Moon, Sun } from 'lucide-react';
import { useThemeStore } from '@/core/theme/theme.store';
import { cn } from '@/core/utils/cn';

/** Light / dark theme toggle. Default dark. */
export function ThemeToggle({ className }: { className?: string }) {
  const theme = useThemeStore((s) => s.theme);
  const toggle = useThemeStore((s) => s.toggle);

  return (
    <button
      onClick={toggle}
      aria-label={theme === 'dark' ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối'}
      title={theme === 'dark' ? 'Giao diện sáng' : 'Giao diện tối'}
      className={cn(
        'flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/5 text-ink transition hover:border-brand-accent/50 hover:text-brand-cyan',
        className,
      )}
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
