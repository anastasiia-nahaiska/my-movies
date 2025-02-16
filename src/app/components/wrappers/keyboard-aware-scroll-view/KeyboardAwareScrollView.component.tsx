import React, { PropsWithChildren } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { KeyboardAvoidingView, KeyboardAvoidingViewProps, ScrollView, ScrollViewProps, StyleProp, ViewStyle } from 'react-native';

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
}) => {
  const insets = useSafeAreaInsets();

  return (
    <KeyboardAvoidingView
      behavior={behavior ?? 'padding'}
      keyboardVerticalOffset={keyboardVerticalOffset ?? insets.top}
      enabled={enabled}
      style={[styles.flex, containerStyle]}>
      <ScrollView
        bounces={false}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.flex, contentContainerStyle]}
        {...props}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
