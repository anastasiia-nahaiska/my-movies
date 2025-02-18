import { CreateUserRequest } from '@services/auth/auth.dto';

export const userToCreate: CreateUserRequest = {
  email: 'test-email@gmail.com',
  name: 'Test',
  password: 'password',
  confirmPassword: 'password',
};
