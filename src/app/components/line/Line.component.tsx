import React from 'react';
import { View, ViewProps } from 'react-native';

import { usePalette } from '@theme/usePalette.hook';

import { styles } from './line.styles';

export const Line: React.FC<ViewProps> = ({ style, ...props }) => {
  const { border } = usePalette();

  return <View style={[styles.container, { backgroundColor: border }, style]} {...props} />;
};
