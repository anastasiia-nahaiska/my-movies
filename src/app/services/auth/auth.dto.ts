import { StatusCode } from '@app/types/statuses';

export interface SessionResponse {
  status: StatusCode;
  token: string;
}

export interface CreateUserRequest {
  email: string;
  name: string;
  password: string;
  confirmPassword: string;
}
