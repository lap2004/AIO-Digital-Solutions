import type { ReactNode } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/core/utils/cn';

const badgeVariants = cva(
  'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold',
  {
    variants: {
      tone: {
        default: 'bg-white/10 text-ink',
        brand: 'bg-brand-accent/15 text-brand-accent',
        success: 'bg-emerald-500/15 text-emerald-300',
        warning: 'bg-amber-500/15 text-amber-300',
        danger: 'bg-red-500/15 text-red-300',
        info: 'bg-sky-500/15 text-sky-300',
        purple: 'bg-violet-500/15 text-violet-300',
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
