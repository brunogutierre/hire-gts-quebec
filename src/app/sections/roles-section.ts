import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ROLES } from '../../content/roles';
import { injectLocalized } from '../core/i18n/locale';
import { SectionHeading } from './section-heading';

@Component({
  selector: 'app-roles-section',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'roles-title' },
  template: `
    <app-section-heading [heading]="text" headingId="roles-title" />
    <div class="parties">
      @for (party of [text.employer, text.worker]; track party.title) {
        <section class="party">
          <h3>{{ party.title }}</h3>
          <ul>
            @for (item of party.items; track item) {
              <li>{{ item }}</li>
            }
          </ul>
        </section>
      }
    </div>
    <div class="costs">
      <table>
        <caption>
          {{
            text.costs.title
          }}
        </caption>
        <thead>
          <tr>
            @for (header of text.costs.headers; track header) {
              <th scope="col">{{ header }}</th>
            }
          </tr>
        </thead>
        <tbody>
          @for (row of text.costs.rows; track row[0]) {
            <tr>
              <th scope="row">{{ row[0] }}</th>
              <td class="amount">{{ row[1] }}</td>
              <td>{{ row[2] }}</td>
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: `
    @use 'breakpoints' as *;

    .parties {
      display: grid;
      gap: var(--sp-5);

      @media (min-width: $bp-md) {
        grid-template-columns: 1fr 1fr;
      }
    }

    .party {
      padding: var(--sp-5) var(--sp-6);
      border-radius: var(--r-lg);
      background: var(--surface);
      box-shadow: var(--shadow-1);

      h3 {
        margin-block-end: var(--sp-3);
        font-size: var(--fs-xl);
      }

      ul {
        display: grid;
        gap: var(--sp-3);
        margin: 0;
        padding: 0;
        list-style: none;
      }

      // chevron bullets: the brand motif
      li {
        position: relative;
        padding-inline-start: var(--sp-5);

        &::before {
          content: '';
          position: absolute;
          inset-inline-start: 0;
          inset-block-start: 0.6em;
          inline-size: 10px;
          block-size: 6px;
          background: var(--primary);
          clip-path: polygon(0 0, 25% 0, 50% 50%, 75% 0, 100% 0, 50% 100%);
        }
      }
    }

    .costs {
      margin-block-start: var(--sp-6);
      overflow-x: auto;
    }

    table {
      inline-size: 100%;
      border-collapse: collapse;
    }

    caption {
      margin-block-end: var(--sp-3);
      font: var(--fw-bold) var(--fs-xl) / var(--lh-tight) var(--font-display);
      text-align: start;
    }

    th,
    td {
      padding: var(--sp-3) var(--sp-4);
      border-block-end: 1px solid var(--border);
      text-align: start;
    }

    thead th {
      color: var(--text-muted);
      font: var(--fw-medium) var(--fs-xs) / var(--lh-snug) var(--font-mono);
      letter-spacing: var(--tracking-caps);
      text-transform: uppercase;
    }

    tbody th {
      font-weight: var(--fw-regular);
    }

    .amount {
      font-family: var(--font-mono);
      white-space: nowrap;
    }
  `,
})
export class RolesSection {
  protected readonly text = injectLocalized(ROLES);
}
