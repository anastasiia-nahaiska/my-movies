import React, { createContext, PropsWithChildren } from 'react';

import { Theme } from './theme.types';

interface ThemeContextType {
  theme: Theme;
}

export const ThemeContext = createContext<ThemeContextType>({ theme: Theme.Dark });

export interface ThemeProviderProps {
  theme?: Theme;
}

export const ThemeProvider: React.FC<PropsWithChildren<ThemeProviderProps>> = ({ children, theme = Theme.Dark }) => (
  <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
);
