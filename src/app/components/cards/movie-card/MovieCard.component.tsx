import React, { memo } from 'react';
import { View, ViewProps } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { usePalette } from '@theme/usePalette.hook';
import { Line } from '@components/line/Line.component';
import { MovieFromApi } from '@services/movie/movie.dto';
import { AppText, Typography } from '@components/app-text';

import { styles } from './movie-card.styles';
import { BaseCard } from '../base-card/BaseCard.component';
import { MovieCardDetail } from './movie-card-detail/MovieCardDetail.component';
import { useLocalization } from '@localization/useLocalization.hook';

interface MovieCardProp extends ViewProps {
  movie: MovieFromApi;
}

export const MovieCard: React.FC<MovieCardProp> = memo(({ movie, style, ...props }) => {
  const { t } = useLocalization();
  const { disabledText } = usePalette();

  return (
    <BaseCard style={[styles.container, style]} {...props}>
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
