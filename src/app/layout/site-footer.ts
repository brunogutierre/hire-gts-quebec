import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { OWNER, SHELL } from '../../content/site';
import { CURRENT_LOCALE } from '../core/i18n/locale';
import { Icon } from '../shared/icon/icon';

@Component({
  selector: 'app-site-footer',
  imports: [Icon],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="site-footer">
      <div class="about">
        <p class="copyright">
          <span class="brand-mark" aria-hidden="true"><app-icon name="chevron" /></span>
          © {{ year }} <a [href]="owner.site">{{ owner.name }}</a>
        </p>
        <p class="note">{{ text.footerNote }}</p>
      </div>
      <ul class="links">
        <li>
          <a [href]="owner.github"><app-icon name="github" />GitHub</a>
        </li>
        <li>
          <a [href]="owner.linkedin"><app-icon name="linkedin" />LinkedIn</a>
        </li>
        <li>
          <a [href]="'mailto:' + owner.email"><app-icon name="mail" />{{ text.email }}</a>
        </li>
      </ul>
    </footer>
  `,
  styles: `
    :host {
      display: block;
      padding-block-start: 3px;
      background: linear-gradient(90deg, var(--hero-1), var(--hero-2) 60%, var(--hero-3)) top / 100%
        3px no-repeat;
    }

    .site-footer {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      justify-content: space-between;
      gap: var(--sp-4);
      inline-size: min(100% - 2 * var(--page-pad), var(--content-max));
      margin-inline: auto;
      padding-block: var(--sp-7);
    }

    .about {
      display: grid;
      gap: var(--sp-2);
    }

    .copyright,
    .note {
      margin: 0;
      color: var(--text-muted);
      font: var(--fs-sm) / var(--lh-snug) var(--font-mono);
    }

    .copyright {
      display: flex;
      align-items: center;
      gap: var(--sp-2);

      a {
        color: inherit;
      }
    }

    .brand-mark {
      inline-size: 20px;
      block-size: 20px;

      app-icon {
        --icon-size: 14px;
      }
    }

    .links {
      display: flex;
      flex-wrap: wrap;
      gap: var(--sp-1);
      margin: 0 calc(-1 * var(--sp-3)); // link labels line up with the content edges
      padding: 0;
      list-style: none;

      a {
        display: inline-flex;
        align-items: center;
        gap: var(--sp-2);
        min-block-size: var(--target);
        padding-inline: var(--sp-3);
        border-radius: var(--r-sm);
        color: var(--text-muted);
        text-decoration: none;
        --icon-size: 18px;

        &:hover {
          background: var(--surface-2);
          color: var(--text);
        }
      }
    }
  `,
})
export class SiteFooter {
  protected readonly owner = OWNER;
  protected readonly text = SHELL[inject(CURRENT_LOCALE)];
  protected readonly year = new Date().getFullYear();
}
