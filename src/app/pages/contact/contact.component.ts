import { Component } from '@angular/core';

import { ContactInfoItemComponent } from '../../shared/components/contact-info-item/contact-info-item.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

@Component({
  selector: 'app-contact-page',
  imports: [PageHeroComponent, ContactInfoItemComponent],
  templateUrl: './contact.component.html',
})
export class ContactComponent {}
