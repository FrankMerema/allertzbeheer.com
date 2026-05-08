import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-site-footer',
  standalone: true,
  imports: [RouterLink],
  template: `
    <footer class="border-t border-surface-variant bg-surface-container-low">
      <div
        class="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-margin-desktop"
      >
        <div class="space-y-2">
          <p class="m-0 font-headline-md text-lg font-bold text-on-surface">Allertz Beheer B.V.</p>
          <p class="m-0 font-body-md text-sm text-on-surface-variant">
            © {{ currentYear }} Allertz Beheer B.V. Alle rechten voorbehouden.
          </p>
        </div>

        <nav
          class="flex flex-wrap gap-5 text-sm text-on-surface-variant"
          aria-label="Footer navigatie"
        >
          <a routerLink="/" class="transition-colors hover:text-primary">Home</a>
          <a routerLink="/diensten" class="transition-colors hover:text-primary">Diensten</a>
          <a routerLink="/expertise" class="transition-colors hover:text-primary">Expertise</a>
          <a routerLink="/contact" class="transition-colors hover:text-primary">Contact</a>
        </nav>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
