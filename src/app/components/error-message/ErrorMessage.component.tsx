import React from 'react';
import { ViewProps } from 'react-native';
import Animated, { AnimatedProps, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { usePalette } from '@theme/usePalette.hook';
import { AppText, Typography } from '@components/app-text';

interface ErrorMessageProps extends AnimatedProps<ViewProps> {
  errorMessage: string;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ errorMessage, ...props }) => {
  const { error } = usePalette();

  return (
    <Animated.View layout={LinearTransition} entering={FadeIn} exiting={FadeOut} {...props}>
      <AppText style={{ color: error }} typography={Typography.Caption}>
        {errorMessage}
      </AppText>
    </Animated.View>
  );
};
