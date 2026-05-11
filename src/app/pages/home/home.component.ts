import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';

@Component({
  selector: 'app-home-page',
  imports: [RouterLink, PageHeroComponent, SectionHeadingComponent, StatCardComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
