import { Link } from 'react-router-dom';
import { cn } from '@/core/utils/cn';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('flex items-center gap-2.5', className)}>
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-gradient font-display text-lg font-bold text-white shadow-glow">
        A
      </span>
      <span className="leading-none">
        <span className="block font-display text-lg font-bold text-white">AIO</span>
        <span className="block text-[10px] uppercase tracking-[0.2em] text-brand-accent">
          Digital Solutions
        </span>
      </span>
    </Link>
  );
}
