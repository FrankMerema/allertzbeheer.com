import { Component } from '@angular/core';

import { CtaPanelComponent } from '../../shared/components/cta-panel/cta-panel.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { SectionHeadingComponent } from '../../shared/components/section-heading/section-heading.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-diensten-page',
  imports: [PageHeroComponent, SectionHeadingComponent, CtaPanelComponent, TranslatePipe],
  templateUrl: './diensten.component.html',
})
export class DienstenComponent {}
