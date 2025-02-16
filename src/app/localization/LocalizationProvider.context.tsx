import React, { createContext, PropsWithChildren, useRef, useState } from 'react';

import { LanguageCode, LocalizationService, TranslateFunc } from '@localization/localization.service';

import en from './locales/en.json';
import uk from './locales/uk.json';

interface LocalizationContextType {
  language: LanguageCode;
  t: TranslateFunc;
  changeLanguage: (language: LanguageCode) => Promise<void>;
}

export const LocalizationContext = createContext<LocalizationContextType>({
  language: LanguageCode.EN,
  t: () => '',
  changeLanguage: () => new Promise(() => null),
});

export const LocalizationProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const localizationService = useRef(
    new LocalizationService({
      fallbackLng: LanguageCode.EN,
      resources: {
        [LanguageCode.EN]: { translation: en },
        [LanguageCode.UK]: { translation: uk },
      },
    }),
  );

  const [language, setLanguage] = useState(localizationService.current.language);

  const changeLanguage = async (langCode: LanguageCode) => {
    try {
      await localizationService.current.changeLanguage(langCode);
      setLanguage(langCode);
    } catch (e) {
      throw new Error(`${e}`);
    }
  };

  return (
    <LocalizationContext.Provider value={{ language, t: localizationService.current.t, changeLanguage }}>{children}</LocalizationContext.Provider>
  );
};
