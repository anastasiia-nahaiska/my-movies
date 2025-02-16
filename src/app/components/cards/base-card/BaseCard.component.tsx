import React, { PropsWithChildren } from 'react';
import { TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { usePalette } from '@theme/usePalette.hook';

import { styles } from './base-card.styles';

export const BaseCard: React.FC<PropsWithChildren<TouchableOpacityProps>> = ({ children, style }) => {
  const { surface } = usePalette();

  return <TouchableOpacity style={[styles.container, { backgroundColor: surface }, style]}>{children}</TouchableOpacity>;
};
