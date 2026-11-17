import { Localized } from '../app/core/i18n/locale';
import { Link, SectionHeading } from './types';

/** The day every figure on the page was last checked against the sources below. */
export const LAST_VERIFIED = '2026-11-16';

export interface SourcesText extends SectionHeading {
  readonly lastVerified: string;
  readonly disclaimer: string;
  readonly links: readonly (Link & { readonly publisher: string })[];
}

export const SOURCES: Localized<SourcesText> = {
  en: {
    eyebrow: '06 / sources',
    title: 'Sources',
    lastVerified: 'Last verified:',
    disclaimer:
      'This page is general information written by a worker, not legal advice. Rules, fees and processing times change: check the official pages, or ask a lawyer or a licensed immigration consultant, before you apply.',
    links: [
      {
        publisher: 'ESDC',
        text: 'Hire a top foreign talent through the Global Talent Stream',
        href: 'https://www.canada.ca/en/employment-social-development/services/foreign-workers/global-talent.html',
      },
      {
        publisher: 'ESDC',
        text: 'Program requirements for the Global Talent Stream',
        href: 'https://www.canada.ca/en/employment-social-development/services/foreign-workers/global-talent/requirements.html',
      },
      {
        publisher: 'ESDC',
        text: 'Hiring temporary foreign workers in Quebec',
        href: 'https://www.canada.ca/en/employment-social-development/services/foreign-workers/quebec.html',
      },
      {
        publisher: 'MIFI',
        text: 'Comprendre les autorisations (French only)',
        href: 'https://www.quebec.ca/entreprises-et-travailleurs-autonomes/administrer-gerer/embauche-gestion-personnel/recruter/embaucher-immigrant/embaucher-travailleur-etranger-temporaire/comprendre-autorisations',
      },
      {
        publisher: 'MIFI',
        text: 'Global Talent Stream, Category B occupations (French only, PDF)',
        href: 'https://cdn-contenu.quebec.ca/cdn-contenu/immigration/formulaires/fr/Embaucher_un_travailleur_temporaire/Liste_professions_Categorie_B_Talents_mondiaux.pdf',
      },
      {
        publisher: 'MIFI',
        text: 'Demande de sélection temporaire: fees (French only)',
        href: 'https://www.quebec.ca/immigration/travailler-quebec/travailleurs-temporaires/programme-travailleurs-etrangers-temporaires/autorisations/demande-selection-temporaire',
      },
      {
        publisher: 'IRCC',
        text: 'Changing jobs or employers',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/extend/change-jobs-employers.html',
      },
      {
        publisher: 'IRCC',
        text: 'Public policy: changing employment',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/public-policies/changing-employment.html',
      },
      {
        publisher: 'IRCC',
        text: 'Global Skills Strategy: who qualifies for 2-week processing',
        href: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/work-canada/hire-temporary-foreign/global-skills-strategy/eligibility.html',
      },
      {
        publisher: 'IRCC',
        text: 'Fee list',
        href: 'https://ircc.canada.ca/english/information/fees/fees.asp',
      },
    ],
  },
  'fr-CA': {
    eyebrow: '06 / sources',
    title: 'Sources',
    lastVerified: 'Dernière vérification\u00a0:',
    disclaimer:
      'Cette page est de l’information générale rédigée par un travailleur, et non un avis juridique. Les règles, les frais et les délais changent : consultez les pages officielles, ou un avocat ou un consultant en immigration autorisé, avant de déposer une demande.',
    links: [
      {
        publisher: 'EDSC',
        text: 'Embaucher un travailleur talentueux de l’étranger par l’entremise du Volet des talents mondiaux',
        href: 'https://www.canada.ca/fr/emploi-developpement-social/services/travailleurs-etrangers/talents-mondiaux.html',
      },
      {
        publisher: 'EDSC',
        text: 'Exigences du programme pour le Volet des talents mondiaux',
        href: 'https://www.canada.ca/fr/emploi-developpement-social/services/travailleurs-etrangers/talents-mondiaux/exigences.html',
      },
      {
        publisher: 'EDSC',
        text: 'Embaucher des travailleurs étrangers temporaires au Québec',
        href: 'https://www.canada.ca/fr/emploi-developpement-social/services/travailleurs-etrangers/quebec.html',
      },
      {
        publisher: 'MIFI',
        text: 'Comprendre les autorisations',
        href: 'https://www.quebec.ca/entreprises-et-travailleurs-autonomes/administrer-gerer/embauche-gestion-personnel/recruter/embaucher-immigrant/embaucher-travailleur-etranger-temporaire/comprendre-autorisations',
      },
      {
        publisher: 'MIFI',
        text: 'Liste des professions de la catégorie B du Volet des talents mondiaux (PDF)',
        href: 'https://cdn-contenu.quebec.ca/cdn-contenu/immigration/formulaires/fr/Embaucher_un_travailleur_temporaire/Liste_professions_Categorie_B_Talents_mondiaux.pdf',
      },
      {
        publisher: 'MIFI',
        text: 'Présenter une demande de sélection temporaire',
        href: 'https://www.quebec.ca/immigration/travailler-quebec/travailleurs-temporaires/programme-travailleurs-etrangers-temporaires/autorisations/demande-selection-temporaire',
      },
      {
        publisher: 'IRCC',
        text: 'Changer d’emploi ou d’employeur',
        href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/travailler-canada/prolongez-modifiez/changer-emploi-employeur.html',
      },
      {
        publisher: 'IRCC',
        text: 'Politique d’intérêt public : changement d’emploi',
        href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/organisation/mandat/politiques-directives-operationnelles-ententes-accords/politiques-interet-public/changer-emplois.html',
      },
      {
        publisher: 'IRCC',
        text: 'Stratégie en matière de compétences mondiales : admissibilité au traitement plus rapide',
        href: 'https://www.canada.ca/fr/immigration-refugies-citoyennete/services/travailler-canada/embaucher-etranger-temporaires/strategie-matiere-competences-mondiales/admissibilite.html',
      },
      {
        publisher: 'IRCC',
        text: 'Liste des frais',
        href: 'https://ircc.canada.ca/francais/information/frais/bareme.asp',
      },
    ],
  },
};
