import React from 'react';
import { View, ViewProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { usePalette } from '@theme/usePalette.hook';
import { AppText, Typography } from '@components/app-text';

import { styles } from './movie-card-header.styles';

interface MovieCardHeaderProps extends ViewProps {
  title: string;
}

export const MovieCardHeader: React.FC<MovieCardHeaderProps> = ({ title, style, ...props }) => {
  const { disabledText } = usePalette();

  return (
    <View style={[styles.header, style]} {...props}>
      <AppText typography={Typography.Heading3}>{title}</AppText>
      <Ionicons name="film" size={24} color={disabledText} />
    </View>
  );
};
