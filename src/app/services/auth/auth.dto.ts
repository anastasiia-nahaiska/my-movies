import { ResponseStatus } from '@app/types/statuses.types';

export interface SessionResponse {
  status: ResponseStatus;
  token: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
