import React, { memo, PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { usePalette } from '@theme/usePalette.hook';

import { styles } from './base-card.styles';

export const BaseCard: React.FC<PropsWithChildren<TouchableOpacityProps>> = memo(({ children, style, ...props }) => {
  const { surface } = usePalette();

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: surface }, style]} {...props}>
      {children}
    </TouchableOpacity>
  );
});
