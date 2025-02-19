import { AxiosError } from 'axios';

import { TranslateFunc } from '@localization/localization.service';
import { Toast, ToastType } from '@components/toast/Toast.component';
import { AXIOS_ERROR_MESSAGES, NETWORK_ERROR_MESSAGE, STATUS_MESSAGES } from '@app/constants/error-messages';

export const showToastWithError = (error: unknown, t: TranslateFunc, customMessage?: string) => {
  if (customMessage) {
    Toast.show(customMessage, ToastType.Error);

    return;
  }

  let message = 'httpErrors.somethingWentWrong';

  if (error instanceof AxiosError) {
    message = getErrorMessageFromAxiosError(error);
  } else if (error instanceof Error) {
    message = error.message;
  }

  Toast.show(t(message || 'httpErrors.somethingWentWrong'), ToastType.Error);
};

const getErrorMessageFromAxiosError = (error: AxiosError) => {
  if (!error.response && error.code) {
    return AXIOS_ERROR_MESSAGES[error.code] ?? NETWORK_ERROR_MESSAGE;
  } else if (error.response?.status) {
    return STATUS_MESSAGES[error.response?.status];
  }

  return 'httpErrors.somethingWentWrong';
};
