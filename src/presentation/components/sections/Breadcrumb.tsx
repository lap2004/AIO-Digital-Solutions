import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="flex flex-wrap items-center gap-1.5 text-sm text-muted" aria-label="Breadcrumb">
      <Link to="/" className="flex items-center gap-1 transition hover:text-brand-cyan">
        <Home className="h-3.5 w-3.5" />
      </Link>
      {items.map((item) => (
        <span key={item.label} className="flex items-center gap-1.5">
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
          {item.to ? (
            <Link to={item.to} className="transition hover:text-brand-cyan">
              {item.label}
            </Link>
          ) : (
            <span className="text-white">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
