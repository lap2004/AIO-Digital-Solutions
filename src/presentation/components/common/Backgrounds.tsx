import { cn } from '@/core/utils/cn';

/** Animated aurora + tech-grid backdrop used behind hero sections. */
export function AuroraBackground({ className }: { className?: string }) {
  return (
    <div className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)} aria-hidden>
      <div className="absolute -left-1/4 -top-1/3 h-[60vh] w-[60vh] rounded-full bg-brand-blue/30 blur-[120px] animate-float" />
      <div className="absolute right-0 top-0 h-[50vh] w-[50vh] rounded-full bg-brand-cyan/20 blur-[120px] animate-aurora" />
      <div className="absolute bottom-0 left-1/3 h-[40vh] w-[40vh] rounded-full bg-brand-accent/20 blur-[120px] animate-float" />
      <div className="absolute inset-0 tech-grid" />
    </div>
  );
}

export function TechGrid({ className }: { className?: string }) {
  return <div className={cn('pointer-events-none absolute inset-0 tech-grid', className)} aria-hidden />;
}
