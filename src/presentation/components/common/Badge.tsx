import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
  {
    variants: {
      tone: {
        default: 'bg-slate-100 text-slate-800 border border-slate-200 dark:border-transparent dark:bg-white/10 dark:text-ink',
        brand: 'bg-cyan-50 text-cyan-700 border border-cyan-200/80 dark:border-transparent dark:bg-brand-accent/15 dark:text-brand-accent',
        success: 'bg-emerald-50 text-emerald-700 border border-emerald-200/80 dark:border-transparent dark:bg-emerald-500/15 dark:text-emerald-300',
        warning: 'bg-amber-50 text-amber-800 border border-amber-200/80 dark:border-transparent dark:bg-amber-500/15 dark:text-amber-300',
        danger: 'bg-red-50 text-red-700 border border-red-200/80 dark:border-transparent dark:bg-red-500/15 dark:text-red-300',
        info: 'bg-sky-50 text-sky-700 border border-sky-200/80 dark:border-transparent dark:bg-sky-500/15 dark:text-sky-300',
        purple: 'bg-violet-50 text-violet-700 border border-violet-200/80 dark:border-transparent dark:bg-violet-500/15 dark:text-violet-300',
      },
    },
    defaultVariants: { tone: 'default' },
  },
);

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: ReactNode;
  className?: string;
}

export function Badge({ tone, className, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ tone }), className)}>{children}</span>;
}
