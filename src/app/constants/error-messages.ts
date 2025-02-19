import { AxiosResponse } from 'axios';

export const STATUS_MESSAGES: Record<AxiosResponse['status'], string> = {
  400: 'httpErrors.badRequest',
  401: 'httpErrors.unauthorized',
  403: 'httpErrors.forbidden',
  404: 'httpErrors.notFound',
  500: 'httpErrors.somethingWentWrong',
};

export const AXIOS_ERROR_MESSAGES: Record<string, string> = {
  ECONNABORTED: 'httpErrors.econnaborted',
  ERR_NETWORK: 'httpErrors.networkError',
};

export const NETWORK_ERROR_MESSAGE = 'httpErrors.networkError';
