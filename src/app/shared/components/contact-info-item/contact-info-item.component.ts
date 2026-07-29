import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-info-item',
  templateUrl: './contact-info-item.component.html',
})
export class ContactInfoItemComponent {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly href = input<string | null>(null);
  readonly secondaryValue = input<string | null>(null);
}
