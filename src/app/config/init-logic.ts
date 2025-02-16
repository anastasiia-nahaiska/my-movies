import { AuthService } from '@services/auth/auth.service';
import { LocalizationService } from '@localization/localization.service';

import { Http } from './http';
import { Memory } from './memory';
import { injector } from './injector';

export const initLogic = () => {
  injector.set(Memory, new Memory());
  injector.set(LocalizationService, new LocalizationService());
  injector.set(Http, new Http(process.env.EXPO_PUBLIC_API_URL));

  injector.set(AuthService, new AuthService());
};
