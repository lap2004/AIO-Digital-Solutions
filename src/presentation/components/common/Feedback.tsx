import type { ReactNode } from 'react';
import { Loader2, SearchX } from 'lucide-react';
import { cn } from '@/core/utils/cn';

export function Spinner({ className }: { className?: string }) {
  return <Loader2 className={cn('h-5 w-5 animate-spin text-brand-accent', className)} />;
}

export function Skeleton({ className }: { className?: string }) {
  return <div className={cn('skeleton rounded-lg', className)} />;
}

export function LoadingBlock({ label = 'Đang tải…' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-20 text-muted">
      <Spinner className="h-7 w-7" />
      <span className="text-sm">{label}</span>
    </div>
  );
}

export function EmptyState({
  title = 'Không có dữ liệu',
  description,
  icon,
  action,
}: {
  title?: string;
  description?: string;
  icon?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/10 py-16 text-center">
      <div className="text-muted">{icon ?? <SearchX className="h-10 w-10 opacity-50" />}</div>
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      {description && <p className="max-w-sm text-sm text-muted">{description}</p>}
      {action}
    </div>
  );
}
