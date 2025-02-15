import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { usePalette } from '@theme/usePalette.hook';
import { Welcome } from '@app/screens/auth/welcome/Welcome.screen';
import { AppStackParamList, AppStackRoutes } from '@navigation/app-stack.routes';

import { AuthSackParamList, AuthStackRoutes } from './auth-stack.routes';

const Stack = createNativeStackNavigator<AuthSackParamList>();

export const AuthStack: React.FC<NativeStackScreenProps<AppStackParamList, AppStackRoutes.Auth>> = () => {
  const { background } = usePalette();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: background } }}>
      <Stack.Screen name={AuthStackRoutes.Welcome} component={Welcome} />
    </Stack.Navigator>
  );
};
