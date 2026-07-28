import { Component, input } from '@angular/core';

import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-process-step-card',
  imports: [TranslatePipe],
  templateUrl: './process-step-card.component.html',
})
export class ProcessStepCardComponent {
  readonly step = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly itemKeys = input.required<readonly string[]>();
}
