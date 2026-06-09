import { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { Solution } from '@/domain/entities';
import { cn } from '@/core/utils/cn';
import { SolutionCard } from './SolutionCard';

/** Cards visible at once, by breakpoint. */
function calcPerView(): number {
  if (typeof window === 'undefined') return 4;
  const w = window.innerWidth;
  if (w < 640) return 1;
  if (w < 1024) return 2;
  if (w < 1280) return 3;
  return 4;
}

const INTERVAL = 3500;
const DURATION = 600;

/**
 * Auto-rotating, infinite-loop carousel: reveals solutions one at a time,
 * sliding left → right. Pauses on hover; arrows + dots for manual control.
 */
export function SolutionsCarousel({ items }: { items: Solution[] }) {
  const [perView, setPerView] = useState(calcPerView);
  const [index, setIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);

  // Clone the first `perView` items at the end for a seamless loop.
  const extended = useMemo(() => [...items, ...items.slice(0, perView)], [items, perView]);

  // Recompute cards-per-view on resize and reset position.
  useEffect(() => {
    const onResize = () => setPerView(calcPerView());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);
  useEffect(() => {
    setAnimate(false);
    setIndex(0);
  }, [perView]);

  // Autoplay.
  useEffect(() => {
    if (paused || items.length <= perView) return;
    const id = setInterval(() => setIndex((i) => i + 1), INTERVAL);
    return () => clearInterval(id);
  }, [paused, perView, items.length]);

  // Seamless loop: when we reach the cloned set, snap back to start without animation.
  useEffect(() => {
    if (index !== items.length) return;
    const t = setTimeout(() => {
      setAnimate(false);
      setIndex(0);
    }, DURATION + 30);
    return () => clearTimeout(t);
  }, [index, items.length]);

  // Re-enable the transition on the frame after a snap.
  useEffect(() => {
    if (animate) return;
    const r = requestAnimationFrame(() => setAnimate(true));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  const go = (next: number) => {
    if (next === index) return;
    setAnimate(true);
    if (next === items.length) {
      setIndex(items.length);
    } else if (next < 0) {
      setIndex(items.length - 1);
    } else {
      setIndex(next);
    }
  };

  const trackRef = useRef<HTMLDivElement>(null);
  const slideBasis = 100 / extended.length;
  const activeDot = ((index % items.length) + items.length) % items.length;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="overflow-x-clip">
        <div
          ref={trackRef}
          className="flex items-stretch"
          style={{
            width: `${(extended.length / perView) * 100}%`,
            transform: `translateX(-${index * slideBasis}%)`,
            transition: animate ? `transform ${DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)` : 'none',
          }}
        >
          {extended.map((s, i) => (
            <div key={`${s.id}-${i}`} style={{ flex: `0 0 ${slideBasis}%` }} className="px-4 py-3">
              <div className="h-full">
                <SolutionCard solution={s} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Arrows */}
      <button
        onClick={() => go(activeDot - 1)}
        aria-label="Trước"
        className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0b1326]/80 text-ink backdrop-blur transition hover:border-brand-accent/50 hover:text-brand-cyan"
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button
        onClick={() => go(activeDot + 1)}
        aria-label="Sau"
        className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-[#0b1326]/80 text-ink backdrop-blur transition hover:border-brand-accent/50 hover:text-brand-cyan"
      >
        <ChevronRight className="h-5 w-5" />
      </button>

      {/* Dots */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {items.map((s, i) => (
          <button
            key={s.id}
            onClick={() => go(i)}
            aria-label={`Giải pháp ${i + 1}`}
            className={cn(
              'h-2 rounded-full transition-all',
              i === activeDot ? 'w-7 bg-brand-gradient' : 'w-2 bg-white/20 hover:bg-white/40',
            )}
          />
        ))}
      </div>
    </div>
  );
}
