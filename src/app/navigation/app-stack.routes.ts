export enum AppStackRoutes {
  Auth = 'Auth',
  BottomTabs = 'BottomTabs',
  Movie = 'Movie',
}

export type AppStackParamList = {
  [AppStackRoutes.Auth]: undefined;
  [AppStackRoutes.BottomTabs]: undefined;
  [AppStackRoutes.Movie]: { movieId: string };
};
