import { DOCUMENT } from '@angular/common';
import { effect, inject, Injectable, signal } from '@angular/core';

import { type Language, translations } from './translations';

const STORAGE_KEY = 'allertzbeheer-language';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly document = inject(DOCUMENT);
  readonly language = signal<Language>(this.getInitialLanguage());

  constructor() {
    effect(() => {
      const currentLanguage = this.language();
      this.document.documentElement.lang = currentLanguage;
      this.persistLanguage(currentLanguage);
    });
  }

  setLanguage(language: Language): void {
    this.language.set(language);
  }

  toggleLanguage(): void {
    this.setLanguage(this.language() === 'nl' ? 'en' : 'nl');
  }

  translate(key: string, params?: Record<string, string | number | null | undefined>): string {
    const dictionary = translations[this.language()];
    const fallbackDictionary = translations.nl;
    const template = dictionary[key] ?? fallbackDictionary[key] ?? key;

    if (!params) {
      return template;
    }

    return Object.entries(params).reduce((result, [paramKey, value]) => {
      return result.replaceAll(`{{${paramKey}}}`, String(value ?? ''));
    }, template);
  }

  private getInitialLanguage(): Language {
    const storedLanguage = this.getStoredLanguage();

    if (storedLanguage) {
      return storedLanguage;
    }

    const browserLanguage = this.document.defaultView?.navigator.language?.toLowerCase() ?? 'nl';
    return browserLanguage.startsWith('en') ? 'en' : 'nl';
  }

  private getStoredLanguage(): Language | null {
    try {
      const storedLanguage = this.document.defaultView?.localStorage.getItem(STORAGE_KEY);
      return storedLanguage === 'nl' || storedLanguage === 'en' ? storedLanguage : null;
    } catch {
      return null;
    }
  }

  private persistLanguage(language: Language): void {
    try {
      this.document.defaultView?.localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Ignore storage access issues.
    }
  }
}
