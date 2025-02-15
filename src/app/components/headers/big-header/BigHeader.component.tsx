import React from 'react';

import { AppText, Typography } from '@components/app-text';
import { AppTextProps } from '@components/app-text/AppText.component';

import { styles } from './big-header.styles';

interface Props extends AppTextProps {
  title: string;
}

export const BigHeader: React.FC<Props> = ({ title, style, ...props }) => (
  <AppText typography={Typography.Heading1} style={[styles.title, style]} {...props}>
    {title}
  </AppText>
);
