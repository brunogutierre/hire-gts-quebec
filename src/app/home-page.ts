import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from './core/seo/seo.service';
import { FaqSection } from './sections/faq-section';
import { HeroSection } from './sections/hero-section';
import { MyCaseSection } from './sections/my-case-section';
import { RolesSection } from './sections/roles-section';
import { SourcesSection } from './sections/sources-section';
import { StepsSection } from './sections/steps-section';
import { WhySection } from './sections/why-section';

/** The whole site: one page made of sections, reached through in-page anchors. */
@Component({
  selector: 'app-home-page',
  imports: [
    HeroSection,
    WhySection,
    StepsSection,
    RolesSection,
    MyCaseSection,
    FaqSection,
    SourcesSection,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <app-hero-section />
    <div class="sections">
      <app-why-section id="why" class="section" role="region" />
      <app-steps-section id="steps" class="section" role="region" />
      <app-roles-section id="roles" class="section" role="region" />
      <app-my-case-section id="my-case" class="section" role="region" />
      <app-faq-section id="faq" class="section" role="region" />
      <app-sources-section id="sources" class="section" role="region" />
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
export class HomePage {
  constructor() {
    // runs while prerendering: the head metadata is part of each static HTML file
    inject(SeoService).apply();
  }
}
