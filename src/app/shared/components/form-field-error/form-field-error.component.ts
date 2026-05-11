import { Component, input, inject } from '@angular/core';
import type { Field } from '@angular/forms/signals';

import { I18nService } from '../../../core/i18n/i18n.service';

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
  private readonly i18n = inject(I18nService);

  readonly field = input.required<Field<unknown>>();
  readonly submitAttempted = input(false);
  readonly fallbackMessage = input<string | null>(null);

  protected shouldShow(): boolean {
    const field = this.field();
    return field().invalid() && (field().touched() || this.submitAttempted());
  }

  protected errorMessage(): string {
    const field = this.field();
    return (
      field().errors()[0]?.message ??
      this.fallbackMessage() ??
      this.i18n.translate('contact.form.error.default')
    );
  }
}
