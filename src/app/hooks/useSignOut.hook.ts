import { useRef } from 'react';
import { CommonActions, useNavigation } from '@react-navigation/native';

import { AuthService } from '@services/auth/auth.service';
import { AppStackRoutes } from '@navigation/app-stack.routes';

export const useSignOut = () => {
  const navigation = useNavigation();
  const authService = useRef(new AuthService());

  const signOut = () => {
    authService.current.signOut();
    navigation.dispatch(CommonActions.reset({ routes: [{ name: AppStackRoutes.Auth }], index: 0 }));
  };

  return signOut;
};
