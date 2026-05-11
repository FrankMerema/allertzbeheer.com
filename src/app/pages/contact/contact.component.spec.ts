import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('shows validation errors and focuses the first invalid field on submit', async () => {
    const form = host.querySelector('#contact-form') as HTMLFormElement;
    const firstNameInput = host.querySelector('#firstName') as HTMLInputElement;
    const focusSpy = vi.spyOn(firstNameInput, 'focus');

    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.textContent).toContain('Controleer de gemarkeerde velden en probeer het opnieuw.');
    expect(host.textContent).toContain('Vul uw voornaam in.');
    expect(host.textContent).toContain('Vul uw achternaam in.');
    expect(host.textContent).toContain('Vul uw e-mailadres in.');
    expect(focusSpy).toHaveBeenCalled();
    expect(firstNameInput.getAttribute('aria-invalid')).toBe('true');
  });

  it('submits a valid form, shows a success message, and resets the fields', async () => {
    fixture.componentInstance['contactModel'].set({
      firstName: 'Frank',
      lastName: 'Merema',
      email: 'frank@example.com',
      subject: 'strategisch-advies',
      message: 'Ik wil graag sparren over strategisch advies voor onze organisatie.',
    });
    fixture.detectChanges();

    const form = host.querySelector('#contact-form') as HTMLFormElement;
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve, 550));
    await fixture.whenStable();
    fixture.detectChanges();

    expect(host.textContent).toContain(
      'Bedankt Frank Merema, uw bericht is ontvangen. We nemen zo snel mogelijk contact op via frank@example.com.',
    );

    expect((host.querySelector('#firstName') as HTMLInputElement).value).toBe('');
    expect((host.querySelector('#lastName') as HTMLInputElement).value).toBe('');
    expect((host.querySelector('#email') as HTMLInputElement).value).toBe('');
    expect((host.querySelector('#subject') as HTMLSelectElement).value).toBe('');
    expect((host.querySelector('#message') as HTMLTextAreaElement).value).toBe('');
  });
});
