import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  textInputContainer: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    paddingHorizontal: 16,

    borderWidth: 1,
    borderRadius: 4,
  },
  textInput: {
    flex: 1,
    lineHeight: 20,

    paddingVertical: 19,
    paddingStart: 20,
  },
  error: {
    paddingTop: 8,
  },
});
