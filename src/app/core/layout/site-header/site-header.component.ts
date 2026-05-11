import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header
      class="sticky top-0 z-50 border-b border-surface-variant bg-surface/90 backdrop-blur-md"
    >
      <div
        class="mx-auto flex h-20 max-w-[1200px] items-center justify-between gap-6 px-6 md:px-margin-desktop"
      >
        <a
          routerLink="/"
          class="flex items-center gap-3 text-on-surface"
          aria-label="Ga naar de homepage van Allertz Beheer B.V."
        >
          <img
            src="/images/brand/logo.png"
            alt="Allertz Beheer B.V. logo"
            class="h-10 w-10 rounded-xl object-contain"
          />
          <div class="min-w-0">
            <p
              class="m-0 truncate font-headline-md text-lg font-extrabold tracking-tight text-primary"
            >
              Allertz Beheer B.V.
            </p>
            <p
              class="m-0 hidden font-label-sm text-xs uppercase tracking-[0.2em] text-on-surface-variant sm:block"
            >
              Managementadvies & begeleiding
            </p>
          </div>
        </a>

        <nav class="hidden items-center gap-8 md:flex" aria-label="Hoofdnavigatie">
          <a
            routerLink="/"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            [routerLinkActiveOptions]="{ exact: true }"
            class="font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            Home
          </a>
          <a
            routerLink="/diensten"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            class="font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            Diensten
          </a>
          <a
            routerLink="/expertise"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            class="font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            Expertise
          </a>
          <a
            routerLink="/contact"
            routerLinkActive="border-b-2 border-primary pb-1 text-primary font-semibold"
            class="font-medium text-on-surface-variant transition-colors hover:text-primary"
            ariaCurrentWhenActive="page"
          >
            Contact
          </a>
        </nav>

        <div class="flex items-center gap-3">
          <a
            routerLink="/contact"
            class="hidden items-center justify-center rounded-lg bg-primary px-4 py-2.5 font-label-sm text-label-sm font-medium text-on-primary transition-all hover:brightness-110 md:inline-flex md:px-6"
          >
            Neem contact op
          </a>

          <button
            type="button"
            class="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-outline-variant bg-surface-container-low text-on-surface transition-colors hover:border-primary hover:text-primary md:hidden"
            [attr.aria-expanded]="menuOpen()"
            [attr.aria-controls]="mobileMenuId"
            aria-label="Open of sluit het mobiele navigatiemenu"
            (click)="toggleMenu()"
          >
            <span class="material-symbols-outlined">{{ menuOpen() ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>

      @if (menuOpen()) {
        <div
          [id]="mobileMenuId"
          class="border-t border-surface-variant bg-surface-container-low px-6 py-4 md:hidden"
        >
          <nav class="flex flex-col gap-2" aria-label="Mobiele navigatie">
            <a
              routerLink="/"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              [routerLinkActiveOptions]="{ exact: true }"
              class="rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              Home
            </a>
            <a
              routerLink="/diensten"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              class="rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              Diensten
            </a>
            <a
              routerLink="/expertise"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              class="rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              Expertise
            </a>
            <a
              routerLink="/contact"
              routerLinkActive="bg-primary-fixed text-primary font-semibold"
              class="rounded-lg px-4 py-3 text-on-surface-variant transition-colors hover:bg-primary-fixed/50 hover:text-primary"
              ariaCurrentWhenActive="page"
              (click)="closeMenu()"
            >
              Contact
            </a>
          </nav>

          <a
            routerLink="/contact"
            class="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-primary px-4 py-3 font-label-sm text-label-sm font-medium text-on-primary transition-all hover:brightness-110"
            (click)="closeMenu()"
          >
            Neem contact op
          </a>
        </div>
      }
    </header>
  `,
})
export class SiteHeaderComponent {
  protected readonly mobileMenuId = 'site-mobile-navigation';
  protected readonly menuOpen = signal(false);

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  protected closeMenu(): void {
    this.menuOpen.set(false);
  }
}
