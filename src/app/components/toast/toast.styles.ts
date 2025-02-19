import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    start: 16,
    end: 16,

    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,

    padding: 16,

    borderRadius: 8,
  },
  supportingText: {
    flex: 1,
  },
});
