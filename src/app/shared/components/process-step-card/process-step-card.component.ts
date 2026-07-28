import { Component, input } from '@angular/core';

import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-process-step-card',
  imports: [TranslatePipe],
  template: `
    <article
      class="rounded-[1.4rem] border border-white/80 bg-white/92 p-6 shadow-[0_24px_60px_-42px_rgba(24,28,32,0.35)] md:p-8"
    >
      <div class="font-headline-xl text-5xl font-extrabold text-surface-container-highest">
        {{ step() }}
      </div>
      <h3 class="mt-4 font-headline-md text-primary">
        {{ title() }}
      </h3>
      <p class="mt-3 font-body-md text-on-surface-variant">
        {{ description() }}
      </p>
      <ul class="space-y-2 pt-5">
        @for (itemKey of itemKeys(); track itemKey) {
          <li class="flex items-center gap-2 text-on-surface-variant">
            <span aria-hidden="true" class="h-1.5 w-1.5 rounded-full bg-primary"></span>
            {{ itemKey | t }}
          </li>
        }
      </ul>
    </article>
  `,
})
export class ProcessStepCardComponent {
  readonly step = input.required<string>();
  readonly title = input.required<string>();
  readonly description = input.required<string>();
  readonly itemKeys = input.required<readonly string[]>();
}
