import type { Brand } from '@/domain/entities';

/** Brand wordmark tile (no external logo files — renders a styled wordmark). */
export function BrandCard({ brand }: { brand: Brand }) {
  return (
    <div className="group flex h-24 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 transition hover:border-brand-accent/40 hover:bg-white/[0.06]">
      <div className="text-center">
        <div className="font-display text-lg font-bold tracking-wide text-white/70 transition group-hover:text-brand-cyan">
          {brand.name}
        </div>
        <div className="text-[10px] uppercase tracking-widest text-muted">{brand.country}</div>
      </div>
    </div>
  );
}
