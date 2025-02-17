import React, { memo } from 'react';
import { TouchableOpacityProps, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { usePalette } from '@theme/usePalette.hook';
import { Line } from '@components/line/Line.component';
import { MovieSummary } from '@services/movies/movies.dto';
import { AppText, Typography } from '@components/app-text';

import { styles } from './movie-card.styles';
import { BaseCard } from '../base-card/BaseCard.component';
import { MovieCardDetail } from './movie-card-detail/MovieCardDetail.component';
import { useLocalization } from '@localization/useLocalization.hook';

interface MovieCardProp extends Omit<TouchableOpacityProps, 'onPress'> {
  movie: MovieSummary;

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
      <View style={styles.header}>
        <AppText typography={Typography.Heading3}>{movie.title}</AppText>
        <Ionicons name="film" size={24} color={disabledText} />
      </View>
      <Line style={{ backgroundColor: disabledText, opacity: 0.7 }} />
      <View style={styles.details}>
        <MovieCardDetail title={`${t('year')}:`} value={movie.year.toString()} />
        <MovieCardDetail title={`${t('format')}:`} value={movie.format} />
      </View>
    </BaseCard>
  );
});
