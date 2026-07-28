import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-feature-card',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './feature-card.component.html',
})
export class FeatureCardComponent {
  readonly icon = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly route = input.required<string>();
}
