import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SHELL } from '../content/site';
import { CURRENT_LOCALE } from './core/i18n/locale';
import { SiteFooter } from './layout/site-footer';
import { SiteHeader } from './layout/site-header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SiteHeader, SiteFooter],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <a class="skip-link" href="#main" (click)="skipToMain($event)">{{ text.skip }}</a>
    <app-site-header id="top" />
    <main id="main" tabindex="-1" #main>
      <router-outlet />
    </main>
    <app-site-footer />
  `,
})
export class App {
  protected readonly text = SHELL[inject(CURRENT_LOCALE)];
  private readonly main = viewChild.required<ElementRef<HTMLElement>>('main');

  /** Without JavaScript the link jumps to #main; with it, focus moves into the content too. */
  protected skipToMain(event: Event): void {
    event.preventDefault();
    this.main().nativeElement.focus();
  }
}
