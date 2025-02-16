import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import { changeLanguage as i18nextChangeLanguage, use, t as i18nextTranslation } from 'i18next';

import { memory } from '@config/memory';

type ResourceKey = string | { [key: string]: ResourceKey };

export type TranslateFunc = (
  key: string,
  options?: {
    [key: string]: string | number;
  },
) => string;

export enum LanguageCode {
  EN = 'en',
  UK = 'uk',
}

export interface LangOptions {
  fallbackLng: LanguageCode;
  resources: { [key in LanguageCode]: { translation: Record<string, ResourceKey> } };
}

export class LocalizationService {
  private readonly CURRENT_LANGUAGE_KEY = 'CURRENT_LANGUAGE';

  private readonly translate = i18nextTranslation;

  private currentLanguage: LanguageCode;

  public get language() {
    return this.currentLanguage;
  }

  public constructor(options: LangOptions) {
    this.currentLanguage = this.getCurrentLanguageFromMemory() ?? (getLocales()[0].languageCode as LanguageCode);

    use(initReactI18next).init({
      lng: this.currentLanguage,
      ...options,
    });
  }

  public readonly t: TranslateFunc = (key, options?) => this.translate(key, options);

  public readonly changeLanguage = async (langCode: LanguageCode) => {
    this.currentLanguage = langCode;

    await i18nextChangeLanguage(langCode);
    this.saveLanguageToMemory(langCode);
  };

  private readonly getCurrentLanguageFromMemory = () => memory.getItem<LanguageCode>(this.CURRENT_LANGUAGE_KEY);

  private readonly saveLanguageToMemory = (langCode: LanguageCode) => memory.setItem(this.CURRENT_LANGUAGE_KEY, langCode);
}
