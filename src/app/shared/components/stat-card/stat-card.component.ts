import { Component, input } from '@angular/core';

@Component({
  selector: 'app-stat-card',
  template: `
    <article
      class="group relative overflow-hidden rounded-[1.4rem] border border-white/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(241,244,249,0.94))] p-6 text-center shadow-[0_22px_60px_-36px_rgba(24,28,32,0.35)] sm:p-8"
    >
      <div
        aria-hidden="true"
        class="absolute inset-x-6 top-0 h-16 rounded-full bg-primary/8 blur-2xl"
      ></div>
      <div class="relative">
        <div class="mb-2 font-headline-xl text-[clamp(2rem,5vw,3rem)] leading-none text-primary">
          {{ value() }}
        </div>
        <div class="font-label-sm uppercase tracking-[0.18em] text-on-surface-variant">
          {{ label() }}
        </div>
      </div>
    </article>
  `,
})
export class StatCardComponent {
  readonly value = input.required<string>();
  readonly label = input.required<string>();
}
