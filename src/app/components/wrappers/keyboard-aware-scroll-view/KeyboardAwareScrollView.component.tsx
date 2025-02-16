import React, { PropsWithChildren } from 'react';
import { initialWindowMetrics } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, Platform, ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

import { styles } from './keyboard-aware-scroll-view.styles';

export type BaseKeyboardAwareScrollViewProps = KeyboardAvoidingViewProps & ScrollViewProps;

export interface KeyboardAwareScrollViewProps extends BaseKeyboardAwareScrollViewProps {
  containerStyle?: StyleProp<ViewStyle>;
}

export const KeyboardAwareScrollView: React.FC<PropsWithChildren<KeyboardAwareScrollViewProps>> = ({
  enabled,
  behavior,
  containerStyle,
  keyboardVerticalOffset,
  contentContainerStyle,
  children,
  ...props
}) => (
  <KeyboardAvoidingView
    behavior={behavior ?? 'padding'}
    keyboardVerticalOffset={keyboardVerticalOffset ?? Platform.select({ ios: 0, android: initialWindowMetrics?.insets.top })}
    enabled={enabled}
    style={[styles.keyboardAvoid, containerStyle]}>
    <ScrollView
      bounces={false}
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.scrollView, contentContainerStyle]}
      {...props}>
      {children}
    </ScrollView>
  </KeyboardAvoidingView>
);
