import { useEffect, useRef, useState } from 'react';
import { Card } from './Card';
import { cn } from '@/core/utils/cn';

interface StatCardProps {
  value: number;
  suffix?: string;
  label: string;
  className?: string;
}

/** Animated count-up stat card. */
export function StatCard({ value, suffix = '', label, className }: StatCardProps) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        const duration = 1400;
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(eased * value));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.disconnect();
      },
      { threshold: 0.4 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  return (
    <Card className={cn('p-6 text-center', className)}>
      <div ref={ref} className="text-4xl font-bold text-gradient">
        {display.toLocaleString('vi-VN')}
        {suffix}
      </div>
      <div className="mt-2 text-sm text-muted">{label}</div>
    </Card>
  );
}
