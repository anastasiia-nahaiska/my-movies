import React, { memo } from 'react';
import { TouchableOpacityProps, View } from 'react-native';

import { usePalette } from '@theme/usePalette.hook';
import { Line } from '@components/line/Line.component';
import { MovieSummaryFromApi } from '@services/movies/movies.dto';
import { useLocalization } from '@localization/useLocalization.hook';

import { styles } from './movie-card.styles';
import { BaseCard } from '../base-card/BaseCard.component';
import { MovieCardDetail } from './movie-card-detail/MovieCardDetail.component';
import { MovieCardHeader } from './movie-card-header/MovieCardHeader.component';

interface MovieCardProp extends Omit<TouchableOpacityProps, 'onPress'> {
  movie: MovieSummaryFromApi;

  onMovieCardPress: (movieId: number) => void;
}

export const MovieCard: React.FC<MovieCardProp> = memo(({ movie, onMovieCardPress, style, ...props }) => {
  const { t } = useLocalization();
  const { disabledText } = usePalette();

  const handlePress = () => {
    onMovieCardPress(movie.id);
  };

  return (
    <BaseCard style={[styles.container, style]} {...props} onPress={handlePress}>
      <MovieCardHeader title={movie.title} />
      <Line style={{ backgroundColor: disabledText, opacity: 0.7 }} />
      <View style={styles.details}>
        <MovieCardDetail title={`${t('year')}:`} value={movie.year.toString()} />
        <MovieCardDetail title={`${t('format')}:`} value={movie.format} />
      </View>
    </BaseCard>
  );
});
