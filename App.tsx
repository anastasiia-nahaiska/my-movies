import { StyleSheet, Text } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { useEffect } from 'react';

// preventAutoHideAsync();

const SPLASH_SCREEN_DELAY = 2000;

export default function App() {
  useEffect(() => {
    // setTimeout(async () => {
    //   await hideAsync();
    // }, SPLASH_SCREEN_DELAY);
  }, []);

  return (
    <SafeAreaProvider style={styles.container}>
      <Text>Hello World!</Text>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
});
