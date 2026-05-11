import { Component, input } from '@angular/core';

@Component({
  selector: 'app-contact-info-item',
  template: `
    <div class="flex items-start gap-4">
      <span aria-hidden="true" class="material-symbols-outlined text-primary">{{ icon() }}</span>
      <div>
        <p class="font-label-sm text-label-sm text-secondary">{{ label() }}</p>

        @if (href()) {
          <a
            class="focus-ring rounded-sm font-medium text-body-md transition-colors hover:text-primary"
            [href]="href()!"
          >
            {{ value() }}
          </a>
        } @else {
          <p class="font-medium text-body-md">{{ value() }}</p>
        }

        @if (secondaryValue()) {
          <p class="font-medium text-body-md">{{ secondaryValue() }}</p>
        }
      </div>
    </div>
  `,
})
export class ContactInfoItemComponent {
  readonly icon = input.required<string>();
  readonly label = input.required<string>();
  readonly value = input.required<string>();
  readonly href = input<string | null>(null);
  readonly secondaryValue = input<string | null>(null);
}
