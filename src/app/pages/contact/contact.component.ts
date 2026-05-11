import { DOCUMENT } from '@angular/common';
import { Component, HostListener, Injector, computed, inject, signal } from '@angular/core';
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
  private readonly document = inject(DOCUMENT);

  protected readonly subjects = [
    { value: 'management-consultancy', label: 'Managementadvies' },
    { value: 'interim-management', label: 'Interim-management' },
    { value: 'strategisch-advies', label: 'Strategisch advies' },
    { value: 'medezeggenschap', label: 'Medezeggenschap' },
    { value: 'anders', label: 'Anders' },
  ] as const;

  protected readonly submitAttempted = signal(false);
  protected readonly submissionMessage = signal<string | null>(null);
  protected readonly contactModel = signal<ContactFormModel>({ ...INITIAL_CONTACT_FORM_VALUE });
  protected readonly hasUnsavedChanges = computed(() => {
    const value = this.contactModel();

    return Object.entries(INITIAL_CONTACT_FORM_VALUE).some(
      ([key, initialValue]) => value[key as keyof ContactFormModel] !== initialValue,
    );
  });

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
          const mailtoUrl = this.buildMailtoUrl(formValue);

          this.openMailClient(mailtoUrl);
          this.submissionMessage.set(
            'Uw e-mailprogramma wordt geopend… Controleer het conceptbericht en verzend het vervolgens.',
          );
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

  @HostListener('window:beforeunload', ['$event'])
  protected confirmBeforeUnload(event: BeforeUnloadEvent): void {
    if (!this.hasUnsavedChanges()) {
      return;
    }

    event.preventDefault();
    event.returnValue = '';
  }

  protected shouldShowError(field: Field<unknown>): boolean {
    return field().invalid() && (field().touched() || this.submitAttempted());
  }

  protected openMailClient(mailtoUrl: string): void {
    this.document.location.href = mailtoUrl;
  }

  private buildMailtoUrl(formValue: ContactFormModel): string {
    const fullName = [formValue.firstName, formValue.lastName].filter(Boolean).join(' ');
    const subjectLabel = this.getSubjectLabel(formValue.subject);
    const mailSubject = `Aanvraag via allertzbeheer.com: ${subjectLabel}`;
    const body = [
      `Naam: ${fullName}`,
      `E-mailadres: ${formValue.email}`,
      `Onderwerp: ${subjectLabel}`,
      '',
      formValue.message,
    ].join('\n');

    return `mailto:info@allertzbeheer.nl?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  }

  private getSubjectLabel(subjectValue: string): string {
    return (
      this.subjects.find((subject) => subject.value === subjectValue)?.label ?? 'Contactaanvraag'
    );
  }
}
