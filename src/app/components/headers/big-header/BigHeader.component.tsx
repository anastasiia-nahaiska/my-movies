import React, { memo, ReactNode } from 'react';
import { View, ViewProps } from 'react-native';

import { AppText, Typography } from '@components/app-text';

import { styles } from './big-header.styles';

interface Props extends ViewProps {
  title: string;

  endElement?: ReactNode;
}

export const BigHeader: React.FC<Props> = memo(({ title, endElement, style, ...props }) => (
  <View style={[styles.container, style]}>
    <AppText typography={Typography.Heading1} {...props}>
      {title}
    </AppText>
    {endElement}
  </View>
));
