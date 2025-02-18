import Ionicons from '@expo/vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CompositeScreenProps } from '@react-navigation/native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, FlatList, ListRenderItem, RefreshControl } from 'react-native';

import { useAppDispatch } from '@store/hooks';
import { usePalette } from '@theme/usePalette.hook';
import { useMovies } from '@app/hooks/useMovies.hook';
import { useDebounce } from '@app/hooks/useDebounce.hook';
import { MovieSummary } from '@services/movies/movies.dto';
import { useLocalization } from '@localization/useLocalization.hook';
import { MovieCard } from '@components/cards/movie-card/MovieCard.component';
import { BigHeader } from '@components/headers/big-header/BigHeader.component';
import { IconButton } from '@components/buttons/icon-button/IconButton.component';
import { AppTextInput } from '@components/inputs/app-text-input/AppTextInput.component';
import { fetchMoreMovies, fetchMovies, refreshMovies } from '@store/slices/movies.slice';
import { MainStackParamList, MainStackRoutes } from '@navigation/main-stack/main-stack.routes';
import { BottomTabsParamList, BottomTabsRoutes } from '@navigation/main-stack/bottom-tabs/bottom-tabs.routes';

import { styles } from './movies.styles';

const MOVIE_CARD_HEIGHT = 150;

export const Movies: React.FC<
  CompositeScreenProps<
    BottomTabScreenProps<BottomTabsParamList, BottomTabsRoutes.Movies>,
    NativeStackScreenProps<MainStackParamList, MainStackRoutes.AddMovie>
  >
> = ({ navigation }) => {
  const [query, setQuery] = useState('');

  const { t } = useLocalization();
  const { onPrimary, primary, text } = usePalette();

  const movies = useMovies();
  const dispatch = useAppDispatch();

  const debouncedQuery = useDebounce(query);

  // Todo: remove filteredData when BE fix token
  const filteredData = useMemo(
    () => movies.data.filter(el => el.title.toLowerCase().includes(debouncedQuery.trim().toLowerCase())),
    [debouncedQuery, movies.data],
  );

  useEffect(() => {
    dispatch(fetchMovies({ search: debouncedQuery, offset: 0 }));
  }, [debouncedQuery]);

  const onEndReached = () => {
    if (movies.hasMore) {
      fetchMoreMovies({ offset: movies.offset, search: debouncedQuery });
    }
  };

  const onRefresh = () => {
    dispatch(refreshMovies({ search: debouncedQuery }));
  };

  const getItemLayout = (_data: ArrayLike<MovieSummary> | null | undefined, index: number) => ({
    length: MOVIE_CARD_HEIGHT,
    offset: MOVIE_CARD_HEIGHT * index,
    index: index,
  });

  const navigateToAddMovie = () => navigation.navigate(MainStackRoutes.AddMovie);
  const navigateToMovie = useCallback((movieId: number) => navigation.navigate(MainStackRoutes.Movie, { movieId }), []);

  const renderMovieCard: ListRenderItem<MovieSummary> = useCallback(
    ({ item }) => <MovieCard style={{ height: MOVIE_CARD_HEIGHT }} movie={item} onMovieCardPress={navigateToMovie} />,
    [],
  );

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <BigHeader
        title={t('movies')}
        endElement={
          <IconButton
            onPress={navigateToAddMovie}
            icon={<Ionicons name="add" size={24} color={onPrimary} />}
            style={[{ backgroundColor: primary }, styles.addButton]}
          />
        }
      />
      <AppTextInput type="search" value={query} onChangeText={setQuery} style={styles.searchInput} containerStyle={styles.searchInputContainer} />
      <FlatList
        // Todo: replace with movies.data when BE fix token
        data={filteredData}
        renderItem={renderMovieCard}
        onEndReached={onEndReached}
        refreshControl={<RefreshControl refreshing={movies.refreshing} onRefresh={onRefresh} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={movies.loading ? <ActivityIndicator style={styles.activityIndicator} color={text} /> : null}
        contentContainerStyle={styles.list}
        initialNumToRender={10}
        getItemLayout={getItemLayout}
      />
    </SafeAreaView>
  );
};
