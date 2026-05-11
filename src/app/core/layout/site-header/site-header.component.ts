import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import type { Language } from '../../i18n/translations';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-surface-variant bg-surface/90 backdrop-blur-md"
    >
      <div
        class="mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-4 px-6 md:px-margin-desktop"
      >
        <a
          routerLink="/"
          class="focus-ring flex items-center gap-3 rounded-lg text-on-surface"
          [attr.aria-label]="'header.homeAria' | t"
        >
          <img
            src="images/brand/logo.png"
            [alt]="'common.logoAlt' | t"
            width="115"
            height="115"
            class="h-10 w-10 rounded-xl object-contain"
          />
          <div class="min-w-0">
            <p
              class="m-0 truncate font-headline-md text-lg font-extrabold tracking-tight text-primary"
            >
              {{ 'common.company' | t }}
            </p>
          </div>
        </a>

        <nav class="hidden items-center gap-8 md:flex" [attr.aria-label]="'header.navLabel' | t">
          <a
            routerLink="/"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            [routerLinkActiveOptions]="{ exact: true }"
            class="focus-ring rounded-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            {{ 'nav.home' | t }}
          </a>
          <a
            routerLink="/diensten"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            class="focus-ring rounded-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            {{ 'nav.services' | t }}
          </a>
          <a
            routerLink="/expertise"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            class="focus-ring rounded-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            {{ 'nav.expertise' | t }}
          </a>
          <a
            routerLink="/contact"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            class="focus-ring rounded-sm font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            {{ 'nav.contact' | t }}
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <div
            class="flex items-center rounded-full border border-outline-variant bg-white/80 p-1"
            [attr.aria-label]="'header.languageToggle' | t"
            role="group"
          >
            <button
              type="button"
              class="focus-ring rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.14em] transition-colors"
              [class.bg-primary]="i18n.language() === 'nl'"
              [class.text-on-primary]="i18n.language() === 'nl'"
              [class.text-on-surface-variant]="i18n.language() !== 'nl'"
              [attr.aria-pressed]="i18n.language() === 'nl'"
              (click)="setLanguage('nl')"
            >
              {{ 'header.language.nl' | t }}
            </button>
            <button
              type="button"
              class="focus-ring rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.14em] transition-colors"
              [class.bg-primary]="i18n.language() === 'en'"
              [class.text-on-primary]="i18n.language() === 'en'"
              [class.text-on-surface-variant]="i18n.language() !== 'en'"
              [attr.aria-pressed]="i18n.language() === 'en'"
              (click)="setLanguage('en')"
            >
              {{ 'header.language.en' | t }}
            </button>
          </div>

          <a
            routerLink="/contact"
            class="focus-ring hidden items-center justify-center whitespace-nowrap rounded-lg bg-primary px-4 py-2.5 text-center font-label-sm text-label-sm font-medium text-on-primary transition-[filter] duration-200 hover:brightness-110 md:inline-flex md:min-w-[11rem] md:px-6"
          >
            {{ 'nav.contactCta' | t }}
          </a>

          <button
            type="button"
            class="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low text-on-surface transition-[border-color,color,background-color] duration-200 hover:border-primary hover:text-primary md:hidden"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-controls]="mobileMenuId"
            [attr.aria-label]="'header.menuToggle' | t"
            (click)="toggleMenu()"
          >
            <span aria-hidden="true" class="material-symbols-outlined">
              {{ menuOpen() ? 'close' : 'menu' }}
            </span>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div
          [id]="mobileMenuId"
          class="border-t border-surface-variant bg-surface-container-low px-6 py-4 md:hidden"
        >
          <nav class="flex flex-col gap-2" [attr.aria-label]="'header.mobileNavLabel' | t">
            <a
              routerLink="/"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
              class="focus-ring rounded-lg px-4 py-3 text-on-surface-variant transition-[background-color,color] duration-200 hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              {{ 'nav.home' | t }}
            </a>
            <a
              routerLink="/diensten"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              class="focus-ring rounded-lg px-4 py-3 text-on-surface-variant transition-[background-color,color] duration-200 hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              {{ 'nav.services' | t }}
            </a>
            <a
              routerLink="/expertise"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              class="focus-ring rounded-lg px-4 py-3 text-on-surface-variant transition-[background-color,color] duration-200 hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              {{ 'nav.expertise' | t }}
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              class="focus-ring rounded-lg px-4 py-3 text-on-surface-variant transition-[background-color,color] duration-200 hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              {{ 'nav.contact' | t }}
            </a>
          </nav>

          <a
            routerLink="/contact"
            class="focus-ring mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-label-sm text-label-sm font-medium text-on-primary transition-[filter] duration-200 hover:brightness-110"
            (click)="closeMenu()"
          >
            {{ 'nav.contactCta' | t }}
          </a>
        </div>
      }
    </header>
  `,
})
export class SiteHeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly mobileMenuId = 'site-mobile-navigation';
  protected readonly menuOpen = signal(false);

  protected setLanguage(language: Language): void {
    this.i18n.setLanguage(language);
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
