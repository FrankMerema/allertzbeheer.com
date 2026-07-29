import { Component, input } from '@angular/core';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-page-hero',
  imports: [ButtonComponent, TranslatePipe],
  templateUrl: './page-hero.component.html',
})
export class PageHeroComponent {
  readonly eyebrow = input.required<string>();
  readonly titlePrefix = input.required<string>();
  readonly titleHighlight = input.required<string>();
  readonly titleSuffix = input('');
  readonly description = input.required<string>();
  readonly primaryLabel = input.required<string>();
  readonly primaryRoute = input<string | null>(null);
  readonly primaryHref = input<string | null>(null);
  readonly secondaryLabel = input<string | null>(null);
  readonly secondaryRoute = input<string | null>(null);
  readonly secondaryHref = input<string | null>(null);
  readonly imageSrc = input('images/brand/logo.png');
  readonly imageAlt = input<string | null>(null);
  readonly statValue = input('20+');
  readonly statLabel = input<string | null>(null);
}
