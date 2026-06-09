import { useState } from 'react';
import { ImageOff } from 'lucide-react';
import { cn } from '@/core/utils/cn';

interface SmartImageProps {
  src?: string;
  alt: string;
  className?: string;
  /** lazy by default for performance */
  eager?: boolean;
}

/** Image with graceful fallback + lazy loading. Used everywhere a product/project photo renders. */
export function SmartImage({ src, alt, className, eager = false }: SmartImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={cn(
          'flex items-center justify-center bg-gradient-to-br from-[#0b1326] to-[#020617] text-muted',
          className,
        )}
      >
        <div className="flex flex-col items-center gap-2 p-4 text-center">
          <ImageOff className="h-8 w-8 opacity-40" />
          <span className="text-[11px] uppercase tracking-wider opacity-50">AIO</span>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
