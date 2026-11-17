import { Localized } from '../app/core/i18n/locale';

/** The developer this guide was written by, shown in "My case" and the footer. */
export const OWNER = {
  name: 'Bruno Gutierre',
  site: 'https://brunogutierre.github.io/',
  github: 'https://github.com/brunogutierre',
  linkedin: 'https://www.linkedin.com/in/bruno-gutierre/',
  email: 'brunorg@gmail.com',
} as const;

/** In-page sections, in page order: the header navigation links to some of them. */
export const SECTION_IDS = ['why', 'steps', 'roles', 'my-case', 'faq', 'sources'] as const;
export type SectionId = (typeof SECTION_IDS)[number];

export interface ShellText {
  readonly brand: string;
  readonly skip: string;
  readonly navLabel: string;
  readonly languagesLabel: string;
  readonly nav: readonly { readonly id: SectionId; readonly label: string }[];
  readonly email: string;
  readonly footerNote: string;
}

export const SHELL: Localized<ShellText> = {
  en: {
    brand: 'Hire in Quebec',
    skip: 'Skip to content',
    navLabel: 'Sections',
    languagesLabel: 'Languages',
    nav: [
      { id: 'steps', label: 'Steps' },
      { id: 'roles', label: 'Who does what' },
      { id: 'faq', label: 'FAQ' },
      { id: 'my-case', label: 'Contact' },
    ],
    email: 'E-mail',
    footerNote: 'General information, not legal advice.',
  },
  'fr-CA': {
    brand: 'Embaucher au Québec',
    skip: 'Aller au contenu',
    navLabel: 'Sections',
    languagesLabel: 'Langues',
    nav: [
      { id: 'steps', label: 'Étapes' },
      { id: 'roles', label: 'Qui fait quoi' },
      { id: 'faq', label: 'FAQ' },
      { id: 'my-case', label: 'Contact' },
    ],
    email: 'Courriel',
    footerNote: 'Information générale, et non un avis juridique.',
  },
};
