import { ColorValue } from 'react-native';

export enum Theme {
  Light = 'light',
  Dark = 'dark',
}

export interface Palette {
  background: ColorValue;
  primary: ColorValue;
  text: ColorValue;
  secondaryText: ColorValue;
  disabledText: ColorValue;
  surface: ColorValue;
  border: ColorValue;
  onPrimary: ColorValue;
  error: ColorValue;
}
