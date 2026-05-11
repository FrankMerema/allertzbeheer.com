import { Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-hero',
  imports: [RouterLink],
  template: `
    <section
      class="relative mx-auto mb-14 max-w-[1200px] px-5 pb-4 pt-8 sm:px-6 md:mb-20 md:px-8 md:pt-12"
    >
      <div
        aria-hidden="true"
        class="absolute inset-x-5 top-0 h-40 rounded-[2rem] bg-[radial-gradient(circle_at_top_left,_rgba(0,97,147,0.16),_transparent_58%),radial-gradient(circle_at_top_right,_rgba(145,204,255,0.28),_transparent_44%)] blur-2xl sm:inset-x-6 md:inset-x-8"
      ></div>

      <div
        class="relative grid grid-cols-1 items-center gap-8 md:grid-cols-12 md:gap-8 lg:gap-12 xl:gap-16"
      >
        <div class="min-w-0 md:col-span-7">
          <span
            class="mb-5 inline-flex rounded-full border border-primary/10 bg-white/80 px-3 py-1.5 font-label-sm text-[10px] uppercase tracking-[0.24em] text-on-primary-fixed-variant shadow-sm backdrop-blur md:mb-8"
          >
            {{ eyebrow() }}
          </span>
          <h1
            class="text-balance mb-5 max-w-[16ch] break-words font-headline-xl text-[clamp(2.6rem,7vw,4.5rem)] leading-[1.02] tracking-[-0.03em] text-on-surface md:mb-6"
          >
            {{ titlePrefix() }} <span class="text-primary">{{ titleHighlight() }}</span
            >{{ titleSuffix() }}
          </h1>
          <p
            class="text-pretty mb-8 max-w-2xl break-words text-[1.02rem] leading-7 text-on-surface-variant md:mb-10 md:text-body-lg"
          >
            {{ description() }}
          </p>
          <div class="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center md:gap-4">
            @if (primaryRoute()) {
              <a
                [routerLink]="primaryRoute()!"
                class="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-manrope text-sm font-extrabold tracking-[0.03em] text-on-primary shadow-[0_20px_40px_-24px_rgba(0,97,147,0.65)] transition-[transform,filter,box-shadow] duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                {{ primaryLabel() }}
              </a>
            } @else if (primaryHref()) {
              <a
                [attr.href]="primaryHref()"
                class="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl bg-primary px-7 py-3.5 font-manrope text-sm font-extrabold tracking-[0.03em] text-on-primary shadow-[0_20px_40px_-24px_rgba(0,97,147,0.65)] transition-[transform,filter,box-shadow] duration-200 hover:-translate-y-0.5 hover:brightness-110"
              >
                {{ primaryLabel() }}
              </a>
            }

            @if (secondaryLabel()) {
              @if (secondaryRoute()) {
                <a
                  [routerLink]="secondaryRoute()!"
                  class="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-primary/20 bg-white/70 px-7 py-3.5 font-manrope text-sm font-extrabold tracking-[0.03em] text-primary shadow-sm backdrop-blur transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-fixed/40"
                >
                  {{ secondaryLabel() }}
                </a>
              } @else if (secondaryHref()) {
                <a
                  [attr.href]="secondaryHref()"
                  class="focus-ring inline-flex min-h-12 items-center justify-center rounded-xl border border-primary/20 bg-white/70 px-7 py-3.5 font-manrope text-sm font-extrabold tracking-[0.03em] text-primary shadow-sm backdrop-blur transition-[background-color,color,transform] duration-200 hover:-translate-y-0.5 hover:bg-primary-fixed/40"
                >
                  {{ secondaryLabel() }}
                </a>
              }
            }
          </div>
        </div>

        <div class="relative hidden min-w-0 md:col-span-5 md:block md:pl-3 lg:pl-6">
          <div
            aria-hidden="true"
            class="absolute inset-6 rounded-[2rem] bg-primary/10 blur-2xl"
          ></div>
          <div
            class="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-[linear-gradient(160deg,rgba(255,255,255,0.94),rgba(235,238,244,0.92))] p-4 shadow-[0_28px_70px_-34px_rgba(24,28,32,0.35)] backdrop-blur sm:p-6"
          >
            <div
              class="relative z-10 aspect-square overflow-hidden rounded-[1.3rem] border border-white/70 bg-white/90 shadow-inner"
            >
              <img
                [alt]="imageAlt()"
                class="h-full w-full bg-white object-contain p-10 sm:p-12"
                [src]="imageSrc()"
                width="115"
                height="115"
                fetchpriority="high"
                loading="eager"
              />
            </div>
            <div
              aria-hidden="true"
              class="absolute inset-x-10 bottom-0 h-24 rounded-full bg-primary/10 blur-2xl"
            ></div>
          </div>
          <div
            class="relative z-20 -mt-6 ml-3 block w-fit rounded-2xl border border-white/80 bg-white/88 p-3 shadow-[0_22px_50px_-28px_rgba(0,97,147,0.55)] backdrop-blur md:p-4 lg:-mt-10 lg:ml-6 lg:p-5"
          >
            <div class="flex items-center gap-3 sm:gap-4">
              <span
                aria-hidden="true"
                class="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-fixed text-3xl text-primary"
              >
                <span class="material-symbols-outlined">handshake</span>
              </span>
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
  readonly statLabel = input('Jaren ervaring');
}
