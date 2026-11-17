import { ChangeDetectionStrategy, Component } from '@angular/core';
import { STEPS } from '../../content/steps';
import { injectLocalized } from '../core/i18n/locale';
import { SectionHeading } from './section-heading';

/** An ordered timeline: who acts, how long it takes, what to know. */
@Component({
  selector: 'app-steps-section',
  imports: [SectionHeading],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'steps-title' },
  template: `
    <app-section-heading [heading]="text" headingId="steps-title" />
    <ol class="timeline">
      @for (step of text.steps; track step.title) {
        <li [class]="'step step--' + step.who">
          <div class="meta">
            <span class="who">{{ text.parties[step.who] }}</span>
            <span class="duration">{{ step.duration }}</span>
          </div>
          <h3>{{ step.title }}</h3>
          <p>{{ step.text }}</p>
          @if (step.details.length) {
            <ul class="details">
              @for (detail of step.details; track detail) {
                <li>{{ detail }}</li>
              }
            </ul>
          }
        </li>
      }
    </ol>
    <aside class="total">
      <strong>{{ text.total.value }}</strong>
      <span class="total-label">{{ text.total.label }}</span>
      <span class="total-note">{{ text.total.note }}</span>
    </aside>
  `,
  styles: `
    .timeline {
      display: grid;
      gap: var(--sp-6);
      margin: 0;
      padding: 0;
      list-style: none;
      counter-reset: step;
    }

    // Numbered chevron markers on a vertical rail
    .step {
      position: relative;
      display: grid;
      gap: var(--sp-2);
      padding-inline-start: calc(var(--sp-8) - var(--sp-2));
      counter-increment: step;

      &::before {
        content: counter(step);
        position: absolute;
        inset-inline-start: 0;
        inset-block-start: 0;
        display: grid;
        place-items: center;
        inline-size: 40px;
        block-size: 40px;
        border-radius: var(--r-sm);
        background: var(--primary-tint);
        color: var(--primary);
        font: var(--fw-bold) var(--fs-lg) / 1 var(--font-mono);
      }

      &:not(:last-child)::after {
        content: '';
        position: absolute;
        inset-inline-start: 19px;
        inset-block: 48px calc(-1 * var(--sp-6) + var(--sp-2));
        border-inline-start: 2px dashed var(--border-strong);
      }

      &:last-child::before {
        background: var(--accent);
        color: var(--on-accent);
      }

      h3 {
        font-size: var(--fs-xl);
      }

      p {
        margin: 0;
        max-inline-size: 70ch;
      }
    }

    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-2);
      font: var(--fw-medium) var(--fs-xs) / var(--lh-snug) var(--font-mono);
      letter-spacing: var(--tracking-caps);
      text-transform: uppercase;

      span {
        padding: var(--sp-1) var(--sp-3);
        border-radius: var(--r-full);
      }
    }

    .who {
      border: 1px solid var(--border-strong);
      color: var(--text-muted);
    }

    .duration {
      background: var(--primary-tint);
      color: var(--primary);
    }

    .details {
      display: grid;
      gap: var(--sp-1);
      margin: var(--sp-1) 0 0;
      padding-inline-start: var(--sp-5);
      max-inline-size: 70ch;
      color: var(--text-muted);
    }

    .total {
      display: grid;
      gap: var(--sp-1);
      margin-block-start: var(--sp-7);
      padding: var(--sp-5) var(--sp-6);
      border-radius: var(--r-lg);
      background: linear-gradient(120deg, var(--hero-1), var(--hero-2));
      color: var(--on-hero);

      strong {
        font: var(--fw-black) var(--fs-3xl) / 1 var(--font-display);
        letter-spacing: var(--tracking-tight);
      }
    }

    .total-label {
      font-size: var(--fs-lg);
      font-weight: var(--fw-semibold);
    }

    .total-note {
      font-size: var(--fs-sm);
    }
  `,
})
export class StepsSection {
  protected readonly text = injectLocalized(STEPS);
}
