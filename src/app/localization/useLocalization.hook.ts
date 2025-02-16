import { useContext } from 'react';

import { LocalizationContext } from './LocalizationProvider.context';

export const useLocalization = () => {
  const localization = useContext(LocalizationContext);

  return localization;
};
