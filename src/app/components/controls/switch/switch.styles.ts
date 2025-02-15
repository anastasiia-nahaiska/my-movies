import { StyleSheet } from 'react-native';

export const THUMB_SIZE = 20;

export const styles = StyleSheet.create({
  container: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  switch: {
    justifyContent: 'center',

    width: 44,
    height: 24,
    borderRadius: 20,
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: 20,

    shadowOpacity: 0.14,
    shadowRadius: 2,
    elevation: 2,
  },
});
