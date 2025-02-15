import { useEffect } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';

import { Theme } from '@theme/theme.types';
import { ThemeProvider } from '@theme/theme.provider';
import { ThemedText } from '@components/themed-text/ThemedText.component';

preventAutoHideAsync();

const SPLASH_SCREEN_DELAY = 2000;

export default function App() {
  useEffect(() => {
    setTimeout(async () => {
      await hideAsync();
    }, SPLASH_SCREEN_DELAY);
  }, []);

  return (
    <ThemeProvider theme={Appearance.getColorScheme() === 'dark' ? Theme.Dark : Theme.Light}>
      <SafeAreaProvider style={styles.container}>
        <ThemedText style={{ fontFamily: 'OpenSans-Regular' }}>Hello World!</ThemedText>
        <ThemedText style={{ fontFamily: 'OpenSans-SemiBold' }}>Hello World!</ThemedText>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
