import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { SectionHeading as Heading } from '../../content/types';
import { Icon } from '../shared/icon/icon';

/** Eyebrow, h2 and optional intro of a section; the h2 id labels the section. */
@Component({
  selector: 'app-section-heading',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <p class="eyebrow"><app-icon name="chevron" />{{ heading().eyebrow }}</p>
    <h2 [id]="headingId()">{{ heading().title }}</h2>
    @if (heading().intro; as intro) {
      <p class="lead">{{ intro }}</p>
    }
  `,
  styles: `
    :host {
      display: grid;
      gap: var(--sp-3);
      margin-block-end: var(--sp-6);
    }

    h2 {
      font-size: var(--fs-2xl);
    }
  `,
})
export class SectionHeading {
  readonly heading = input.required<Heading>();
  readonly headingId = input.required<string>();
}
