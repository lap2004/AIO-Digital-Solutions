import type { ReactNode } from 'react';
import { cn } from '@/core/utils/cn';

interface CardProps {
  className?: string;
  children: ReactNode;
  hover?: boolean;
}

export function Card({ className, children, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-white/10 bg-[#0b1326]/70 shadow-card backdrop-blur-md',
        hover && 'glow-hover hover:-translate-y-1 hover:border-brand-accent/40',
        className,
      )}
    >
      {children}
    </div>
  );
}
