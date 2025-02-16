export enum MainStackRoutes {
  BottomTabs = 'BottomTabs',
  Movie = 'Movie',
}

export type MainStackParamList = {
  [MainStackRoutes.BottomTabs]: undefined;
  [MainStackRoutes.Movie]: { movieId: string };
};
