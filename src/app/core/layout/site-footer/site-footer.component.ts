import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { TranslatePipe } from '../../../shared/pipes/translate.pipe';
import { NAV_ITEMS } from '../nav-items';

@Component({
  selector: 'app-site-footer',
  imports: [RouterLink, TranslatePipe],
  templateUrl: './site-footer.component.html',
})
export class SiteFooterComponent {
  protected readonly currentYear = new Date().getFullYear();
  protected readonly navItems = NAV_ITEMS;
}
