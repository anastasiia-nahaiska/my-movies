import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

import { usePalette } from '@theme/usePalette.hook';
import { DEFAULT_ICON_SIZE } from '@utils/constants/sizes';

import { DefaultIconProps } from './icon.types';

export const ArrowBackIcon: React.FC<DefaultIconProps> = ({ size = DEFAULT_ICON_SIZE, color }) => {
  const { text } = usePalette();

  return <Ionicons name="chevron-back-outline" size={size} color={color ?? text} />;
};
