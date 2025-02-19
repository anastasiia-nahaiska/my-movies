import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { Appearance } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { hide, preventAutoHideAsync } from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Theme } from '@theme/theme.types';
import { rootStore } from '@store/root-store';
import { ThemeProvider } from '@theme/theme.provider';
import { AppStack } from '@navigation/AppStack.navigation';
import { Toast, toastRef } from '@components/toast/Toast.component';
import { LocalizationProvider } from '@app/localization/LocalizationProvider.context';

preventAutoHideAsync();

export default function App() {
  useEffect(() => {
    hide();
  }, []);

  return (
    <Provider store={rootStore}>
      <SafeAreaProvider>
        <LocalizationProvider>
          <ThemeProvider theme={Appearance.getColorScheme() === 'dark' ? Theme.Dark : Theme.Light}>
            <NavigationContainer>
              <AppStack />
            </NavigationContainer>
          </ThemeProvider>
        </LocalizationProvider>
      </SafeAreaProvider>
      <Toast ref={toastRef} />
    </Provider>
  );
}
