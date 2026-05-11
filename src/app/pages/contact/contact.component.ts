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

import { I18nService } from '../../core/i18n/i18n.service';
import { ContactInfoItemComponent } from '../../shared/components/contact-info-item/contact-info-item.component';
import { FormFieldErrorComponent } from '../../shared/components/form-field-error/form-field-error.component';
import { PageHeroComponent } from '../../shared/components/page-hero/page-hero.component';
import { TranslatePipe } from '../../shared/pipes/translate.pipe';

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

const SUBJECTS = [
  { value: 'management-consultancy', labelKey: 'contact.form.subject.management' },
  { value: 'interim-management', labelKey: 'contact.form.subject.interim' },
  { value: 'strategisch-advies', labelKey: 'contact.form.subject.strategy' },
  { value: 'medezeggenschap', labelKey: 'contact.form.subject.participation' },
  { value: 'anders', labelKey: 'contact.form.subject.other' },
] as const;

@Component({
  selector: 'app-contact-page',
  imports: [
    PageHeroComponent,
    ContactInfoItemComponent,
    FormRoot,
    FormField,
    FormFieldErrorComponent,
    TranslatePipe,
  ],
  templateUrl: './contact.component.html',
})
export class ContactComponent {
  private readonly injector = inject(Injector);
  private readonly document = inject(DOCUMENT);
  private readonly i18n = inject(I18nService);

  protected readonly subjects = SUBJECTS;
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
      required(contact.firstName, {
        message: () => this.i18n.translate('contact.form.error.firstNameRequired'),
      });
      minLength(contact.firstName, 2, {
        message: () => this.i18n.translate('contact.form.error.firstNameMin'),
      });
      maxLength(contact.firstName, 60, {
        message: () => this.i18n.translate('contact.form.error.firstNameMax'),
      });

      required(contact.lastName, {
        message: () => this.i18n.translate('contact.form.error.lastNameRequired'),
      });
      minLength(contact.lastName, 2, {
        message: () => this.i18n.translate('contact.form.error.lastNameMin'),
      });
      maxLength(contact.lastName, 80, {
        message: () => this.i18n.translate('contact.form.error.lastNameMax'),
      });

      required(contact.email, {
        message: () => this.i18n.translate('contact.form.error.emailRequired'),
      });
      email(contact.email, {
        error: () => ({
          kind: 'email',
          message: this.i18n.translate('contact.form.error.emailInvalid'),
        }),
      });
      maxLength(contact.email, 120, {
        message: () => this.i18n.translate('contact.form.error.emailMax'),
      });

      required(contact.subject, {
        message: () => this.i18n.translate('contact.form.error.subjectRequired'),
      });

      required(contact.message, {
        message: () => this.i18n.translate('contact.form.error.messageRequired'),
      });
      minLength(contact.message, 20, {
        message: () => this.i18n.translate('contact.form.error.messageMin'),
      });
      maxLength(contact.message, 1500, {
        message: () => this.i18n.translate('contact.form.error.messageMax'),
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
          this.submissionMessage.set(this.i18n.translate('contact.form.success'));
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
    const mailSubject = this.i18n.translate('contact.form.mail.subject', { subject: subjectLabel });
    const body = [
      this.i18n.translate('contact.form.mail.name', { value: fullName }),
      this.i18n.translate('contact.form.mail.email', { value: formValue.email }),
      this.i18n.translate('contact.form.mail.topic', { value: subjectLabel }),
      '',
      formValue.message,
    ].join('\n');

    return `${this.i18n.translate('common.emailHref')}?subject=${encodeURIComponent(mailSubject)}&body=${encodeURIComponent(body)}`;
  }

  private getSubjectLabel(subjectValue: string): string {
    const subject = this.subjects.find((item) => item.value === subjectValue);
    return subject
      ? this.i18n.translate(subject.labelKey)
      : this.i18n.translate('contact.form.mail.fallbackSubject');
  }
}
