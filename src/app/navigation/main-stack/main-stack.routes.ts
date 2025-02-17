export enum MainStackRoutes {
  BottomTabs = 'BottomTabs',
  AddMovie = 'AddMovie',
  Movie = 'Movie',
}

export type MainStackParamList = {
  [MainStackRoutes.BottomTabs]: undefined;
  [MainStackRoutes.AddMovie]: undefined;
  [MainStackRoutes.Movie]: { movieId: string };
};
