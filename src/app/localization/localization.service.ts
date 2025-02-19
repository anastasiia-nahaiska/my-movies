import { getLocales } from 'expo-localization';
import { initReactI18next } from 'react-i18next';
import { changeLanguage as i18nextChangeLanguage, use, t as i18nextTranslation } from 'i18next';

import { memory } from '@config/memory';

import en from './locales/en.json';
import uk from './locales/uk.json';

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
  private readonly currentLanguageKey = 'CURRENT_LANGUAGE';

  private readonly translate = i18nextTranslation;

  private currentLanguage: LanguageCode;

  public get language() {
    return this.currentLanguage;
  }

  public constructor() {
    this.currentLanguage = this.getCurrentLanguageFromMemory() ?? (getLocales()[0].languageCode as LanguageCode);

    use(initReactI18next).init({
      lng: this.currentLanguage,
      fallbackLng: LanguageCode.EN,
      resources: {
        [LanguageCode.EN]: { translation: en },
        [LanguageCode.UK]: { translation: uk },
      },
    });
  }

  public readonly t: TranslateFunc = (key, options?) => this.translate(key, options);

  public readonly changeLanguage = async (langCode: LanguageCode) => {
    this.currentLanguage = langCode;

    await i18nextChangeLanguage(langCode);
    this.saveLanguageToMemory(langCode);
  };

  private readonly getCurrentLanguageFromMemory = () => memory.getItem<LanguageCode>(this.currentLanguageKey);

  private readonly saveLanguageToMemory = (langCode: LanguageCode) => memory.setItem(this.currentLanguageKey, langCode);
}
