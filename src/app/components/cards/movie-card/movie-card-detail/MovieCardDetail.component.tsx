import React from 'react';
import { View, TouchableOpacityProps } from 'react-native';

import { AppText } from '@components/app-text';

import { styles } from './movie-card-detail.styles';

interface MovieCardDetailProps extends TouchableOpacityProps {
  title: string;
  value: string;
}

export const MovieCardDetail: React.FC<MovieCardDetailProps> = ({ title, value, style, ...viewProps }) => (
  <View style={[styles.container, style]} {...viewProps}>
    <AppText>{title}</AppText>
    <AppText>{value}</AppText>
  </View>
);
