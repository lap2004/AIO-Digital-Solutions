import type { ReactNode } from 'react';
import { Container } from '@/presentation/components/common/Container';
import { AuroraBackground } from '@/presentation/components/common/Backgrounds';
import { Breadcrumb, type Crumb } from './Breadcrumb';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumb?: Crumb[];
  children?: ReactNode;
}

/** Standard inner-page hero band used by list pages. */
export function PageHero({ eyebrow, title, description, breadcrumb, children }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-32">
      <AuroraBackground />
      <Container className="relative">
        {breadcrumb && <Breadcrumb items={breadcrumb} />}
        {eyebrow && <span className="eyebrow mt-5">{eyebrow}</span>}
        <h1 className="mt-4 max-w-3xl text-balance text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-4 max-w-2xl text-lg text-muted">{description}</p>}
        {children}
      </Container>
    </section>
  );
}
