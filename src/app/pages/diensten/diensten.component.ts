import { Component } from '@angular/core';

import { CtaPanelComponent } from '../../shared/components/cta-panel/cta-panel.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';

@Component({
  selector: 'app-diensten-page',
  standalone: true,
  imports: [PageHeroComponent, SectionHeadingComponent, CtaPanelComponent],
  templateUrl: './diensten.component.html',
})
export class DienstenComponent {}
