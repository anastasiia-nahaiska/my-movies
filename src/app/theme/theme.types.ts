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
  surface: ColorValue;
  border: ColorValue;
  tabBar: ColorValue;
}
