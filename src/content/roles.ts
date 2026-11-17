import { Localized } from '../app/core/i18n/locale';
import { SectionHeading } from './types';

export interface RolesText extends SectionHeading {
  readonly employer: { readonly title: string; readonly items: readonly string[] };
  readonly worker: { readonly title: string; readonly items: readonly string[] };
  readonly costs: {
    readonly title: string;
    readonly headers: readonly [string, string, string];
    readonly rows: readonly (readonly [string, string, string])[];
  };
}

export const ROLES: Localized<RolesText> = {
  en: {
    eyebrow: '03 / who does what',
    title: 'Who does what',
    intro:
      'The employer files the LMIA and keeps its commitments. The worker handles the work permit.',
    employer: {
      title: 'The employer',
      items: [
        'Offers a full-time job in an eligible occupation, at or above the prevailing wage.',
        'Files the LMIA (Global Talent Stream, Category B) with Service Canada and MIFI at the same time, in French, with the worker’s selection request.',
        'Pays the $1,000 LMIA processing fee, which cannot be recovered from the worker.',
        'Agrees on a Labour Market Benefits Plan with ESDC and reports on its progress.',
        'Sends the worker the positive LMIA and the CAQ.',
        'Keeps the wage, duties and conditions of the offer, and keeps the records for 6 years: ESDC can inspect.',
      ],
    },
    worker: {
      title: 'The worker',
      items: [
        'Gives the employer the documents for the Quebec selection request (résumé, diplomas, passport, previous permits) and signs the forms.',
        'Applies online for the new employer-specific work permit and pays its fee.',
        'Sends the request to start before the permit is issued (PPCHANGEWORK2020) and waits for IRCC’s email.',
        'Keeps a valid status in Canada and gives fair notice to the current employer.',
      ],
    },
    costs: {
      title: 'Who pays what',
      headers: ['Fee', 'Amount', 'Paid by'],
      rows: [
        ['LMIA processing (ESDC)', '$1,000', 'Employer'],
        ['Quebec selection request, for the CAQ (MIFI)', '$233', 'Employer or worker'],
        ['Work permit (IRCC)', '$155', 'Worker'],
      ],
    },
  },
  'fr-CA': {
    eyebrow: '03 / qui fait quoi',
    title: 'Qui fait quoi',
    intro:
      'L’employeur dépose l’EIMT et respecte ses engagements. Le travailleur s’occupe du permis de travail.',
    employer: {
      title: 'L’employeur',
      items: [
        'Offre un emploi à temps plein dans une profession admissible, au salaire en vigueur ou plus.',
        'Dépose l’EIMT (Volet des talents mondiaux, catégorie B) auprès de Service Canada et du MIFI en même temps, en français, avec la demande de sélection du travailleur.',
        'Paie les frais de traitement de l’EIMT de 1 000 $, qui ne peuvent pas être récupérés auprès du travailleur.',
        'Convient d’un plan des avantages pour le marché du travail avec EDSC et fait le suivi de ses progrès.',
        'Transmet au travailleur l’EIMT favorable et le CAQ.',
        'Respecte le salaire, les tâches et les conditions de l’offre, et conserve les documents pendant 6 ans : EDSC peut faire une inspection.',
      ],
    },
    worker: {
      title: 'Le travailleur',
      items: [
        'Fournit à l’employeur les documents de la demande de sélection du Québec (CV, diplômes, passeport, permis antérieurs) et signe les formulaires.',
        'Demande en ligne le nouveau permis de travail lié à l’employeur et en paie les frais.',
        'Envoie la demande pour commencer avant la délivrance du permis (PPCHANGEREMPLOI2020) et attend le courriel d’IRCC.',
        'Garde un statut valide au Canada et donne un préavis raisonnable à l’employeur actuel.',
      ],
    },
    costs: {
      title: 'Qui paie quoi',
      headers: ['Frais', 'Montant', 'Payé par'],
      rows: [
        ['Traitement de l’EIMT (EDSC)', '1 000 $', 'Employeur'],
        ['Demande de sélection du Québec, pour le CAQ (MIFI)', '233 $', 'Employeur ou travailleur'],
        ['Permis de travail (IRCC)', '155 $', 'Travailleur'],
      ],
    },
  },
};
