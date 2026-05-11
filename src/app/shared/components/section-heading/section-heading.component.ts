import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-heading',
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
  readonly marginClass = input('mb-12 md:mb-16');

  protected wrapperClass(): string {
    return `${this.marginClass()}${this.centered() ? ' text-center' : ''}`;
  }

  protected titleClass(): string {
    return this.centered()
      ? 'text-balance font-headline-lg text-[clamp(2rem,4vw,2.85rem)] leading-[1.08] tracking-[-0.03em] text-on-surface'
      : 'text-balance mb-4 font-headline-lg text-[clamp(2rem,4vw,2.85rem)] leading-[1.08] tracking-[-0.03em] text-on-surface';
  }

  protected descriptionClass(): string {
    return this.centered()
      ? 'text-pretty mx-auto mt-4 max-w-2xl font-body-md text-body-md leading-7 text-on-surface-variant'
      : 'text-pretty max-w-2xl font-body-md text-body-md leading-7 text-on-surface-variant';
  }

  protected accentClass(): string {
    return this.centered()
      ? 'mx-auto mt-5 h-1.5 w-24 rounded-full bg-[linear-gradient(90deg,#006193,#91ccff)]'
      : 'mt-5 h-1.5 w-24 rounded-full bg-[linear-gradient(90deg,#006193,#91ccff)]';
  }
}
