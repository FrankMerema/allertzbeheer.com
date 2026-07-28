import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-panel',
  imports: [RouterLink],
  templateUrl: './cta-panel.component.html',
})
export class CtaPanelComponent {
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly primaryLabel = input.required<string>();
  readonly primaryRoute = input.required<string>();
  readonly secondaryLabel = input<string | null>(null);
  readonly secondaryRoute = input<string | null>(null);
  readonly note = input<string | null>(null);
  readonly centered = input(false);
}
