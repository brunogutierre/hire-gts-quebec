import { ChangeDetectionStrategy, Component } from '@angular/core';
import { HERO } from '../../content/intro';
import { injectLocalized } from '../core/i18n/locale';
import { Icon } from '../shared/icon/icon';

/** Gradient band with the promise of the page, then the three numbers that back it. */
@Component({
  selector: 'app-hero-section',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="hero">
      <div class="hero-content">
        <p class="hero-eyebrow">{{ text.eyebrow }}</p>
        <h1>{{ text.title }}</h1>
        <p class="hero-lead">{{ text.lead }}</p>
        <div class="hero-actions">
          <a class="btn btn--on-hero" [href]="text.primary.href"
            >{{ text.primary.text }}<app-icon name="arrow-right"
          /></a>
          <a class="btn btn--on-hero-ghost" [href]="text.secondary.href">{{
            text.secondary.text
          }}</a>
        </div>
      </div>
    </div>
    <ul class="facts">
      @for (fact of text.facts; track fact.value) {
        <li>
          <strong>{{ fact.value }}</strong>
          <span>{{ fact.label }}</span>
        </li>
      }
    </ul>
  `,
  styles: `
    @use 'breakpoints' as *;

    :host {
      display: block;
    }

    // Full-bleed gradient band; white text only over its teal-to-green part.
    .hero {
      position: relative;
      isolation: isolate;
      color: var(--on-hero);
      --focus-ring: var(--hero-focus-ring);
      --edge: max(var(--page-pad), (100% - var(--content-max)) / 2);
      --notch-x: calc(var(--edge) + var(--notch-w));
      padding-block: clamp(3rem, 2rem + 5vw, 6rem) calc(var(--notch-d) + var(--sp-8));

      &::before {
        content: '';
        position: absolute;
        inset: 0;
        z-index: -1;
        background: linear-gradient(
          var(--hero-angle),
          var(--hero-3) 0,
          var(--hero-2) calc(var(--notch-d) + var(--sp-8)),
          var(--hero-1) 100%
        );
        // straight bottom edge with a chevron tab pointing down at the facts
        clip-path: polygon(
          0 0,
          100% 0,
          100% calc(100% - var(--notch-d)),
          calc(var(--notch-x) + var(--notch-w)) calc(100% - var(--notch-d)),
          var(--notch-x) 100%,
          calc(var(--notch-x) - var(--notch-w)) calc(100% - var(--notch-d)),
          0 calc(100% - var(--notch-d))
        );
      }
    }

    @media (prefers-reduced-motion: no-preference) {
      .hero::before {
        animation: hero-drift var(--hero-drift) var(--ease-in-out) infinite alternate;
      }
    }

    @keyframes hero-drift {
      to {
        --hero-angle: 335deg;
      }
    }

    .hero-content,
    .facts {
      inline-size: min(100% - 2 * var(--page-pad), var(--content-max));
      margin-inline: auto;
    }

    .hero-eyebrow {
      margin: 0 0 var(--sp-4);
      font: var(--fw-medium) var(--fs-sm) / var(--lh-snug) var(--font-mono);
      letter-spacing: var(--tracking-caps);
      text-transform: uppercase;
    }

    h1 {
      max-inline-size: 20ch;
      font-size: var(--fs-3xl);
      font-weight: var(--fw-black);
      line-height: var(--lh-tight);
      letter-spacing: var(--tracking-display);
    }

    .hero-lead {
      max-inline-size: 52ch;
      margin: var(--sp-5) 0 0;
      font-size: var(--fs-xl);
      line-height: var(--lh-snug);
    }

    .hero-actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-3);
      margin-block-start: var(--sp-6);

      app-icon {
        --icon-size: 18px;
      }
    }

    .facts {
      display: grid;
      gap: var(--sp-5);
      margin-block: var(--sp-7) 0;
      padding: 0;
      list-style: none;

      @media (min-width: $bp-md) {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }

      li {
        display: grid;
        gap: var(--sp-1);
        padding-block-start: var(--sp-4);
        border-block-start: 2px solid var(--border);
        color: var(--text-muted);
      }

      strong {
        color: var(--primary);
        font: var(--fw-black) var(--fs-2xl) / 1.1 var(--font-display);
        letter-spacing: var(--tracking-tight);
      }
    }
  `,
})
export class HeroSection {
  protected readonly text = injectLocalized(HERO);
}
