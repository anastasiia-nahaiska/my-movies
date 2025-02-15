import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { usePalette } from '@theme/usePalette.hook';

import { AuthStack } from './auth-stack/AuthStack.navigation';
import { AppStackParamList, AppStackRoutes } from './app-stack.routes';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const { background } = usePalette();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: background } }}>
      <Stack.Screen name={AppStackRoutes.Auth} component={AuthStack} />
    </Stack.Navigator>
  );
};
