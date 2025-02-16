import Ionicons from '@expo/vector-icons/Ionicons';
import React, { useCallback, useEffect, useState } from 'react';
import { NativeSyntheticEvent, TextInput, StyleProp, TextInputFocusEventData, TextInputProps, View, ViewStyle } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, interpolateColor, withTiming, LinearTransition } from 'react-native-reanimated';

import { Typography } from '@components/app-text';
import { usePalette } from '@theme/usePalette.hook';
import { textStyles } from '@components/app-text/app-text.styles';
import { ErrorMessage } from '@components/error-message/ErrorMessage.component';
import { IconButton } from '@components/buttons/icon-button/IconButton.component';

import { styles } from './app-text-input.styles';

type InputType = 'password' | 'text' | 'search';
enum EyeIconName {
  On = 'eye',
  Off = 'eye-off',
}

interface Props extends TextInputProps {
  type?: InputType;
  errorMessage?: string;
  typography?: Typography;
  showClearButton?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textInputContainerStyle?: StyleProp<ViewStyle>;

  onClear?: () => void;
}

export const AppTextInput = React.forwardRef<TextInput, Props>(
  (
    {
      type = 'text',
      errorMessage = '',
      showClearButton = false,
      textInputContainerStyle,
      typography = Typography.Body,

      onClear,

      style,
      containerStyle,

      ...props
    },
    ref,
  ) => {
    const [isVisibleText, setIsVisibleText] = useState(type !== 'password');

    const errorAnim = useSharedValue(0);
    const focusedAnim = useSharedValue(0);

    const { border, surface, error, text, disabledText } = usePalette();

    const isError = errorMessage.length > 0;
    const visibilityIconName = isVisibleText ? EyeIconName.On : EyeIconName.Off;

    useEffect(() => {
      errorAnim.value = withTiming(isError ? 1 : 0);
    }, [isError]);

    const borderAnimatedStyle = useAnimatedStyle(() => {
      const borderColorBeforeError = focusedAnim.value ? border : surface;

      return {
        borderColor: isError
          ? interpolateColor(errorAnim.value, [0, 1], [borderColorBeforeError, error] as string[])
          : interpolateColor(focusedAnim.value, [0, 1], [surface, border] as string[]),
      };
    }, [isError]);

    const handleFocusInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        focusedAnim.value = withTiming(1);

        if (props.onFocus) {
          props.onFocus(e);
        }
      },
      [props.onFocus],
    );

    const handleBlurInput = useCallback(
      (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
        focusedAnim.value = withTiming(0);

        if (props.onBlur) {
          props.onBlur(e);
        }
      },
      [props.onBlur],
    );

    const changeVisibility = useCallback(() => setIsVisibleText(isVisible => !isVisible), []);

    return (
      <Animated.View layout={LinearTransition}>
        <View style={containerStyle}>
          <Animated.View style={[styles.textInputContainer, borderAnimatedStyle, textInputContainerStyle]}>
            {type === 'search' && <Ionicons name="search" size={24} color={surface} />}
            <TextInput
              ref={ref}
              placeholderTextColor={disabledText}
              secureTextEntry={!isVisibleText}
              style={[textStyles[typography], { color: text }, styles.textInput, style]}
              {...props}
              onBlur={handleBlurInput}
              onFocus={handleFocusInput}
            />
            {type === 'password' && (
              <IconButton icon={<Ionicons name={visibilityIconName} size={24} color={surface} />} hitSlop={16} onPress={changeVisibility} />
            )}
            {showClearButton && <IconButton icon={<Ionicons name="close-circle-outline" size={24} color={text} />} hitSlop={16} onPress={onClear} />}
          </Animated.View>
          {isError && <ErrorMessage style={styles.error} errorMessage={errorMessage} />}
        </View>
      </Animated.View>
    );
  },
);
