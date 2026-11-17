import { registerLocaleData } from '@angular/common';
import localeFrCa from '@angular/common/locales/fr-CA';
import { LOCALE_ID } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { SECTION_IDS } from '../content/site';
import { HomePage } from './home-page';

function render(locale = 'en') {
  TestBed.configureTestingModule({ providers: [{ provide: LOCALE_ID, useValue: locale }] });
  const fixture = TestBed.createComponent(HomePage);
  fixture.detectChanges();
  return fixture.nativeElement as HTMLElement;
}

// The French build gets its locale data from @angular/localize; unit tests register it.
registerLocaleData(localeFrCa);

describe('HomePage', () => {
  it('has one h1 and a labelled region for every section, in page order', () => {
    const root = render();
    const regions = [...root.querySelectorAll('[role="region"]')];

    expect(root.querySelectorAll('h1')).toHaveLength(1);
    expect(regions.map((region) => region.id)).toEqual([...SECTION_IDS]);
    for (const region of regions) {
      const label = root.querySelector(`#${region.getAttribute('aria-labelledby')}`);
      expect(label?.tagName, region.id).toBe('H2');
    }
  });

  it('numbers the steps and tells who acts on each', () => {
    const steps = [...render().querySelectorAll('.timeline > li')];
    expect(steps).toHaveLength(5);
    expect(steps[0].querySelector('.who')?.textContent).toBe('Employer');
    expect(steps[3].textContent).toContain('PPCHANGEWORK2020');
  });

  it('renders the FAQ as closed native disclosures', () => {
    const details = render().querySelectorAll('#faq details');
    expect(details.length).toBeGreaterThan(5);
    expect([...details].some((item) => item.hasAttribute('open'))).toBe(false);
  });

  it('shows the French text, code and date in the French build', () => {
    const root = render('fr-CA');
    expect(root.querySelector('h1')?.textContent).toContain('permis fermé');
    expect(root.querySelector('#steps')?.textContent).toContain('PPCHANGEREMPLOI2020');
    expect(root.querySelector('#sources time')?.textContent).toBe('16 novembre 2026');
  });

  it('formats the last-verified date for English readers', () => {
    expect(render().querySelector('#sources time')?.textContent).toBe('November 16, 2026');
  });

  it('offers e-mail as the main way to get in touch', () => {
    const cta = render().querySelector<HTMLAnchorElement>('#my-case .btn--primary');
    expect(cta?.getAttribute('href')).toBe('mailto:brunorg@gmail.com');
  });
});
