import { useRef } from 'react';

import { injector } from '@config/injector';
import { AuthService } from '@services/auth/auth.service';

export const useAuthService = () => {
  const authService = useRef(injector.get(AuthService));

  return authService.current;
};
