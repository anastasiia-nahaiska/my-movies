import { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { useMovies } from '@app/hooks/useMovies.hook';
import { useLocalization } from '@localization/useLocalization.hook';
import { Movie as MovieModel } from '@services/movies/movies.models';
import { DefaultHeader } from '@components/headers/default-header/DefaultHeader.component';
import { MainStackParamList, MainStackRoutes } from '@navigation/main-stack/main-stack.routes';

import { styles } from './movie.styles';
import { MovieDetails } from './movie-details/MovieDetail.screen';

export const Movie: React.FC<NativeStackScreenProps<MainStackParamList, MainStackRoutes.Movie>> = ({ navigation, route }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movie, setMovie] = useState<MovieModel | null>(null);

  const { data } = useMovies();

  useEffect(() => {
    fetchMovie();
  }, []);

  const fetchMovie = async () => {
    try {
      // Todo: uncomment when BE fix token and remove mock getting
      // const fetchedMovie = await new MovieService().getMovie(route.params.movieId);

      const fetchedMovie = data.find(el => el.id === route.params.movieId);

      setMovie(fetchedMovie ?? null);
    } catch (e) {
      throw new Error(`${e}`);
    } finally {
      setIsLoading(false);
    }
  };

  const { t } = useLocalization();

  return (
    <SafeAreaView style={styles.container}>
      <DefaultHeader title={t('aboutMovie')} onArrowBackPress={navigation.goBack} />
      {isLoading && <ActivityIndicator />}
      {movie && <MovieDetails movie={movie} />}
    </SafeAreaView>
  );
};
