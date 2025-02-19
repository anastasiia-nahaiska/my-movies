import { type ViewProps } from 'react-native';
import React, { createRef, useCallback, useImperativeHandle, useRef, useState } from 'react';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

import { usePalette } from '@theme/usePalette.hook';
import { AppText, Typography } from '@components/app-text';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { styles } from './toast.styles';

export enum ToastType {
  Error = 'Error',
  Info = 'Info',
}

export interface ToastData {
  message: string;
  toastType?: ToastType;
}

export interface ToastRef {
  show: (toastData: ToastData) => void;
  dismiss: () => void;
}

export interface ToastProps extends ViewProps {
  offset?: number;
  duration?: number;

  animationDuration?: number;
}

const DISAPPEAR_COEFF = 0.5;

const DEFAULT_OFFSET = 64;
const DEFAULT_SHOW_DURATION = 2000;
const DEFAULT_ANIMATION_DURATION = 500;

const ToastComponent = React.forwardRef<ToastRef, ToastProps>(
  (
    {
      offset = DEFAULT_OFFSET,
      duration = DEFAULT_SHOW_DURATION,

      style,
      animationDuration = DEFAULT_ANIMATION_DURATION,

      ...props
    },
    ref,
  ) => {
    const [toastData, setToastData] = useState<ToastData>({ message: '', toastType: ToastType.Info });

    const visibility = useSharedValue(0);
    const { surfaceVariant, text, error } = usePalette();
    const timeout = useRef<NodeJS.Timeout | null>(null);

    const hideToast = useCallback(() => {
      visibility.value = withTiming(0, { duration: animationDuration });

      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    }, [animationDuration, timeout.current]);

    useImperativeHandle(
      ref,
      () => ({
        show(toastData: ToastData) {
          setToastData(toastData);
          visibility.value = withTiming(1, { duration: animationDuration });

          timeout.current = setTimeout(() => {
            hideToast();
          }, duration);
        },
        dismiss() {
          hideToast();

          timeout.current = null;
        },
      }),
      [hideToast, animationDuration, duration],
    );

    const toastAnimatedStyle = useAnimatedStyle(
      () => ({
        opacity: visibility.value,
        top: interpolate(visibility.value, [0, 1], [offset * DISAPPEAR_COEFF, offset]),
      }),
      [offset],
    );

    return (
      <Animated.View style={[styles.container, { backgroundColor: surfaceVariant }, toastAnimatedStyle, style]} {...props}>
        {toastData.toastType === ToastType.Error && <MaterialIcons name="error" size={24} color={error} />}
        <AppText style={[{ color: text }, styles.supportingText]} typography={Typography.Body}>
          {toastData.message}
        </AppText>
      </Animated.View>
    );
  },
);

export const toastRef = createRef<ToastRef>();

export const Toast = Object.assign(
  {
    show: (message: string, toastType?: ToastType) => {
      toastRef.current?.show({ message, toastType });
    },
    dismiss: () => {
      toastRef.current?.dismiss();
    },
  },
  ToastComponent,
);
