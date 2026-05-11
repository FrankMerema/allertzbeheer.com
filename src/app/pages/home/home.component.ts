import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-home-page',
  imports: [
    RouterLink,
    PageHeroComponent,
    SectionHeadingComponent,
    StatCardComponent,
    TranslatePipe,
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
