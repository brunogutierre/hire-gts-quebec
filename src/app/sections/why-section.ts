import { ChangeDetectionStrategy, Component } from '@angular/core';
import { WHY } from '../../content/intro';
import { injectLocalized } from '../core/i18n/locale';
import { SectionHeading } from './section-heading';

@Component({
  selector: 'app-why-section',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'why-title' },
  template: `
    <app-section-heading [heading]="text" headingId="why-title" />
    <ul class="reasons">
      @for (item of text.items; track item.title) {
        <li>
          <h3>{{ item.title }}</h3>
          <p>{{ item.text }}</p>
        </li>
      }
    </ul>
  `,
  styles: `
    .reasons {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 15rem), 1fr));
      gap: var(--sp-5);
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: grid;
        align-content: start;
        gap: var(--sp-2);
        padding: var(--sp-5);
        border-radius: var(--r-lg);
        background: var(--surface);
        box-shadow: var(--shadow-1);
        border-block-start: 4px solid var(--primary);
      }

      h3 {
        font-size: var(--fs-xl);
      }

      p {
        margin: 0;
        color: var(--text-muted);
      }
    }
  `,
})
export class WhySection {
  protected readonly text = injectLocalized(WHY);
}
