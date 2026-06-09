import { cn } from '@/core/utils/cn';

/**
 * Renders a Bootstrap Icon by name (without the `bi-` prefix).
 * e.g. <Icon name="display" className="text-3xl" />
 * Size is controlled via font-size (Tailwind text-* classes), since
 * Bootstrap Icons are an icon font.
 */
export function Icon({ name, className }: { name: string; className?: string }) {
  return <i className={cn('bi', `bi-${name}`, 'inline-flex leading-none', className)} aria-hidden="true" />;
}
