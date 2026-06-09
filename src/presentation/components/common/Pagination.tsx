import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/core/utils/cn';

interface PaginationProps {
  page: number;
  pageSize: number;
  total: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageSize, total, onChange }: PaginationProps) {
  const pages = Math.ceil(total / pageSize);
  if (pages <= 1) return null;

  const items = Array.from({ length: pages }, (_, i) => i + 1).filter(
    (p) => p === 1 || p === pages || Math.abs(p - page) <= 1,
  );

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Phân trang">
      <button
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page === 1}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink transition hover:border-brand-accent/50 disabled:opacity-40"
        aria-label="Trang trước"
      >
        <ChevronLeft className="h-4 w-4" />
      </button>
      {items.map((p, idx) => {
        const prev = items[idx - 1];
        const gap = prev && p - prev > 1;
        return (
          <span key={p} className="flex items-center gap-2">
            {gap && <span className="text-muted">…</span>}
            <button
              onClick={() => onChange(p)}
              className={cn(
                'h-10 min-w-10 rounded-lg border px-3 text-sm font-semibold transition',
                p === page
                  ? 'border-transparent bg-brand-gradient text-white'
                  : 'border-white/10 text-ink hover:border-brand-accent/50',
              )}
            >
              {p}
            </button>
          </span>
        );
      })}
      <button
        onClick={() => onChange(Math.min(pages, page + 1))}
        disabled={page === pages}
        className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-ink transition hover:border-brand-accent/50 disabled:opacity-40"
        aria-label="Trang sau"
      >
        <ChevronRight className="h-4 w-4" />
      </button>
    </nav>
  );
}
