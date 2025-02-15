export enum AuthStackRoutes {
  Welcome = 'Welcome',
  SignIn = 'SignIn',
  SignUp = 'SignUp',
}

export type AuthSackParamList = {
  [AuthStackRoutes.Welcome]: undefined;
  [AuthStackRoutes.SignIn]: undefined;
  [AuthStackRoutes.SignUp]: undefined;
};
