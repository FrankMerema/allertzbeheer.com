import { enTranslations } from './en';
import { nlTranslations } from './nl';

export type Language = 'nl' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  nl: nlTranslations,
  en: enTranslations,
};
