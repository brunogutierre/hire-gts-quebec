import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MY_CASE } from '../../content/my-case';
import { OWNER } from '../../content/site';
import { injectLocalized } from '../core/i18n/locale';
import { Icon } from '../shared/icon/icon';

/** The owner's own situation and how to reach him: the call to action of the page. */
@Component({
  selector: 'app-my-case-section',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'aria-labelledby': 'my-case-title' },
  template: `
    <div class="card">
      <img
        class="photo"
        src="/hire-gts-quebec/images/bruno-gutierre-240.webp"
        srcset="
          /hire-gts-quebec/images/bruno-gutierre-240.webp 240w,
          /hire-gts-quebec/images/bruno-gutierre-480.webp 480w
        "
        sizes="160px"
        width="160"
        height="160"
        [alt]="text.photoAlt"
        loading="lazy"
      />
      <div class="intro">
        <p class="eyebrow"><app-icon name="chevron" />{{ text.eyebrow }}</p>
        <h2 id="my-case-title">{{ text.title }}</h2>
        <p class="lead">{{ text.intro }}</p>
      </div>
      <ul class="facts">
        @for (fact of text.facts; track fact.value) {
          <li>
            <strong>{{ fact.value }}</strong>
            <span>{{ fact.label }}</span>
          </li>
        }
      </ul>
      <div class="body">
        @for (paragraph of text.paragraphs; track paragraph) {
          <p>{{ paragraph }}</p>
        }
      </div>
      <div class="actions">
        <a class="btn btn--primary" [href]="'mailto:' + owner.email"
          ><app-icon name="mail" />{{ text.email }}</a
        >
        <a class="btn btn--ghost" [href]="owner.site">{{ text.site }}</a>
        <a class="btn btn--ghost" [href]="owner.linkedin"><app-icon name="linkedin" />LinkedIn</a>
      </div>
    </div>
  `,
  styles: `
    @use 'breakpoints' as *;

    .card {
      display: grid;
      gap: var(--sp-5);
      padding: clamp(var(--sp-5), 4vw, var(--sp-7));
      border: 2px solid var(--primary);
      border-radius: var(--r-xl);
      background: var(--surface);
      box-shadow: var(--shadow-2);

      @media (min-width: $bp-md) {
        grid-template-columns: auto 1fr;
        column-gap: var(--sp-6);

        .facts,
        .body,
        .actions {
          grid-column: 2;
        }
      }
    }

    .photo {
      inline-size: 120px;
      block-size: 120px;
      border-radius: 50%;
      object-fit: cover;
      background: var(--surface-2);

      @media (min-width: $bp-md) {
        inline-size: 160px;
        block-size: 160px;
      }
    }

    .intro {
      display: grid;
      align-content: center;
      gap: var(--sp-3);

      h2 {
        font-size: var(--fs-2xl);
      }
    }

    .facts {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
      gap: var(--sp-4);
      margin: 0;
      padding: 0;
      list-style: none;

      li {
        display: grid;
        gap: var(--sp-1);
        padding-block-start: var(--sp-3);
        border-block-start: 2px solid var(--border);
        color: var(--text-muted);
        font-size: var(--fs-sm);
      }

      strong {
        color: var(--primary);
        font: var(--fw-black) var(--fs-xl) / 1.1 var(--font-display);
      }
    }

    .body {
      display: grid;
      gap: var(--sp-3);
      max-inline-size: 65ch;

      p {
        margin: 0;
        font-size: var(--fs-lg);
      }
    }

    .actions {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-3);
      --icon-size: 18px;
    }
  `,
})
export class MyCaseSection {
  protected readonly text = injectLocalized(MY_CASE);
  protected readonly owner = OWNER;
}
