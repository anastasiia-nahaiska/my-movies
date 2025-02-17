import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import { GetMoviesParams } from '@services/movies/movies.types';
import { MovieSummary, GetMovieResponse, AddMovieRequest, MovieResponse } from '@services/movies/movies.dto';
import { MovieService } from '@services/movies/movies.service';
// import { GetMoviesParams, Order, SortMoviesBy } from '@services/movies/movies.types';

import mock from './mock.json';
import { Movie, MovieActor } from '@services/movies/movies.models';

// Todo: uncomment when BE fix token

// const LIMIT = 10;
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

export const fetchMoreMovies = createAsyncThunk<GetMovieResponse, Partial<GetMoviesParams>>('loadMoreMovies', async (_params = {}) => {
  // const res = await movieService.getMovies({ ...params, limit: LIMIT, sort: SortMoviesBy.Title, order: Order.ASC });

  return [] as unknown as GetMovieResponse;
});

export const addMovie = createAsyncThunk<MovieResponse, AddMovieRequest>('addMovie', async params => {
  const res = await movieService.addMovie(params);

  return res;
});

interface MoviesState {
  data: MovieSummary[];
  total: number;
  offset: number;
  limit: number;
  loading: boolean;
  adding: boolean;
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
  adding: false,
  error: null,
  refreshing: false,
  hasMore: true,
};

export const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    // Todo: removed reducers once BE fix token
    addMovie: (state, { payload }: PayloadAction<AddMovieRequest>) => {
      const today = new Date().toISOString();
      const actors = payload.actors.map(MovieActor.buildItemFromName);
      const movie = new Movie(Math.random(), payload.title, payload.year, payload.format, today, today, actors);
      state.data = [...state.data, movie].sort((curr, next) => curr.title.localeCompare(next.title));
    },
  },
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
      })
      .addCase(addMovie.pending, state => {
        state.adding = true;
      })
      .addCase(addMovie.fulfilled, (state, action) => {
        state.adding = false;

        if (action.payload.data) {
          state.data = [...state.data, action.payload.data].sort((curr, next) => curr.title.localeCompare(next.title));
        }

        state.offset += 1;
        state.hasMore = state.offset < state.total;
      })
      .addCase(addMovie.rejected, (state, action) => {
        state.adding = false;
        state.error = action.payload as string;
      });
  },
});
