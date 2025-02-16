import React, { ReactNode } from 'react';
import { StyleProp, TextStyle, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { AppText } from '@components/app-text/AppText.component';

import { styles } from './text-button.styles';

interface Props extends TouchableOpacityProps {
  title: string;

  titleStyle?: StyleProp<TextStyle>;
  endElement?: ReactNode;
}

export const TextButton: React.FC<Props> = ({ title, titleStyle, style, endElement, ...props }) => (
  <TouchableOpacity style={[styles.container, style]} {...props}>
    <AppText style={titleStyle}>{title}</AppText>
    {endElement}
  </TouchableOpacity>
);
