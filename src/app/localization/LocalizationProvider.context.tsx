import React, { createContext, PropsWithChildren, useRef, useState } from 'react';

import { injector } from '@config/injector';
import { LanguageCode, LocalizationService, TranslateFunc } from '@localization/localization.service';

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
  const localizationService = useRef(injector.get(LocalizationService));

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
