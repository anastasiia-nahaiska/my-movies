import { TextInput } from 'react-native';
import React, { forwardRef } from 'react';
import Animated, { LinearTransition } from 'react-native-reanimated';

import { AppTextInput, AppTextInputProps } from '../app-text-input/AppTextInput.component';

export const AnimatedAppTextInput: React.FC<AppTextInputProps> = forwardRef<TextInput, AppTextInputProps>((props, ref) => (
  <Animated.View layout={LinearTransition}>
    <AppTextInput ref={ref} {...props} />
  </Animated.View>
));
