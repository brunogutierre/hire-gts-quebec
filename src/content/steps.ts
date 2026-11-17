import { Localized } from '../app/core/i18n/locale';
import { Fact, Party, SectionHeading, Step } from './types';

export interface StepsText extends SectionHeading {
  readonly parties: Readonly<Record<Party, string>>;
  readonly steps: readonly Step[];
  readonly total: Fact & { readonly note: string };
}

export const STEPS: Localized<StepsText> = {
  en: {
    eyebrow: '02 / steps',
    title: 'Five steps from offer to first day',
    intro: 'Two of them are waits on the governments. Everything else takes days.',
    parties: { employer: 'Employer', worker: 'Worker', both: 'Together' },
    steps: [
      {
        who: 'employer',
        title: 'Make the offer',
        duration: '1–3 days',
        text: 'Offer a full-time job in an eligible occupation, at or above the prevailing wage for the region.',
        details: [
          'Software engineers, software developers and web developers (NOC 21231, 21232, 21234) are on the Global Talent Stream Category B list.',
          'Check the wage against the MIFI wage table. At $36/h or more, the job is also outside the current low-wage restrictions in Montréal and Laval.',
          'Prepare a signed employment contract: Quebec asks for it with the selection request.',
        ],
      },
      {
        who: 'employer',
        title: 'File the LMIA and the Quebec selection request together',
        duration: '10 business days',
        text: 'Apply for a Labour Market Impact Assessment (LMIA) under the Global Talent Stream, Category B, with Service Canada and Quebec’s immigration ministry (MIFI) at the same time, in French. The worker’s temporary selection request, which leads to the Quebec Acceptance Certificate (CAQ), goes in with it.',
        details: [
          'Fee: $1,000 per position, paid by the employer.',
          'Include a Labour Market Benefits Plan: commitments that benefit Canadian workers, agreed with Employment and Social Development Canada (ESDC).',
          'Service Canada aims to decide within 10 business days, 80% of the time. MIFI does not publish a processing time.',
          'Once approved, send the worker the positive LMIA and the CAQ.',
        ],
      },
      {
        who: 'worker',
        title: 'Apply for the new work permit',
        duration: '1–2 days',
        text: 'With the LMIA and the CAQ, the worker applies online for a new employer-specific work permit from inside Canada.',
        details: [
          'Fee: $155, paid to Immigration, Refugees and Citizenship Canada (IRCC).',
          'Biometrics given in the last 10 years are reused.',
          'The current permit stays valid while the application is processed.',
        ],
      },
      {
        who: 'worker',
        title: 'Ask to start before the permit is issued',
        duration: '10–15 days',
        text: 'An IRCC public policy lets a worker who changes employers start the new job while the new permit is processed. The worker asks through the IRCC web form, with the code PPCHANGEWORK2020.',
        details: [
          'The request is sent after the permit application.',
          'IRCC says it should reply by email in about 10 to 15 days for online applications.',
          'The email authorizes the new job; it is not the permit itself.',
        ],
      },
      {
        who: 'both',
        title: 'First day',
        duration: 'Day 0',
        text: 'Once the authorization email arrives, the worker can start. The new permit is issued later, and nothing else is needed from the employer in the meantime.',
        details: [],
      },
    ],
    total: {
      value: '≈ 4–6 weeks',
      label: 'Typical time from LMIA submission to first day',
      note: 'An estimate from the published service standards. Actual times vary with each file.',
    },
  },
  'fr-CA': {
    eyebrow: '02 / étapes',
    title: 'Cinq étapes entre l’offre et la première journée',
    intro:
      'Deux d’entre elles sont des délais des gouvernements. Tout le reste se fait en quelques jours.',
    parties: { employer: 'Employeur', worker: 'Travailleur', both: 'Ensemble' },
    steps: [
      {
        who: 'employer',
        title: 'Faire l’offre',
        duration: '1 à 3 jours',
        text: 'Offrez un emploi à temps plein dans une profession admissible, au salaire en vigueur dans la région ou plus.',
        details: [
          'Les ingénieurs en logiciel, les développeurs de logiciels et les développeurs Web (CNP 21231, 21232, 21234) figurent sur la liste de la catégorie B du Volet des talents mondiaux.',
          'Validez le salaire avec la table salariale du MIFI. À 36 $/h ou plus, le poste échappe aussi aux restrictions actuelles visant les postes à bas salaire à Montréal et à Laval.',
          'Préparez un contrat de travail signé : le Québec le demande avec la demande de sélection.',
        ],
      },
      {
        who: 'employer',
        title: 'Déposer l’EIMT et la demande de sélection du Québec ensemble',
        duration: '10 jours ouvrables',
        text: 'Demandez une évaluation de l’impact sur le marché du travail (EIMT) au Volet des talents mondiaux, catégorie B, auprès de Service Canada et du ministère de l’Immigration du Québec (MIFI) en même temps, en français. La demande de sélection temporaire du travailleur, qui mène au certificat d’acceptation du Québec (CAQ), l’accompagne.',
        details: [
          'Frais : 1 000 $ par poste, payés par l’employeur.',
          'Joignez un plan des avantages pour le marché du travail : des engagements au profit des travailleurs canadiens, convenus avec Emploi et Développement social Canada (EDSC).',
          'Service Canada vise une décision en 10 jours ouvrables, 80 % du temps. Le MIFI ne publie pas de délai de traitement.',
          'Une fois l’approbation reçue, transmettez au travailleur l’EIMT favorable et le CAQ.',
        ],
      },
      {
        who: 'worker',
        title: 'Demander le nouveau permis de travail',
        duration: '1 à 2 jours',
        text: 'Avec l’EIMT et le CAQ, le travailleur demande en ligne, depuis le Canada, un nouveau permis de travail lié à l’employeur.',
        details: [
          'Frais : 155 $, payés à Immigration, Réfugiés et Citoyenneté Canada (IRCC).',
          'Les données biométriques fournies dans les 10 dernières années sont réutilisées.',
          'Le permis actuel reste valide pendant le traitement de la demande.',
        ],
      },
      {
        who: 'worker',
        title: 'Demander à commencer avant la délivrance du permis',
        duration: '10 à 15 jours',
        text: 'Une politique d’intérêt public d’IRCC permet au travailleur qui change d’employeur de commencer le nouvel emploi pendant le traitement du nouveau permis. Il en fait la demande avec le formulaire Web d’IRCC, avec le code PPCHANGEREMPLOI2020.',
        details: [
          'La demande s’envoie après la demande de permis.',
          'IRCC indique répondre par courriel dans un délai d’environ 10 à 15 jours pour les demandes en ligne.',
          'Le courriel autorise le nouvel emploi ; ce n’est pas le permis lui-même.',
        ],
      },
      {
        who: 'both',
        title: 'Première journée',
        duration: 'Jour 0',
        text: 'Dès la réception du courriel d’autorisation, le travailleur peut commencer. Le nouveau permis est délivré plus tard, et l’employeur n’a rien d’autre à faire d’ici là.',
        details: [],
      },
    ],
    total: {
      value: '≈ 4 à 6 semaines',
      label: 'Délai typique entre le dépôt de l’EIMT et la première journée',
      note: 'Une estimation fondée sur les normes de service publiées. Les délais réels varient selon chaque dossier.',
    },
  },
};
