import React from 'react';
import { View, ViewProps } from 'react-native';

import { AppText, Typography } from '@components/app-text';
import { ArrowBackIcon } from '@components/icons/ArrowBackIcon.component';
import { IconButton } from '@components/buttons/icon-button/IconButton.component';

import { styles } from './default-header.styles';

interface Props extends ViewProps {
  title: string;

  onArrowBackPress: () => void;
}

export const DefaultHeader: React.FC<Props> = ({ title, onArrowBackPress, style, ...props }) => (
  <View style={[styles.container, style]} {...props}>
    <IconButton icon={<ArrowBackIcon />} onPress={onArrowBackPress} />
    <AppText typography={Typography.Heading2}>{title}</AppText>
  </View>
);
