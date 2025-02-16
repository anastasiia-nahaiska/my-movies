import { createSlice } from '@reduxjs/toolkit';

interface SessionState {
  isSessionExpired: boolean;
}

const initialState: SessionState = {
  isSessionExpired: false,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    expireSession(state) {
      state.isSessionExpired = true;
    },
    startSession(state) {
      state.isSessionExpired = false;
    },
  },
});
