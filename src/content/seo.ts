import { Localized } from '../app/core/i18n/locale';

export interface SeoText {
  readonly title: string;
  readonly description: string;
  /** Text of the link preview image (public/og/<locale>.jpg). */
  readonly imageAlt: string;
}

export const SEO: Localized<SeoText> = {
  en: {
    title: 'Hire a closed-permit developer in Quebec · Global Talent Stream guide',
    description:
      'How Quebec employers hire a software developer already in Quebec on a closed work permit: the Global Talent Stream steps, who does what, costs and timelines. Start in about 4 to 6 weeks.',
    imageAlt:
      'Hiring a developer on a closed work permit is faster than you think: a Global Talent Stream guide for Quebec employers.',
  },
  'fr-CA': {
    title:
      'Embaucher un développeur au permis fermé au Québec · Guide du Volet des talents mondiaux',
    description:
      'Comment un employeur québécois embauche un développeur déjà au Québec avec un permis de travail fermé : étapes du Volet des talents mondiaux, qui fait quoi, coûts et délais. Une entrée en poste en 4 à 6 semaines environ.',
    imageAlt:
      'Embaucher un développeur au permis fermé, c’est plus rapide que vous ne le pensez : un guide du Volet des talents mondiaux pour les employeurs québécois.',
  },
};
