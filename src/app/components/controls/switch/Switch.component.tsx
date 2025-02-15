import React, { useEffect } from 'react';
import { Pressable, PressableProps, StyleProp, ViewStyle } from 'react-native';
import Animated, { interpolateColor, withTiming, useSharedValue, useAnimatedStyle } from 'react-native-reanimated';

import { usePalette } from '@theme/usePalette.hook';

import { styles, THUMB_SIZE } from './switch.styles';

const THUMB_TO_EDGE_DISTANCE = 2;
const RIGHT_THUMB_TO_EDGE_DISTANCE = THUMB_SIZE + THUMB_TO_EDGE_DISTANCE;

interface Props extends PressableProps {
  selected: boolean;

  labelStart?: React.ReactNode;
  labelEnd?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export const Switch: React.FC<Props> = ({ selected = false, labelStart, labelEnd, style, ...props }) => {
  const { primary, onPrimary, surface } = usePalette();
  const start = useSharedValue(selected ? RIGHT_THUMB_TO_EDGE_DISTANCE : THUMB_TO_EDGE_DISTANCE);

  useEffect(() => {
    start.value = withTiming(selected ? RIGHT_THUMB_TO_EDGE_DISTANCE : THUMB_TO_EDGE_DISTANCE);
  }, [selected]);

  const containerAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(start.value, [THUMB_TO_EDGE_DISTANCE, RIGHT_THUMB_TO_EDGE_DISTANCE], [surface, primary] as string[]),
  }));

  const thumbAnimatedStyle = useAnimatedStyle(
    () => ({
      start: start.value,
    }),
    [],
  );

  return (
    <Pressable style={[styles.container, style]} {...props}>
      {labelStart}
      <Animated.View style={[styles.switch, containerAnimatedStyle]}>
        <Animated.View style={[styles.thumb, { backgroundColor: onPrimary, shadowColor: onPrimary }, thumbAnimatedStyle]} />
      </Animated.View>
      {labelEnd}
    </Pressable>
  );
};
