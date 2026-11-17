/** Shapes of the page content. Text only: no HTML, so nothing is ever bound with innerHTML. */

export interface SectionHeading {
  /** Mono label above the title: "01 / why". */
  readonly eyebrow: string;
  readonly title: string;
  readonly intro?: string;
}

export interface Link {
  readonly text: string;
  readonly href: string;
}

export interface Fact {
  readonly value: string;
  readonly label: string;
}

export type Party = 'employer' | 'worker' | 'both';

export interface Step {
  readonly who: Party;
  readonly title: string;
  readonly duration: string;
  readonly text: string;
  readonly details: readonly string[];
}
