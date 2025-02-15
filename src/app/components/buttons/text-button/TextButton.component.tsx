import React from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { AppText } from '@components/app-text/AppText.component';

interface Props extends TouchableOpacityProps {
  title: string;

  titleStyle?: StyleProp<TextStyle>;
}

export const TextButton: React.FC<Props> = ({ title, titleStyle, ...props }) => (
  <TouchableOpacity {...props}>
    <AppText style={titleStyle}>{title}</AppText>
  </TouchableOpacity>
);
