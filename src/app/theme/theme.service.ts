import { memory } from '@config/memory';

import { Theme } from './theme.types';

export class ThemeService {
  private readonly themeKey = 'THEME';

  private selectedTheme: Theme;

  public get appliedTheme() {
    return this.selectedTheme;
  }

  public constructor() {
    this.selectedTheme = this.getThemeFromMemory() ?? Theme.Dark;
  }

  public changeTheme(theme: Theme) {
    this.saveThemeToMemory(theme);
    this.selectedTheme = theme;
  }

  private readonly getThemeFromMemory = () => memory.getItem<Theme>(this.themeKey);

  private readonly saveThemeToMemory = (theme: Theme) => memory.setItem(this.themeKey, theme);
}
