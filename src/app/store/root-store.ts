import { configureStore } from '@reduxjs/toolkit';

import { sessionSlice } from './slices/session.slice';
import { moviesSlice } from './slices/movies.slice';

export const rootStore = configureStore({
  reducer: {
    [sessionSlice.name]: sessionSlice.reducer,
    [moviesSlice.name]: moviesSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof rootStore.dispatch;
export type RootStore = ReturnType<typeof rootStore.getState>;
