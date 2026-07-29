import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';

export type ButtonVariant = 'primary' | 'secondary';
export type ButtonSize = 'sm' | 'md' | 'lg' | 'xl';

const BASE_CLASSES =
  'focus-ring items-center justify-center transition-[filter,background-color,color,transform,box-shadow] duration-200';

// `sm` intentionally omits a display utility so callers can supply their own
// (e.g. `hidden md:inline-flex`) without it fighting the component's default.
const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: 'rounded-lg px-4 py-3 font-label-sm text-label-sm font-medium md:px-6',
  md: 'inline-flex rounded-lg px-10 py-4 font-manrope font-bold',
  lg: 'inline-flex rounded-lg px-10 py-5 font-headline-md',
  xl: 'inline-flex min-h-12 rounded-xl px-7 py-3.5 font-manrope text-sm font-extrabold tracking-[0.03em]',
};

const VARIANT_CLASSES: Record<string, string> = {
  'sm:primary': 'bg-primary text-on-primary hover:brightness-110',
  'md:primary': 'bg-primary text-on-primary shadow-sm hover:brightness-110',
  'md:secondary': 'border border-primary text-primary hover:bg-primary-fixed/30',
  'lg:primary': 'bg-primary text-on-primary hover:bg-primary-container',
  'xl:primary':
    'bg-primary text-on-primary shadow-[0_20px_40px_-24px_rgba(0,97,147,0.65)] hover:-translate-y-0.5 hover:brightness-110',
  'xl:secondary':
    'border border-primary/20 bg-white/70 text-primary shadow-sm backdrop-blur hover:-translate-y-0.5 hover:bg-primary-fixed/40',
};

@Component({
  selector: 'app-button',
  imports: [RouterLink, NgTemplateOutlet],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  readonly variant = input<ButtonVariant>('primary');
  readonly size = input<ButtonSize>('md');
  readonly route = input<string | null>(null);
  readonly href = input<string | null>(null);
  readonly type = input<'button' | 'submit'>('button');
  readonly extraClass = input('');

  protected readonly classes = computed(() =>
    [
      BASE_CLASSES,
      SIZE_CLASSES[this.size()],
      VARIANT_CLASSES[`${this.size()}:${this.variant()}`] ?? '',
      this.extraClass(),
    ]
      .filter(Boolean)
      .join(' '),
  );
}
