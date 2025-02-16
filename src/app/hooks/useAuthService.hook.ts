import { useRef } from 'react';

import { AuthService } from '@services/auth/auth.service';

export const useAuthService = () => {
  const authService = useRef(new AuthService());

  return authService.current;
};
