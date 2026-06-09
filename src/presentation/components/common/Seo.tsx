import { useEffect } from 'react';
import { env } from '@/core/config/env';

interface SeoProps {
  title: string;
  description?: string;
  image?: string;
  /** JSON-LD structured data object */
  jsonLd?: Record<string, unknown>;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/** Lightweight SEO manager: title, description, OpenGraph + JSON-LD structured data. */
export function Seo({ title, description, image, jsonLd }: SeoProps) {
  useEffect(() => {
    const fullTitle = title.includes('AIO') ? title : `${title} | ${env.siteName}`;
    document.title = fullTitle;
    if (description) upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', fullTitle);
    if (description) upsertMeta('property', 'og:description', description);
    if (image) upsertMeta('property', 'og:image', image);
    upsertMeta('property', 'og:type', 'website');

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }
    return () => {
      if (script) document.head.removeChild(script);
    };
  }, [title, description, image, jsonLd]);

  return null;
}
