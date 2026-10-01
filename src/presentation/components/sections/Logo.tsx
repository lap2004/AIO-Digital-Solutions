import { Link } from 'react-router-dom';
import { cn } from '@/core/utils/cn';

export function Logo({ className, to = '/' }: { className?: string; to?: string }) {
  return (
    <Link to={to} className={cn('group flex items-center gap-3', className)}>
      <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-cyan via-cyan-400 to-blue-600 font-display text-lg font-black text-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.5)] transition-transform duration-300 group-hover:scale-105">
        <span className="tracking-tighter">AIO</span>
      </div>
      <div className="leading-none">
        <span className="flex items-center gap-1.5 font-display text-lg font-black tracking-wider text-slate-900 dark:text-white">
          <span>AIO LED</span>
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan animate-pulse" />
        </span>
        <span className="block text-[9px] font-bold uppercase tracking-[0.25em] text-cyan-600 dark:text-brand-cyan">
          DIGITAL SOLUTIONS
        </span>
      </div>
    </Link>
  );
}
