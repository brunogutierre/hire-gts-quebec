import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FAQ } from '../../content/faq';
import { injectLocalized } from '../core/i18n/locale';
import { SectionHeading } from './section-heading';

/** Native <details>: keyboard and screen reader support without JavaScript. */
@Component({
  selector: 'app-faq-section',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'faq-title' },
  template: `
    <app-section-heading [heading]="text" headingId="faq-title" />
    <div class="faq">
      @for (item of text.items; track item.question) {
        <details>
          <summary>
            <h3>{{ item.question }}</h3>
          </summary>
          <p>{{ item.answer }}</p>
        </details>
      }
    </div>
  `,
  styles: `
    .faq {
      display: grid;
      gap: var(--sp-3);
    }

    details {
      border-radius: var(--r-md);
      background: var(--surface);
      box-shadow: var(--shadow-1);
    }

    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--sp-4);
      min-block-size: var(--target);
      padding: var(--sp-4) var(--sp-5);
      border-radius: var(--r-md);
      cursor: pointer;
      list-style: none;

      &::-webkit-details-marker {
        display: none;
      }

      // chevron that turns when the answer is open
      &::after {
        content: '';
        flex: none;
        inline-size: 14px;
        block-size: 8px;
        background: var(--primary);
        clip-path: polygon(0 0, 25% 0, 50% 50%, 75% 0, 100% 0, 50% 100%);
        transition: rotate var(--dur-2) var(--ease-out);
      }

      &:hover {
        background: var(--surface-2);
      }
    }

    details[open] summary::after {
      rotate: 180deg;
    }

    h3 {
      font: var(--fw-semibold) var(--fs-lg) / var(--lh-snug) var(--font-ui);
      letter-spacing: normal;
    }

    p {
      max-inline-size: 70ch;
      margin: 0;
      padding: 0 var(--sp-5) var(--sp-5);
      color: var(--text-muted);
    }
  `,
})
export class FaqSection {
  protected readonly text = injectLocalized(FAQ);
}
