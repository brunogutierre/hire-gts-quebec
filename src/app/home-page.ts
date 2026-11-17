import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CURRENT_LOCALE, Localized } from './core/i18n/locale';

const TITLE: Localized<string> = {
  en: 'Hire a closed-permit developer in Quebec',
  'fr-CA': 'Embaucher un développeur au permis fermé au Québec',
};

/** The whole site: one page made of sections, reached through in-page anchors. */
@Component({
  selector: 'app-home-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<h1>{{ title }}</h1>`,
})
export class HomePage {
  protected readonly title = TITLE[inject(CURRENT_LOCALE)];
}
