import React, { useMemo } from 'react';
import { View, ViewProps } from 'react-native';

import { AppText, Typography } from '@components/app-text';
import { Movie } from '@services/movies/models/movie.model';
import { useLocalization } from '@localization/useLocalization.hook';
import { MovieCardDetail } from '@components/cards/movie-card/movie-card-detail/MovieCardDetail.component';

import { styles } from './movie-details.styles';

interface MovieDetailsProps extends ViewProps {
  movie: Movie;
}

export const MovieDetails: React.FC<MovieDetailsProps> = ({ movie, style, ...props }) => {
  const { t } = useLocalization();

  const actorsString = useMemo(() => movie.actors?.map(el => el.name).join(', '), [movie]);

  return (
    <View style={[styles.container, style]} {...props}>
      <AppText typography={Typography.Heading2}>{movie.title}</AppText>
      <MovieCardDetail title={`${t('year')}:`} value={movie.year.toString()} />
      <MovieCardDetail title={`${t('format')}:`} value={movie.format} />
      <AppText>{`${t('actors')}:`}</AppText>
      <AppText>{actorsString}</AppText>
    </View>
  );
};
