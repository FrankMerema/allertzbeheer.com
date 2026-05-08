import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  template: `
    <article class="rounded-[1rem] border border-outline-variant bg-white p-8 text-center">
      <div class="mb-2 font-headline-xl text-headline-xl text-primary">{{ value() }}</div>
      <div class="font-label-sm text-on-surface-variant">{{ label() }}</div>
    </article>
  `,
})
export class StatCardComponent {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}
