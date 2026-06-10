import type { Brand } from '@/domain/entities';

/** Brand wordmark tile (no external logo files — renders a styled wordmark). */
export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="group flex h-24 items-center justify-center rounded-xl glass-strong px-6 transition hover:border-brand-accent/60 hover:shadow-glow">
      <div className="text-center">
        <div className="font-display text-xl font-bold tracking-wide text-white transition group-hover:text-brand-cyan">
          {brand.name}
        </div>
        <div className="text-[11px] uppercase tracking-widest text-muted">{brand.country}</div>
      </div>
    </div>
  );
}
