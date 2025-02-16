import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { MovieService } from '@services/movies/movies.service';
import { MovieFromApi, GetMovieResponse } from '@services/movies/movies.dto';
import { GetMoviesParams, Order, SortMoviesBy } from '@services/movies/movies.types';

import mock from './mock.json';

const LIMIT = 10;
const movieService = new MovieService();

export const fetchMovies = createAsyncThunk<GetMovieResponse, Partial<GetMoviesParams>>('fetchMovies', async (_params = {}) => {
  // Todo: uncomment when BE fix token

  // const res = await movieService.getMovies({ ...params, limit: LIMIT, sort: SortMoviesBy.Title, order: Order.ASC });

  return mock;
});

export const refreshMovies = createAsyncThunk<GetMovieResponse, Partial<GetMoviesParams>>('refreshMovies', async (_params = {}) => {
  // Todo: uncomment when BE fix token

  // const res = await movieService.getMovies({ ...params, sort: SortMoviesBy.Title, order: Order.ASC, offset: 0 });

  return mock;
});

export const fetchMoreMovies = createAsyncThunk<GetMovieResponse, Partial<GetMoviesParams>>('loadMoreMovies', async (params = {}) => {
  const res = await movieService.getMovies({ ...params, limit: LIMIT, sort: SortMoviesBy.Title, order: Order.ASC });

  return res;
});

interface MoviesState {
  data: MovieFromApi[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
  error: string | null;
  refreshing: boolean;
  hasMore: boolean;
}

const initialState: MoviesState = {
  data: [],
  total: 0,
  offset: 0,
  limit: 10,
  loading: false,
  error: null,
  refreshing: false,
  hasMore: true,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchMovies.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data ?? [];
        state.total = action.payload.meta?.total ?? 0;
        state.offset = action.payload.data?.length ?? 0;
        state.hasMore = state.offset < state.total;
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(refreshMovies.pending, state => {
        state.refreshing = true;
      })
      .addCase(refreshMovies.fulfilled, (state, action) => {
        state.refreshing = false;
        state.data = action.payload.data ?? [];
        state.total = action.payload.meta?.total ?? 0;
        state.offset = action.payload.data?.length ?? 0;
        state.hasMore = state.offset < state.total;
      })
      .addCase(refreshMovies.rejected, (state, action) => {
        state.refreshing = false;
        state.error = action.payload as string;
      })
      .addCase(fetchMoreMovies.pending, state => {
        state.loading = true;
      })
      .addCase(fetchMoreMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.data = [...state.data, ...(action.payload.data ?? [])];
        state.offset += action.payload.data?.length ?? 0;
        state.hasMore = state.offset < state.total;
      })
      .addCase(fetchMoreMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
