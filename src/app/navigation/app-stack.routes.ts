export enum AppStackRoutes {
  Auth = 'Auth',
  MainStack = 'MainStack',
}

export type AppStackParamList = {
  [AppStackRoutes.Auth]: undefined;
  [AppStackRoutes.MainStack]: undefined;
};
