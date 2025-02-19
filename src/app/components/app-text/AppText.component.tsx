import { Text, TextProps } from 'react-native';
import React, { memo, PropsWithChildren } from 'react';

import { usePalette } from '@theme/usePalette.hook';

import { textStyles } from './app-text.styles';
import { Typography } from './typography.types';

export interface AppTextProps extends TextProps {
  typography?: Typography;
}

export const AppText: React.FC<PropsWithChildren<AppTextProps>> = memo(({ children, typography = Typography.Body, style, ...props }) => {
  const { text } = usePalette();

  return (
    <Text style={[textStyles[typography], { color: text }, style]} {...props}>
      {children}
    </Text>
  );
});
