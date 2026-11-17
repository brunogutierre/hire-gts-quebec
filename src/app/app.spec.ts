import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { App } from './app';
import { routes } from './app.routes';

async function render(locale = 'en') {
  TestBed.configureTestingModule({
    providers: [provideRouter(routes), { provide: LOCALE_ID, useValue: locale }],
  });
  const fixture = TestBed.createComponent(App);
  await TestBed.inject(Router).navigateByUrl('/');
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('App shell', () => {
  it('renders the header, the page and the footer', async () => {
    const root = await render();

    expect(root.querySelector('.brand-name')?.textContent).toBe('Hire in Quebec');
    const nav = [...root.querySelectorAll('header nav[aria-label="Sections"] a')];
    expect(nav.map((a) => a.getAttribute('href'))).toEqual([
      '#steps',
      '#roles',
      '#faq',
      '#my-case',
    ]);
    expect(root.querySelector('main h1')).not.toBeNull();
    expect(root.querySelector('footer a[href="mailto:brunorg@gmail.com"]')).not.toBeNull();
  });

  it('links each language under the project path and marks the current one', async () => {
    const root = await render('fr-CA');
    const links = [...root.querySelectorAll<HTMLAnchorElement>('nav[aria-label="Langues"] a')];

    expect(links.map((a) => a.getAttribute('href'))).toEqual([
      '/hire-gts-quebec/',
      '/hire-gts-quebec/fr/',
    ]);
    expect(links.map((a) => a.getAttribute('aria-current'))).toEqual([null, 'true']);
    expect(root.querySelector('.skip-link')?.textContent).toBe('Aller au contenu');
  });

  it('moves focus to the content from the skip link', async () => {
    const root = await render();
    root.querySelector<HTMLAnchorElement>('.skip-link')?.click();
    expect(document.activeElement).toBe(root.querySelector('main'));
  });
});
