import { formatDate } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, LOCALE_ID } from '@angular/core';
import { LAST_VERIFIED, SOURCES } from '../../content/sources';
import { injectLocalized } from '../core/i18n/locale';
import { Icon } from '../shared/icon/icon';
import { SectionHeading } from './section-heading';

@Component({
  selector: 'app-sources-section',
  imports: [Icon, SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'sources-title' },
  template: `
    <app-section-heading [heading]="text" headingId="sources-title" />
    <p class="verified">
      {{ text.lastVerified }}
      <time [attr.datetime]="lastVerified">{{ verifiedLabel }}</time>
    </p>
    <ul class="links">
      @for (link of text.links; track link.href) {
        <li>
          <span class="publisher">{{ link.publisher }}</span>
          <a [href]="link.href">{{ link.text }}<app-icon name="external-link" /></a>
        </li>
      }
    </ul>
    <p class="disclaimer">{{ text.disclaimer }}</p>
  `,
  styles: `
    .verified {
      margin: 0 0 var(--sp-4);
      font: var(--fs-sm) / var(--lh-snug) var(--font-mono);
      color: var(--text-muted);
    }

    .links {
      display: grid;
      gap: var(--sp-2);
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: flex;
        align-items: baseline;
        gap: var(--sp-3);
      }

      a {
        --icon-size: 14px;

        app-icon {
          margin-inline-start: var(--sp-1);
          vertical-align: -1px;
        }
      }
    }

    .publisher {
      flex: none;
      inline-size: 4.5ch;
      color: var(--text-muted);
      font: var(--fw-medium) var(--fs-xs) / var(--lh-snug) var(--font-mono);
    }

    .disclaimer {
      max-inline-size: 70ch;
      margin: var(--sp-6) 0 0;
      padding: var(--sp-4) var(--sp-5);
      border-inline-start: 4px solid var(--accent);
      border-radius: var(--r-sm);
      background: var(--surface-2);
    }
  `,
})
export class SourcesSection {
  protected readonly text = injectLocalized(SOURCES);
  protected readonly lastVerified = LAST_VERIFIED;
  protected readonly verifiedLabel = formatDate(
    LAST_VERIFIED,
    'longDate',
    inject(LOCALE_ID),
    'UTC',
  );
}
