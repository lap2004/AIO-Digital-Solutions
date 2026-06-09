import type { ComponentType } from 'react';
import * as Lucide from 'lucide-react';
import { Box, type LucideProps } from 'lucide-react';

/** Render a lucide icon by its string name (used for data-driven icons). */
export function Icon({ name, ...props }: { name: string } & LucideProps) {
  const Resolved =
    ((Lucide as unknown as Record<string, ComponentType<LucideProps>>)[name]) ?? Box;
  return <Resolved {...props} />;
}
