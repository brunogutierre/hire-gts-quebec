import { Localized } from '../app/core/i18n/locale';
import { SectionHeading } from './types';

export interface FaqText extends SectionHeading {
  readonly items: readonly { readonly question: string; readonly answer: string }[];
}

export const FAQ: Localized<FaqText> = {
  en: {
    eyebrow: '05 / faq',
    title: 'Frequently asked questions',
    items: [
      {
        question: 'Isn’t hiring a foreign worker a months-long process?',
        answer:
          'Not through the Global Talent Stream. Service Canada’s standard for these LMIAs is 10 business days, met 80% of the time, and the worker can start once IRCC authorizes the change, about 10 to 15 days after asking. The months-long part, the new permit itself, happens while the person is already working for you.',
      },
      {
        question: 'Can the worker really start before the new permit is issued?',
        answer:
          'Yes. An IRCC public policy, in effect until revoked, lets a worker in Canada who changes employers start the new job while the new permit is processed. The worker applies for the permit, sends the request through the IRCC web form and starts once IRCC’s authorization email arrives.',
      },
      {
        question: 'Do we have to advertise the job first?',
        answer:
          'The Global Talent Stream has no minimum recruitment requirement. You are encouraged to recruit Canadians and permanent residents, and the application asks you to describe what you did.',
      },
      {
        question: 'How much does it cost the company?',
        answer:
          '$1,000 for the LMIA, plus the $233 Quebec selection fee if you choose to pay it. The rest is your commitments in the Labour Market Benefits Plan, and the time to prepare the file. A lawyer or consultant is optional.',
      },
      {
        question: 'What is a Labour Market Benefits Plan?',
        answer:
          'A short plan, worked out with ESDC, of what your company will do for Canadian workers. For Category B, the mandatory commitment is to invest in skills and training for Canadians and permanent residents, plus at least two other benefits, such as hiring more Canadians or partnering with schools. ESDC reviews progress once a year.',
      },
      {
        question: 'Do we need an immigration lawyer?',
        answer:
          'No, it is not required: employers can file the LMIA themselves. A lawyer or a licensed consultant can still help, especially for a first application or for the French-language filing with MIFI.',
      },
      {
        question: 'What happens if the LMIA is refused?',
        answer:
          'The $1,000 fee is not refunded, but nothing else changes: the worker keeps the current job and permit. You can apply again once the issue is fixed.',
      },
      {
        question: 'Do the Montréal and Laval restrictions apply?',
        answer:
          'The current measures in Montréal and Laval target low-wage jobs, below $36 an hour. A developer position at that wage or more is outside them.',
      },
      {
        question: 'Does French matter for the employer?',
        answer:
          'The application to MIFI must be in French. And since December 17, 2025, an employer with 25 or more employees must meet its francization obligations under the Charter of the French language to get a positive LMIA in Quebec.',
      },
      {
        question: 'Will the worker be tied to our company?',
        answer:
          'The new permit names your company, as the current one names the current employer. Changing employers again would take this same process.',
      },
    ],
  },
  'fr-CA': {
    eyebrow: '05 / faq',
    title: 'Questions fréquentes',
    items: [
      {
        question: 'Embaucher un travailleur étranger, ça ne prend pas des mois?',
        answer:
          'Pas avec le Volet des talents mondiaux. La norme de service de Service Canada pour ces EIMT est de 10 jours ouvrables, respectée 80 % du temps, et le travailleur peut commencer dès qu’IRCC autorise le changement, environ 10 à 15 jours après la demande. La partie qui prend des mois, le nouveau permis lui-même, se fait pendant que la personne travaille déjà pour vous.',
      },
      {
        question:
          'Le travailleur peut-il vraiment commencer avant la délivrance du nouveau permis?',
        answer:
          'Oui. Une politique d’intérêt public d’IRCC, en vigueur jusqu’à sa révocation, permet à un travailleur au Canada qui change d’employeur de commencer le nouvel emploi pendant le traitement du nouveau permis. Le travailleur demande le permis, envoie la demande par le formulaire Web d’IRCC et commence dès la réception du courriel d’autorisation.',
      },
      {
        question: 'Doit-on d’abord afficher le poste?',
        answer:
          'Le Volet des talents mondiaux n’impose aucune exigence minimale de recrutement. On vous encourage à recruter des Canadiens et des résidents permanents, et la demande vous demande de décrire vos démarches.',
      },
      {
        question: 'Combien ça coûte à l’entreprise?',
        answer:
          '1 000 $ pour l’EIMT, plus les frais de 233 $ de la demande de sélection du Québec si vous choisissez de les payer. Le reste, ce sont vos engagements dans le plan des avantages pour le marché du travail et le temps de préparer le dossier. Un avocat ou un consultant est facultatif.',
      },
      {
        question: 'Qu’est-ce qu’un plan des avantages pour le marché du travail?',
        answer:
          'Un court plan, établi avec EDSC, de ce que votre entreprise fera pour les travailleurs canadiens. Pour la catégorie B, l’engagement obligatoire est d’investir dans les compétences et la formation des Canadiens et des résidents permanents, plus au moins deux autres avantages, comme embaucher plus de Canadiens ou s’associer à des établissements d’enseignement. EDSC fait un suivi des progrès chaque année.',
      },
      {
        question: 'A-t-on besoin d’un avocat en immigration?',
        answer:
          'Non, ce n’est pas obligatoire : l’employeur peut déposer l’EIMT lui-même. Un avocat ou un consultant autorisé peut tout de même aider, surtout pour une première demande ou pour le dépôt en français auprès du MIFI.',
      },
      {
        question: 'Que se passe-t-il si l’EIMT est refusée?',
        answer:
          'Les frais de 1 000 $ ne sont pas remboursés, mais rien d’autre ne change : le travailleur garde son emploi et son permis actuels. Vous pouvez présenter une nouvelle demande une fois le problème corrigé.',
      },
      {
        question: 'Les restrictions à Montréal et à Laval s’appliquent-elles?',
        answer:
          'Les mesures actuelles à Montréal et à Laval visent les postes à bas salaire, sous 36 $ l’heure. Un poste de développeur à ce salaire ou plus n’est pas visé.',
      },
      {
        question: 'Le français compte-t-il pour l’employeur?',
        answer:
          'La demande au MIFI doit être en français. De plus, depuis le 17 décembre 2025, un employeur de 25 employés ou plus doit respecter ses obligations de francisation prévues par la Charte de la langue française pour obtenir une EIMT favorable au Québec.',
      },
      {
        question: 'Le travailleur sera-t-il lié à notre entreprise?',
        answer:
          'Le nouveau permis nomme votre entreprise, comme le permis actuel nomme l’employeur actuel. Changer encore d’employeur demanderait ce même processus.',
      },
    ],
  },
};
