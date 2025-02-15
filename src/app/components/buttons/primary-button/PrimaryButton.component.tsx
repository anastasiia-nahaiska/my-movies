import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { usePalette } from '@theme/usePalette.hook';
import { AppText, Typography } from '@components/app-text';

import { styles } from './primary-button.styles';

interface Props extends TouchableOpacityProps {
  title: string;

  titleStyle?: StyleProp<TextStyle>;
}

export const PrimaryButton: React.FC<Props> = ({ title, style, titleStyle, ...props }) => {
  const { primary, onPrimary } = usePalette();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: primary }, style]} {...props}>
      <AppText typography={Typography.Button} style={[{ color: onPrimary }, titleStyle]}>
        {title}
      </AppText>
    </TouchableOpacity>
  );
};
