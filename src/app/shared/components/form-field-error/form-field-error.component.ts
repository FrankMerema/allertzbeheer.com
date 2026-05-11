import { Component, input } from '@angular/core';
import type { Field } from '@angular/forms/signals';

@Component({
  selector: 'app-form-field-error',
  template: `
    @if (shouldShow()) {
      <p class="text-sm text-error" role="alert">
        {{ errorMessage() }}
      </p>
    }
  `,
})
export class FormFieldErrorComponent {
  readonly field = input.required<Field<unknown>>();
  readonly submitAttempted = input(false);
  readonly fallbackMessage = input('Controleer dit veld.');

  protected shouldShow(): boolean {
    const field = this.field();
    return field().invalid() && (field().touched() || this.submitAttempted());
  }

  protected errorMessage(): string {
    const field = this.field();
    return field().errors()[0]?.message ?? this.fallbackMessage();
  }
}
