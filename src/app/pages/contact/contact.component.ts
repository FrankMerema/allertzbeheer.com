import { Component, Injector, inject, signal } from '@angular/core';
import {
  FormField,
  FormRoot,
  type Field,
  email,
  form,
  maxLength,
  minLength,
  required,
} from '@angular/forms/signals';

import { ContactInfoItemComponent } from '../../shared/components/contact-info-item/contact-info-item.component';
import { FormFieldErrorComponent } from '../../shared/components/form-field-error/form-field-error.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';

interface ContactFormModel {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
}

const INITIAL_CONTACT_FORM_VALUE: ContactFormModel = {
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
};

@Component({
  selector: 'app-contact-page',
  imports: [
    PageHeroComponent,
    ContactInfoItemComponent,
    FormRoot,
    FormField,
    FormFieldErrorComponent,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly injector = inject(Injector);

  protected readonly subjects = [
    { value: 'management-consultancy', label: 'Management Consultancy' },
    { value: 'interim-management', label: 'Interim Management' },
    { value: 'strategisch-advies', label: 'Strategisch Advies' },
    { value: 'medezeggenschap', label: 'Medezeggenschap' },
    { value: 'anders', label: 'Anders' },
  ] as const;

  protected readonly submitAttempted = signal(false);
  protected readonly submissionMessage = signal<string | null>(null);
  protected readonly contactModel = signal<ContactFormModel>({ ...INITIAL_CONTACT_FORM_VALUE });

  protected readonly contactForm = form(
    this.contactModel,
    (contact) => {
      required(contact.firstName, { message: 'Vul uw voornaam in.' });
      minLength(contact.firstName, 2, {
        message: 'Voornaam moet minimaal 2 tekens bevatten.',
      });
      maxLength(contact.firstName, 60, {
        message: 'Voornaam mag maximaal 60 tekens bevatten.',
      });

      required(contact.lastName, { message: 'Vul uw achternaam in.' });
      minLength(contact.lastName, 2, {
        message: 'Achternaam moet minimaal 2 tekens bevatten.',
      });
      maxLength(contact.lastName, 80, {
        message: 'Achternaam mag maximaal 80 tekens bevatten.',
      });

      required(contact.email, { message: 'Vul uw e-mailadres in.' });
      email(contact.email, { message: 'Vul een geldig e-mailadres in.' });
      maxLength(contact.email, 120, {
        message: 'E-mailadres mag maximaal 120 tekens bevatten.',
      });

      required(contact.subject, { message: 'Kies een onderwerp.' });

      required(contact.message, { message: 'Beschrijf uw vraag of uitdaging.' });
      minLength(contact.message, 20, {
        message: 'Bericht moet minimaal 20 tekens bevatten.',
      });
      maxLength(contact.message, 1500, {
        message: 'Bericht mag maximaal 1500 tekens bevatten.',
      });
    },
    {
      injector: this.injector,
      name: 'contact',
      submission: {
        action: async (_field, detail) => {
          this.submissionMessage.set(null);

          const formValue = detail.submitted().value() as ContactFormModel;
          const fullName = [formValue.firstName, formValue.lastName].filter(Boolean).join(' ');

          await new Promise((resolve) => {
            setTimeout(resolve, 500);
          });

          this.submissionMessage.set(
            `Bedankt ${fullName}, uw bericht is ontvangen. We nemen zo snel mogelijk contact op via ${formValue.email}.`,
          );
          detail.root().reset({ ...INITIAL_CONTACT_FORM_VALUE });
          this.submitAttempted.set(false);

          return undefined;
        },
        onInvalid: (_field, detail) => {
          this.submissionMessage.set(null);
          this.submitAttempted.set(true);

          const firstError = detail.submitted().errorSummary()[0];
          firstError?.fieldTree().focusBoundControl();
        },
      },
    },
  );

  protected shouldShowError(field: Field<unknown>): boolean {
    return field().invalid() && (field().touched() || this.submitAttempted());
  }
}
