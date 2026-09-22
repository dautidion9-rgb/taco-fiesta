import { useEffect } from 'react';

const SITE_URL = 'https://tacofiesta.al';

interface SEOOptions {
  title: string;
  description: string;
  canonicalPath?: string;
  jsonLd?: object;
  noindex?: boolean;
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function useSEO({ title, description, canonicalPath, jsonLd, noindex }: SEOOptions) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    if (canonicalPath) {
      const url = `${SITE_URL}${canonicalPath}`;
      upsertMeta('property', 'og:url', url);

      let canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.setAttribute('rel', 'canonical');
        document.head.appendChild(canonical);
      }
      canonical.setAttribute('href', url);
    }

    const robotsMeta = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
    const prevRobots = robotsMeta?.getAttribute('content') ?? null;
    if (noindex) {
      upsertMeta('name', 'robots', 'noindex, follow');
    }

    let script: HTMLScriptElement | null = null;
    if (jsonLd) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.text = JSON.stringify(jsonLd);
      document.head.appendChild(script);
    }

    return () => {
      document.title = prevTitle;
      script?.remove();
      if (noindex && prevRobots !== null) {
        upsertMeta('name', 'robots', prevRobots);
      }
    };
  }, [title, description, canonicalPath, jsonLd, noindex]);
}
