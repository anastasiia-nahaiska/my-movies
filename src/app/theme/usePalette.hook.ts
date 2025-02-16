import { useContext } from 'react';

import { Palette, Theme } from './theme.types';
import { ThemeContext } from './theme.provider';
import { darkPalette, lightPalette } from './palette';

export const usePalette = (): Palette => {
  const { theme } = useContext(ThemeContext);

  return theme === Theme.Dark ? darkPalette : lightPalette;
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);

  return theme;
};
