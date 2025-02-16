import { StyleSheet } from 'react-native';

import { Typography } from './typography.types';

export const textStyles = StyleSheet.create({
  [Typography.Heading1]: {
    fontFamily: 'OpenSans-SemiBold.ttf',
    fontSize: 24,
  },
  [Typography.Heading2]: {
    fontFamily: 'OpenSans-SemiBold.ttf',
    fontSize: 20,
  },
  [Typography.Heading3]: {
    fontFamily: 'OpenSans-SemiBold.ttf',
    fontSize: 16,
  },
  [Typography.Subtitle]: {
    fontFamily: 'OpenSans-SemiBold.ttf',
    fontSize: 14,
  },
  [Typography.Body]: {
    fontFamily: 'OpenSans-Regular.ttf',
    fontSize: 16,
  },
  [Typography.Caption]: {
    fontFamily: 'OpenSans-Regular.ttf',
    fontSize: 12,
  },
  [Typography.Button]: {
    fontFamily: 'OpenSans-SemiBold.ttf',
    fontSize: 16,
  },
});
