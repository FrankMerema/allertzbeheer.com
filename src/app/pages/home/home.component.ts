import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { FeatureCardComponent } from '../../shared/components/feature-card/feature-card.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

interface FeatureCard {
  readonly icon: string;
  readonly titleKey: string;
  readonly descriptionKey: string;
  readonly route: string;
}

const FEATURE_CARDS: readonly FeatureCard[] = [
  {
    icon: 'strategy',
    titleKey: 'home.cards.advice.title',
    descriptionKey: 'home.cards.advice.description',
    route: '/diensten',
  },
  {
    icon: 'groups',
    titleKey: 'home.cards.participation.title',
    descriptionKey: 'home.cards.participation.description',
    route: '/diensten',
  },
  {
    icon: 'visibility',
    titleKey: 'home.cards.supervision.title',
    descriptionKey: 'home.cards.supervision.description',
    route: '/expertise',
  },
];

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeadingComponent,
    StatCardComponent,
    FeatureCardComponent,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  protected readonly featureCards = FEATURE_CARDS;
}
