import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '../../../shared/pipes/translate.pipe';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, TranslatePipe],
  template: `
    <footer class="border-t border-surface-variant bg-surface-container-low">
      <div
        class="mx-auto flex max-w-[1200px] flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between md:px-margin-desktop"
      >
        <div class="space-y-2">
          <p class="m-0 font-headline-md text-lg font-bold text-on-surface">
            {{ 'common.company' | t }}
          </p>
          <p class="m-0 font-body-md text-sm text-on-surface-variant">
            {{ 'footer.rights' | t: { year: currentYear } }}
          </p>
        </div>

        <nav
          class="flex flex-wrap gap-5 text-sm text-on-surface-variant"
          [attr.aria-label]="'footer.navLabel' | t"
        >
          <a routerLink="/" class="focus-ring rounded-sm transition-colors hover:text-primary">
            {{ 'nav.home' | t }}
          </a>
          <a
            routerLink="/diensten"
            class="focus-ring rounded-sm transition-colors hover:text-primary"
          >
            {{ 'nav.services' | t }}
          </a>
          <a
            routerLink="/expertise"
            class="focus-ring rounded-sm transition-colors hover:text-primary"
          >
            {{ 'nav.expertise' | t }}
          </a>
          <a
            routerLink="/contact"
            class="focus-ring rounded-sm transition-colors hover:text-primary"
          >
            {{ 'nav.contact' | t }}
          </a>
        </nav>
      </div>
    </footer>
  `,
})
export class SiteFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
}
