import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-site-header',
  standalone: true,
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

        <a
          routerLink="/contact"
          class="inline-flex items-center justify-center rounded-lg bg-primary px-4 py-2.5 font-label-sm text-label-sm font-medium text-on-primary transition-all hover:brightness-110 md:px-6"
        >
          Neem contact op
        </a>
      </div>
    </header>
  `,
})
export class SiteHeaderComponent {}
