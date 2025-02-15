import { useEffect } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';

import { Theme } from '@theme/theme.types';
import { ThemeProvider } from '@theme/theme.provider';
import { Text } from '@components/text/Text.component';

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
        <Text style={{ fontFamily: 'OpenSans-Regular' }}>Hello World!</Text>
        <Text style={{ fontFamily: 'OpenSans-SemiBold' }}>Hello World!</Text>
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
