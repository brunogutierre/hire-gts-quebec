import { DOCUMENT, inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { SEO } from '../../../content/seo';
import { OWNER } from '../../../content/site';
import { CURRENT_LOCALE, LOCALE_INFO, LOCALES, localeUrl, SITE_URL } from '../i18n/locale';

/**
 * Writes the head metadata of the page. It runs during prerendering, so each language's static
 * HTML ships its own title, description, canonical URL, hreflang alternates and Open Graph tags.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly locale = inject(CURRENT_LOCALE);

  apply(): void {
    const text = SEO[this.locale];
    const url = localeUrl(this.locale);
    this.title.setTitle(text.title);
    this.meta.updateTag({ name: 'description', content: text.description });
    this.meta.updateTag({ name: 'author', content: OWNER.name });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ property: 'og:title', content: text.title });
    this.meta.updateTag({ property: 'og:description', content: text.description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:locale', content: LOCALE_INFO[this.locale].og });
    this.removeAll('meta[property="og:locale:alternate"]');
    for (const locale of LOCALES.filter((l) => l !== this.locale)) {
      this.meta.addTag({ property: 'og:locale:alternate', content: LOCALE_INFO[locale].og });
    }
    this.meta.updateTag({ property: 'og:image', content: `${SITE_URL}og/${this.locale}.jpg` });
    this.meta.updateTag({ property: 'og:image:width', content: '1200' });
    this.meta.updateTag({ property: 'og:image:height', content: '630' });
    this.meta.updateTag({ property: 'og:image:alt', content: text.imageAlt });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });

    this.removeAll('link[rel="canonical"], link[rel="alternate"][hreflang]');
    this.addLink({ rel: 'canonical', href: url });
    for (const locale of LOCALES) {
      this.addLink({ rel: 'alternate', hreflang: locale, href: localeUrl(locale) });
    }
    this.addLink({ rel: 'alternate', hreflang: 'x-default', href: localeUrl('en') });
  }

  private addLink(attributes: Record<string, string>): void {
    const link = this.document.createElement('link');
    for (const [name, value] of Object.entries(attributes)) link.setAttribute(name, value);
    this.document.head.appendChild(link);
  }

  private removeAll(selector: string): void {
    this.document.head.querySelectorAll(selector).forEach((element) => element.remove());
  }
}
