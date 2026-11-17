import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HeroSection } from './sections/hero-section';
import { StepsSection } from './sections/steps-section';
import { WhySection } from './sections/why-section';

/** The whole site: one page made of sections, reached through in-page anchors. */
@Component({
  selector: 'app-home-page',
  imports: [HeroSection, WhySection, StepsSection],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />
    <div class="sections">
      <app-why-section id="why" class="section" role="region" />
      <app-steps-section id="steps" class="section" role="region" />
    </div>
  `,
  styles: `
    :host {
      display: block;
    }

    .sections {
      display: grid;
      gap: var(--sp-9);
      inline-size: min(100% - 2 * var(--page-pad), var(--content-max));
      margin-inline: auto;
      padding-block: var(--sp-9);
    }

    .section {
      display: block;
    }
  `,
})
export class HomePage {}
