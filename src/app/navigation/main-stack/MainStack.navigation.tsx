import React, { useEffect } from 'react';
import { createNativeStackNavigator, NativeStackScreenProps } from '@react-navigation/native-stack';

import { useAppSelector } from '@store/hooks';
import { usePalette } from '@theme/usePalette.hook';
import { useSignOut } from '@app/hooks/useSignOut.hook';
import { Movie } from '@app/screens/main/movie/Movie.screen';
import { useAuthService } from '@app/hooks/useAuthService.hook';
import { AddMovie } from '@app/screens/main/add-movie/AddMovie.screen';
import { AppStackParamList, AppStackRoutes } from '@navigation/app-stack.routes';
import { BottomTabs } from '@navigation/main-stack/bottom-tabs/BottomTabs.navigation';

import { MainStackParamList, MainStackRoutes } from './main-stack.routes';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainStack: React.FC<NativeStackScreenProps<AppStackParamList, AppStackRoutes.MainStack>> = ({ navigation }) => {
  const { background } = usePalette();
  const authService = useAuthService();

  const signOut = useSignOut();
  const { isSessionExpired } = useAppSelector(store => store.session);

  useEffect(() => {
    if (isSessionExpired && authService.isAuthorized) {
      signOut();
    }
  }, [isSessionExpired, authService]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: background } }}>
      <Stack.Screen name={MainStackRoutes.BottomTabs} component={BottomTabs} />
      <Stack.Screen name={MainStackRoutes.AddMovie} component={AddMovie} />
      <Stack.Screen name={MainStackRoutes.Movie} component={Movie} />
    </Stack.Navigator>
  );
};
