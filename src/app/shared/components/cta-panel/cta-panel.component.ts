import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cta-panel',
  imports: [RouterLink],
  template: `
    @if (centered()) {
      <section class="mx-auto mt-24 max-w-[1200px] px-6 pb-16 text-center md:px-8">
        <div class="rounded-xl border border-outline-variant bg-white px-8 py-16 shadow-sm">
          <h2 class="text-balance mb-4 font-headline-lg text-headline-lg text-on-surface">
            {{ title() }}
          </h2>
          <p class="text-pretty mx-auto mb-10 max-w-xl font-body-md text-on-surface-variant">
            {{ description() }}
          </p>
          <div class="flex flex-col justify-center gap-4 sm:flex-row">
            <a
              [routerLink]="primaryRoute()"
              class="focus-ring inline-flex items-center justify-center rounded-lg bg-primary px-10 py-4 font-manrope font-bold text-on-primary shadow-sm transition-[filter] duration-200 hover:brightness-110"
            >
              {{ primaryLabel() }}
            </a>
            @if (secondaryLabel() && secondaryRoute()) {
              <a
                [routerLink]="secondaryRoute()!"
                class="focus-ring inline-flex items-center justify-center rounded-lg border border-primary px-10 py-4 font-manrope font-bold text-primary transition-[background-color,color] duration-200 hover:bg-primary-fixed/30"
              >
                {{ secondaryLabel() }}
              </a>
            }
          </div>
        </div>
      </section>
    } @else {
      <section class="mx-auto max-w-[1200px] px-6 py-24 md:px-8">
        <div
          class="flex flex-col items-center justify-between gap-12 rounded-xl border border-outline bg-white p-12 shadow-sm md:flex-row"
        >
          <div class="max-w-2xl">
            <h2 class="text-balance mb-4 font-headline-lg text-on-surface">{{ title() }}</h2>
            <p class="text-pretty font-body-lg text-on-surface-variant">{{ description() }}</p>
          </div>
          <div class="flex w-full flex-col gap-4 md:w-auto">
            <a
              [routerLink]="primaryRoute()"
              class="focus-ring inline-flex items-center justify-center rounded-lg bg-primary px-10 py-5 font-headline-md text-on-primary transition-[background-color,filter] duration-200 hover:bg-primary-container"
            >
              {{ primaryLabel() }}
            </a>
            @if (note()) {
              <p class="text-center font-label-sm text-gray-500">{{ note() }}</p>
            }
          </div>
        </div>
      </section>
    }
  `,
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
