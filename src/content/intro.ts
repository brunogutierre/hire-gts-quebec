import { Localized } from '../app/core/i18n/locale';
import { Fact, Link, SectionHeading } from './types';

export interface HeroText {
  readonly eyebrow: string;
  readonly title: string;
  readonly lead: string;
  readonly primary: Link;
  readonly secondary: Link;
  readonly facts: readonly Fact[];
}

export const HERO: Localized<HeroText> = {
  en: {
    eyebrow: 'Global Talent Stream · Quebec',
    title: 'Hiring a developer on a closed work permit is faster than you think',
    lead: 'A plain guide for Quebec employers: what to file, who does what, and how long it takes to go from offer to first day.',
    primary: { text: 'See the steps', href: '#steps' },
    secondary: { text: 'Contact me', href: '#my-case' },
    facts: [
      { value: '10 business days', label: 'Service standard for a Global Talent Stream LMIA' },
      { value: '10–15 days', label: 'IRCC reply to a request to start the new job' },
      { value: '≈ 4–6 weeks', label: 'From LMIA submission to first day, typically' },
    ],
  },
  'fr-CA': {
    eyebrow: 'Volet des talents mondiaux · Québec',
    title: 'Embaucher un développeur au permis fermé, c’est plus rapide que vous ne le pensez',
    lead: 'Un guide simple pour les employeurs québécois : quoi déposer, qui fait quoi et combien de temps il faut entre l’offre et la première journée.',
    primary: { text: 'Voir les étapes', href: '#steps' },
    secondary: { text: 'Me joindre', href: '#my-case' },
    facts: [
      {
        value: '10 jours ouvrables',
        label: 'Norme de service d’une EIMT du Volet des talents mondiaux',
      },
      {
        value: '10 à 15 jours',
        label: 'Réponse d’IRCC à une demande pour commencer le nouvel emploi',
      },
      { value: '≈ 4 à 6 semaines', label: 'Du dépôt de l’EIMT à la première journée, en général' },
    ],
  },
};

export interface WhyText extends SectionHeading {
  readonly items: readonly { readonly title: string; readonly text: string }[];
}

export const WHY: Localized<WhyText> = {
  en: {
    eyebrow: '01 / why',
    title: 'Why hire someone who is already here on a closed permit',
    intro:
      'A closed (employer-specific) work permit names one employer. Changing jobs takes a new permit, which keeps many companies from even trying. The candidates behind that paperwork are often the ones worth the effort.',
    items: [
      {
        title: 'Already vetted',
        text: 'Another Quebec employer already recruited, interviewed and hired this person, and the governments of Canada and Quebec approved that hire. Their skills were proven on the job, not just promised in a résumé.',
      },
      {
        title: 'Already settled in Quebec',
        text: 'No relocation, no visa interview abroad, no time zone gap. They know how Quebec workplaces run, already have their biometrics on file and can be at your office next week.',
      },
      {
        title: 'Loyal by choice',
        text: 'Someone who goes through this process chose your company on purpose and knows what it took. People who feel that investment tend to stay and grow with the team.',
      },
      {
        title: 'Eager to prove it',
        text: 'Dedication comes naturally when you want to show the hire was the right call. Expect someone who wants to deliver from day one.',
      },
    ],
  },
  'fr-CA': {
    eyebrow: '01 / pourquoi',
    title: 'Pourquoi embaucher une personne déjà ici avec un permis fermé',
    intro:
      'Un permis de travail fermé (lié à un employeur) nomme un seul employeur. Changer d’emploi exige un nouveau permis, ce qui décourage bien des entreprises. Pourtant, les candidats derrière ces formalités valent souvent l’effort.',
    items: [
      {
        title: 'Déjà évalué',
        text: 'Un autre employeur québécois a déjà recruté, rencontré en entrevue et embauché cette personne, et les gouvernements du Canada et du Québec ont approuvé cette embauche. Ses compétences ont été prouvées au travail, pas seulement promises dans un CV.',
      },
      {
        title: 'Déjà installé au Québec',
        text: 'Aucune relocalisation, aucune entrevue de visa à l’étranger, aucun décalage horaire. Cette personne connaît les milieux de travail québécois, a déjà fourni ses données biométriques et peut être à vos bureaux la semaine prochaine.',
      },
      {
        title: 'Fidèle par choix',
        text: 'Une personne qui passe par ce processus a choisi votre entreprise délibérément et sait ce que ça représente. Quand on sent cet investissement, on a tendance à rester et à grandir avec l’équipe.',
      },
      {
        title: 'Motivé à faire ses preuves',
        text: 'Le dévouement vient naturellement quand on veut montrer que l’embauche était le bon choix. Attendez-vous à quelqu’un qui veut livrer dès la première journée.',
      },
    ],
  },
};
