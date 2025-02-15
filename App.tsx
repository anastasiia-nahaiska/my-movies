import { useEffect } from 'react';
import { StyleSheet, Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';

import { Theme } from '@theme/theme.types';
import { ThemeProvider } from '@theme/theme.provider';
import { AppText } from '@components/app-text/AppText.component';
import { PrimaryButton } from '@components/buttons/primary-button/PrimaryButton.component';

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
      <SafeAreaProvider style={[styles.container, { backgroundColor: '#0B090A' }]}>
        <AppText style={{ fontFamily: 'OpenSans-Regular' }}>Hello World!</AppText>
        <AppText style={{ fontFamily: 'OpenSans-SemiBold' }}>Hello World!</AppText>
        <PrimaryButton title="Sign In" />
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'center',
  },
});
