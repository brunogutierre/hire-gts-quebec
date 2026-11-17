import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SHELL } from '../../content/site';
import { CURRENT_LOCALE, LOCALE_INFO, LOCALES, localeUrl } from '../core/i18n/locale';

/**
 * Links to the page in every language. Each language is a separate build, so these are plain
 * links (a full page load) with the path under the project, never the origin root.
 */
@Component({
  selector: 'app-language-switcher',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="languages" [attr.aria-label]="label">
      <ul>
        @for (option of options; track option.locale) {
          <li>
            <a
              [href]="option.href"
              [attr.hreflang]="option.locale"
              [attr.lang]="option.locale"
              [attr.aria-current]="option.current ? 'true' : null"
              >{{ option.short }}<span class="visually-hidden"> {{ option.name }}</span></a
            >
          </li>
        }
      </ul>
    </nav>
  `,
  styles: `
    ul {
      display: flex;
      margin: 0;
      padding: 0;
      border: 1px solid var(--border);
      border-radius: var(--r-sm);
      list-style: none;
      overflow: hidden;
    }

    a {
      display: grid;
      place-items: center;
      inline-size: var(--target);
      block-size: 42px;
      color: var(--text-muted);
      font: var(--fw-medium) var(--fs-sm) / 1 var(--font-mono);
      text-decoration: none;
      outline-offset: -3px; // the group clips its corners: keep the focus ring inside

      &:hover {
        background: var(--surface-2);
        color: var(--text);
      }

      &[aria-current] {
        background: var(--primary-tint);
        color: var(--primary);
      }
    }
  `,
})
export class LanguageSwitcher {
  private readonly current = inject(CURRENT_LOCALE);
  protected readonly label = SHELL[this.current].languagesLabel;

  protected readonly options = LOCALES.map((locale) => ({
    locale,
    short: LOCALE_INFO[locale].short,
    name: LOCALE_INFO[locale].name,
    // path only: the same build works on a local server and on GitHub Pages
    href: new URL(localeUrl(locale)).pathname,
    current: locale === this.current,
  }));
}
