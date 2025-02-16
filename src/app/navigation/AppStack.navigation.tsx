import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { usePalette } from '@theme/usePalette.hook';
import { useAuthService } from '@app/hooks/useAuthService.hook';

import { MainStack } from './main-stack/MainStack.navigation';
import { AuthStack } from './auth-stack/AuthStack.navigation';
import { AppStackParamList, AppStackRoutes } from './app-stack.routes';

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  const { background } = usePalette();
  const authService = useAuthService();

  const initialRouteName = authService.isAuthorized ? AppStackRoutes.MainStack : AppStackRoutes.Auth;

  return (
    <Stack.Navigator initialRouteName={initialRouteName} screenOptions={{ headerShown: false, contentStyle: { backgroundColor: background } }}>
      <Stack.Screen name={AppStackRoutes.Auth} component={AuthStack} />
      <Stack.Screen name={AppStackRoutes.MainStack} component={MainStack} />
    </Stack.Navigator>
  );
};
