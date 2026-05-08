import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
  standalone: true,
  template: `
    <div [class]="wrapperClass()">
      <h2 [class]="titleClass()">{{ title() }}</h2>

      @if (description()) {
        <p [class]="descriptionClass()">{{ description() }}</p>
      }

      @if (showAccent()) {
        <div [class]="accentClass()"></div>
      }
    </div>
  `,
})
export class SectionHeadingComponent {
  readonly title = input.required<string>();
  readonly description = input<string | null>(null);
  readonly centered = input(false);
  readonly showAccent = input(false);
  readonly marginClass = input('mb-16');

  protected wrapperClass(): string {
    return `${this.marginClass()}${this.centered() ? ' text-center' : ''}`;
  }

  protected titleClass(): string {
    return this.centered()
      ? 'font-headline-lg text-headline-lg text-on-surface'
      : 'mb-4 font-headline-lg text-headline-lg text-on-surface';
  }

  protected descriptionClass(): string {
    return this.centered()
      ? 'mx-auto mt-4 max-w-2xl font-body-md text-body-md text-on-surface-variant'
      : 'max-w-2xl font-body-md text-body-md text-on-surface-variant';
  }

  protected accentClass(): string {
    return this.centered() ? 'mx-auto mt-4 h-1 w-20 bg-primary' : 'mt-4 h-1 w-20 bg-primary';
  }
}
