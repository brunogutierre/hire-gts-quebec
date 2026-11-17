import { Localized } from '../app/core/i18n/locale';
import { Fact, SectionHeading } from './types';

export interface MyCaseText extends SectionHeading {
  readonly photoAlt: string;
  readonly facts: readonly Fact[];
  readonly paragraphs: readonly string[];
  readonly email: string;
  readonly site: string;
}

export const MY_CASE: Localized<MyCaseText> = {
  en: {
    eyebrow: '04 / my case',
    title: 'Ready to start about 2 weeks after the approvals',
    intro:
      'I’m Bruno Gutierre, a senior software developer in Montréal, and I wrote this guide because I’m in exactly this situation.',
    photoAlt: 'Portrait of Bruno Gutierre',
    facts: [
      { value: '18 years', label: 'in software development, 3.5 of them in Quebec' },
      { value: 'NOC 21234', label: 'Web developers and programmers, on the Category B list' },
      { value: 'March 2028', label: 'Current work permit valid until' },
      { value: 'Done', label: 'Selected by Quebec before (CAQ), biometrics on file' },
    ],
    paragraphs: [
      'My documents for the Quebec selection request are ready, so it can go in with your LMIA right away.',
      'Once the LMIA and the CAQ are approved, I apply for the new work permit and send the request to start the same day. IRCC aims to reply in 10 to 15 days, so I can be at work about 2 weeks after the approvals.',
    ],
    email: 'Write to me',
    site: 'My site and résumé',
  },
  'fr-CA': {
    eyebrow: '04 / mon cas',
    title: 'Prêt à commencer environ 2 semaines après les approbations',
    intro:
      'Je suis Bruno Gutierre, développeur logiciel principal à Montréal, et j’ai écrit ce guide parce que je suis exactement dans cette situation.',
    photoAlt: 'Portrait de Bruno Gutierre',
    facts: [
      { value: '18 ans', label: 'en développement logiciel, dont 3,5 au Québec' },
      {
        value: 'CNP 21234',
        label: 'Développeurs et programmeurs Web, sur la liste de la catégorie B',
      },
      { value: 'Mars 2028', label: 'Fin de validité du permis de travail actuel' },
      { value: 'Fait', label: 'Déjà sélectionné par le Québec (CAQ), biométrie au dossier' },
    ],
    paragraphs: [
      'Mes documents pour la demande de sélection du Québec sont prêts : elle peut accompagner votre EIMT tout de suite.',
      'Dès l’approbation de l’EIMT et du CAQ, je demande le nouveau permis et j’envoie la demande pour commencer le jour même. IRCC vise une réponse en 10 à 15 jours : je peux donc être au travail environ 2 semaines après les approbations.',
    ],
    email: 'M’écrire',
    site: 'Mon site et mon CV',
  },
};
