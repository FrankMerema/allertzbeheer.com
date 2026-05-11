import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  template: `
    <section class="mx-auto mb-20 max-w-[1200px] px-6 pt-16 md:px-8">
      <div class="grid grid-cols-1 items-center gap-16 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <span
            class="mb-8 inline-block rounded-full bg-primary-fixed/50 px-3 py-1 font-label-sm text-[10px] uppercase tracking-widest text-on-primary-fixed-variant"
          >
            {{ eyebrow() }}
          </span>
          <h1 class="mb-6 font-headline-xl text-headline-xl leading-tight text-on-surface">
            {{ titlePrefix() }} <span class="text-primary">{{ titleHighlight() }}</span
            >{{ titleSuffix() }}
          </h1>
          <p class="mb-10 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            {{ description() }}
          </p>
          <div class="flex flex-col gap-4 sm:flex-row">
            @if (primaryRoute()) {
              <a
                [routerLink]="primaryRoute()!"
                class="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-4 font-manrope font-bold text-on-primary shadow-sm transition-all hover:brightness-110"
              >
                {{ primaryLabel() }}
              </a>
            } @else if (primaryHref()) {
              <a
                [attr.href]="primaryHref()"
                class="inline-flex items-center justify-center rounded-lg bg-primary px-10 py-4 font-manrope font-bold text-on-primary shadow-sm transition-all hover:brightness-110"
              >
                {{ primaryLabel() }}
              </a>
            }

            @if (secondaryLabel()) {
              @if (secondaryRoute()) {
                <a
                  [routerLink]="secondaryRoute()!"
                  class="inline-flex items-center justify-center rounded-lg border border-primary px-10 py-4 font-manrope font-bold text-primary transition-colors hover:bg-primary-fixed/30"
                >
                  {{ secondaryLabel() }}
                </a>
              } @else if (secondaryHref()) {
                <a
                  [attr.href]="secondaryHref()"
                  class="inline-flex items-center justify-center rounded-lg border border-primary px-10 py-4 font-manrope font-bold text-primary transition-colors hover:bg-primary-fixed/30"
                >
                  {{ secondaryLabel() }}
                </a>
              }
            }
          </div>
        </div>

        <div class="relative lg:col-span-5">
          <div
            class="relative z-10 aspect-square overflow-hidden rounded-xl bg-surface-container-high shadow-sm"
          >
            <img
              [alt]="imageAlt()"
              class="h-full w-full bg-white object-contain p-12"
              [src]="imageSrc()"
            />
          </div>
          <div class="absolute -right-6 -top-6 h-full w-full rounded-xl bg-primary-fixed/20"></div>
          <div
            class="absolute -bottom-6 -left-6 z-20 hidden border border-outline-variant bg-white p-6 shadow-lg md:block"
          >
            <div class="flex items-center gap-4">
              <span class="material-symbols-outlined text-4xl text-primary">handshake</span>
              <div>
                <p class="mb-1 font-headline-md leading-none text-primary">{{ statValue() }}</p>
                <p class="font-label-sm text-secondary">{{ statLabel() }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
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
  readonly imageSrc = input('/images/brand/logo.png');
  readonly imageAlt = input('Allertz Beheer B.V. logo');
  readonly statValue = input('20+');
  readonly statLabel = input('Jaar Ervaring');
}
