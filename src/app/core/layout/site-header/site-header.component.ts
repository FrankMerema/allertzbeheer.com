import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { I18nService } from '../../i18n/i18n.service';
import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import type { Language } from '../../i18n/translations';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-site-header',
  imports: [RouterLink, RouterLinkActive, TranslatePipe, ButtonComponent],
  templateUrl: './site-header.component.html',
})
export class SiteHeaderComponent {
  protected readonly i18n = inject(I18nService);
  protected readonly mobileMenuId = 'site-mobile-navigation';
  protected readonly menuOpen = signal(false);
  protected readonly navItems = NAV_ITEMS;

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
