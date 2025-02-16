import React from 'react';
import { View, ViewProps } from 'react-native';

import { AppText, Typography } from '@components/app-text';
import { IconButton } from '@components/buttons/icon-button/IconButton.component';

import { styles } from './default-header.styles';
import Ionicons from '@expo/vector-icons/Ionicons';
import { usePalette } from '@theme/usePalette.hook';

interface Props extends ViewProps {
  title: string;

  onArrowBackPress: () => void;
}

export const DefaultHeader: React.FC<Props> = ({ title, onArrowBackPress, style, ...props }) => {
  const { text } = usePalette();

  return (
    <View style={[styles.container, style]} {...props}>
      <IconButton icon={<Ionicons name="chevron-back-outline" size={24} color={text} />} onPress={onArrowBackPress} style={styles.iconButton} />
      <AppText typography={Typography.Heading2}>{title}</AppText>
    </View>
  );
};
