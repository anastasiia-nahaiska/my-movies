import { Text, TextProps } from 'react-native';
import React, { PropsWithChildren } from 'react';

import { styles } from './app-text.styles';
import { Typography } from './typography.types';
import { usePalette } from '@theme/usePalette.hook';

export interface AppTextProps extends TextProps {
  typography?: Typography;
}

export const AppText: React.FC<PropsWithChildren<AppTextProps>> = ({ children, typography = Typography.Body, style, ...props }) => {
  const { text } = usePalette();

  return (
    <Text style={[styles[typography], { color: text }, style]} {...props}>
      {children}
    </Text>
  );
};
