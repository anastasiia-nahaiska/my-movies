import { StyleSheet } from 'react-native';

import { Palette } from '@theme/theme.types';

import { MainButtonType } from './MainButton.component';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',

    padding: 16,
    borderRadius: 8,
  },
  outlinedContainer: {
    borderWidth: 1,
  },
});

export const getMainButtonContainerStyle = (palette: Palette, type: MainButtonType) => {
  const styles = StyleSheet.create({
    [MainButtonType.Primary]: {
      backgroundColor: palette.primary,
    },
    [MainButtonType.Outlined]: {
      borderWidth: 1,
      backgroundColor: palette.background,
      borderColor: palette.border,
    },
  });

  return styles[type];
};

export const getMainButtonTitleColor = (palette: Palette, type: MainButtonType) => {
  const styles = StyleSheet.create({
    [MainButtonType.Primary]: {
      color: palette.onPrimary,
    },
    [MainButtonType.Outlined]: {
      color: palette.text,
    },
  });

  return styles[type];
};
