import React, { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppSelector } from '@store/hooks';
import { usePalette } from '@theme/usePalette.hook';
import { useAuthService } from '@app/hooks/useAuthService.hook';
import { BottomTabs } from '@navigation/bottom-tabs/BottomTabs.navigation';
import { AppStackParamList, AppStackRoutes } from '@navigation/app-stack.routes';

import { MainStackParamList, MainStackRoutes } from './main-stack.routes';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack: React.FC<NativeStackScreenProps<AppStackParamList, AppStackRoutes.MainStack>> = ({ navigation }) => {
  const { background } = usePalette();
  const authService = useAuthService();
  const { isSessionExpired } = useAppSelector(store => store.session);

  useEffect(() => {
    if (isSessionExpired && authService.isAuthorized) {
      handleSessionExpired();
    }
  }, [isSessionExpired, authService]);

  const handleSessionExpired = () => {
    authService.signOut();
    navigation.dispatch(CommonActions.reset({ routes: [{ name: AppStackRoutes.Auth }], index: 0 }));
  };

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: background } }}>
      <Stack.Screen name={MainStackRoutes.BottomTabs} component={BottomTabs} />
    </Stack.Navigator>
  );
};
