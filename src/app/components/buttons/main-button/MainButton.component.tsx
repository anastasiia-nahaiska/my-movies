import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { usePalette } from '@theme/usePalette.hook';
import { AppText, Typography } from '@components/app-text';

import { getMainButtonContainerStyle, getMainButtonTitleColor, styles } from './main-button.styles';

export enum MainButtonType {
  Primary = 'primary',
  Outlined = 'outlined',
}

interface MainButtonProps extends TouchableOpacityProps {
  title: string;

  type?: MainButtonType;
  titleStyle?: StyleProp<TextStyle>;
}

export const MainButton: React.FC<MainButtonProps> = ({ title, type = MainButtonType.Primary, style, titleStyle, ...props }) => {
  const palette = usePalette();

  return (
    <TouchableOpacity style={[styles.container, getMainButtonContainerStyle(palette, type), style]} {...props}>
      <AppText typography={Typography.Button} style={[getMainButtonTitleColor(palette, type), titleStyle]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
