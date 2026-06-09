import { cn } from '@/core/utils/cn';

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({ eyebrow, title, description, align = 'center', className }: SectionHeaderProps) {
  return (
    <div className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <span className="eyebrow mb-4">{eyebrow}</span>}
      <h2 className="text-balance text-3xl font-bold leading-tight md:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted">{description}</p>}
    </div>
  );
}
