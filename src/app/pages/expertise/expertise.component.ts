import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { CtaPanelComponent } from '../../shared/components/cta-panel/cta-panel.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-expertise-page',
  standalone: true,
  imports: [RouterLink, PageHeroComponent, SectionHeadingComponent, CtaPanelComponent],
  templateUrl: './expertise.component.html',
})
export class ExpertiseComponent {}
