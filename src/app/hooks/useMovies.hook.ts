import { useAppSelector } from '@store/hooks';

export const useMovies = () => {
  const movies = useAppSelector(store => store.movies);

  return movies;
};
