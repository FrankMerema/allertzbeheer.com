import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let host: HTMLElement;

  beforeEach(async () => {
    localStorage.setItem('allertzbeheer-language', 'nl');

    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    host = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  afterEach(() => {
    localStorage.removeItem('allertzbeheer-language');
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

  it('submits a valid form and opens a prefilled mail client draft', async () => {
    const openMailClientSpy = vi
      .spyOn(
        fixture.componentInstance as unknown as { openMailClient: (mailtoUrl: string) => void },
        'openMailClient',
      )
      .mockImplementation(() => undefined);

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
    await fixture.whenStable();
    fixture.detectChanges();

    expect(openMailClientSpy).toHaveBeenCalledWith(
      'mailto:info@allertzbeheer.nl?subject=Aanvraag%20via%20allertzbeheer.com%3A%20Strategisch%20advies&body=Naam%3A%20Frank%20Merema%0AE-mailadres%3A%20frank%40example.com%0AOnderwerp%3A%20Strategisch%20advies%0A%0AIk%20wil%20graag%20sparren%20over%20strategisch%20advies%20voor%20onze%20organisatie.',
    );
    expect(host.textContent).toContain(
      'Uw e-mailprogramma wordt geopend… Controleer het conceptbericht en verzend het vervolgens.',
    );

    expect((host.querySelector('#firstName') as HTMLInputElement).value).toBe('Frank');
    expect((host.querySelector('#lastName') as HTMLInputElement).value).toBe('Merema');
    expect((host.querySelector('#email') as HTMLInputElement).value).toBe('frank@example.com');
    expect((host.querySelector('#subject') as HTMLSelectElement).value).toBe('strategisch-advies');
    expect((host.querySelector('#message') as HTMLTextAreaElement).value).toBe(
      'Ik wil graag sparren over strategisch advies voor onze organisatie.',
    );
  });
});
