import React, { createContext, PropsWithChildren, useRef, useState } from 'react';

import { Theme } from './theme.types';
import { ThemeService } from './theme.service';

interface ThemeContextType {
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark, changeTheme: () => null });

export interface ThemeProviderProps {
  theme?: Theme;
}

export const ThemeProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({ children, theme = Theme.Dark }) => {
  const themeService = useRef(new ThemeService());

  const [selectedTheme, stSelectedTheme] = useState(themeService.current.appliedTheme);

  const changeTheme = (theme: Theme) => {
    themeService.current.changeTheme(theme);
    stSelectedTheme(theme);
  };

  return <ThemeContext.Provider value={{ theme: selectedTheme, changeTheme }}>{children}</ThemeContext.Provider>;
};
