import { Platform } from 'react-native';

import { Config } from '@app/types/config';
import { DEFAULT_LOCAL_HOST_BASED_API_URL } from '@app/constants/urls';

const getLocalHostHApiUrlBasedOnPlatform = () =>
  Platform.select({
    ios: process.env.EXPO_PUBLIC_IOS_API_URL,
    android: process.env.EXPO_PUBLIC_ANDROID_API_URL,
    default: DEFAULT_LOCAL_HOST_BASED_API_URL,
  });

export const config: Config = {
  API_URL: getLocalHostHApiUrlBasedOnPlatform(),
};
