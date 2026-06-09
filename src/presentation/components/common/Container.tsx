import type { ReactNode } from 'react';
import { cn } from '@/core/utils/cn';

export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[1320px] px-6', className)}>{children}</div>;
}
