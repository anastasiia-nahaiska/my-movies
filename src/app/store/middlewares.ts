import { t } from 'i18next';
import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';

import { Toast, ToastType } from '@components/toast/Toast.component';

export const errorHandlingMiddleware: Middleware = () => next => action => {
  if (isRejectedWithValue(action)) {
    Toast.show('data' in action.error ? (action.error.data as { message: string }).message : t('httpErrors.somethingWentWrong'), ToastType.Error);
  }

  return next(action);
};
