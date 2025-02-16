import React, { useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlatList, ListRenderItem } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { usePalette } from '@theme/usePalette.hook';
import { MovieFromApi } from '@services/movie/movie.dto';
import { MovieCard } from '@components/cards/movie-card/MovieCard.component';
import { BigHeader } from '@components/headers/big-header/BigHeader.component';
import { IconButton } from '@components/buttons/icon-button/IconButton.component';
import { AppTextInput } from '@components/inputs/app-text-input/AppTextInput.component';

import mock from './mock.json';
import { styles } from './movies.styles';
import { useLocalization } from '@localization/useLocalization.hook';

const MOVIE_CARD_HEIGHT = 150;

export const Movies: React.FC = () => {
  const { t } = useLocalization();
  const { text, primary } = usePalette();

  const renderMovieCard: ListRenderItem<MovieFromApi> = useCallback(({ item }) => <MovieCard movie={item} />, []);

  const getItemLayout = (_data: ArrayLike<MovieFromApi> | null | undefined, index: number) => ({
    length: MOVIE_CARD_HEIGHT,
    offset: MOVIE_CARD_HEIGHT * index,
    index: index,
  });

  return (
    <SafeAreaView style={styles.container}>
      <BigHeader
        title={t('movies')}
        endElement={
          <IconButton
            icon={<Ionicons name="add" size={24} color={text} />}
            onPress={() => null}
            style={[{ backgroundColor: primary }, styles.addButton]}
          />
        }
      />
      <AppTextInput type="search" style={{ paddingVertical: 12 }} containerStyle={styles.search} />
      <FlatList
        data={mock.data}
        renderItem={renderMovieCard}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
};
