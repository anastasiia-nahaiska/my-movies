import { Text, TextProps } from 'react-native';
import React, { PropsWithChildren } from 'react';

import { styles } from './themed-text.styles';
import { Typography } from './typography.types';
import { usePalette } from '@theme/usePalette.hook';

interface ThemedTextProps extends TextProps {
  typography?: Typography;
}

export const ThemedText: React.FC<PropsWithChildren<ThemedTextProps>> = ({ children, typography = Typography.Body, style, ...props }) => {
  const { text } = usePalette();

  return (
    <Text style={[styles[typography], { color: text }, style]} {...props}>
      {children}
    </Text>
  );
};
