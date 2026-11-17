import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SHELL } from '../../content/site';
import { CURRENT_LOCALE } from '../core/i18n/locale';
import { Icon } from '../shared/icon/icon';
import { LanguageSwitcher } from './language-switcher';

/**
 * Below 900px: two rows (brand and languages, then the section links), no hamburger menu.
 * From 900px: a single sticky row. Links are in-page anchors: the page URL is its base href.
 */
@Component({
  selector: 'app-site-header',
  imports: [Icon, LanguageSwitcher],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <header class="site-header">
      <a class="brand" href="#top">
        <span class="brand-mark" aria-hidden="true"><app-icon name="chevron" /></span>
        <span class="brand-name">{{ text.brand }}</span>
      </a>
      <nav class="main-nav" [attr.aria-label]="text.navLabel">
        <ul>
          @for (link of text.nav; track link.id) {
            <li>
              <a [href]="'#' + link.id">{{ link.label }}</a>
            </li>
          }
        </ul>
      </nav>
      <div class="tools">
        <app-language-switcher />
      </div>
    </header>
  `,
  styleUrl: './site-header.scss',
})
export class SiteHeader {
  protected readonly text = SHELL[inject(CURRENT_LOCALE)];
}
