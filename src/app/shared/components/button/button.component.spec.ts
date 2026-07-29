import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ButtonComponent } from './button.component';

@Component({
  selector: 'app-test-host',
  imports: [ButtonComponent],
  template: `
    <app-button route="/contact" size="sm">Contact us</app-button>
    <app-button href="https://example.com" size="sm">External</app-button>
    <app-button size="sm">Submit</app-button>
  `,
})
class TestHostComponent {}

describe('ButtonComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('projects the label text for a route, href, and plain button', () => {
    const fixture = TestBed.createComponent(TestHostComponent);
    fixture.detectChanges();

    const [routeAnchor, hrefAnchor] = fixture.nativeElement.querySelectorAll('a');
    const button = fixture.nativeElement.querySelector('button');

    expect(routeAnchor?.textContent?.trim()).toBe('Contact us');
    expect(hrefAnchor?.textContent?.trim()).toBe('External');
    expect(button?.textContent?.trim()).toBe('Submit');
  });
});
