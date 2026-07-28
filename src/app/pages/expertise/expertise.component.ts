import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaPanelComponent } from '../../shared/components/cta-panel/cta-panel.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { ProcessStepCardComponent } from '../../shared/components/process-step-card/process-step-card.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface ProcessStep {
  readonly step: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly itemKeys: readonly string[];
}

const PROCESS_STEPS: readonly ProcessStep[] = [
  {
    step: '01',
    titleKey: 'expertise.process.step1Title',
    descriptionKey: 'expertise.process.step1Description',
    itemKeys: ['expertise.process.step1Item1', 'expertise.process.step1Item2'],
  },
  {
    step: '02',
    titleKey: 'expertise.process.step2Title',
    descriptionKey: 'expertise.process.step2Description',
    itemKeys: ['expertise.process.step2Item1', 'expertise.process.step2Item2'],
  },
  {
    step: '03',
    titleKey: 'expertise.process.step3Title',
    descriptionKey: 'expertise.process.step3Description',
    itemKeys: ['expertise.process.step3Item1', 'expertise.process.step3Item2'],
  },
];

@Component({
  selector: 'app-expertise-page',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeadingComponent,
    CtaPanelComponent,
    ProcessStepCardComponent,
    TranslatePipe,
  ],
  templateUrl: './expertise.component.html',
})
export class ExpertiseComponent {
  protected readonly processSteps = PROCESS_STEPS;
}
