import { createSlice, createSelector } from '@reduxjs/toolkit';

import {
  login,
  loginGoogle,
  registerUser,
  whoami,
  forgotPassword,
  resetPassword
} from './auth.actions';

const initialState = {
  loading: false,
  userInfo: null,
  userToken: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  error: null,
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem('token');
      state.error = null;
      state.loading = false;
      state.success = false;
      state.userInfo = null;
      state.userToken = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(login.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(loginGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginGoogle.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
        state.userToken = payload.token;
      })
      .addCase(loginGoogle.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(whoami.pending, (state) => {
        state.loading = true;
      })
      .addCase(whoami.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userInfo = payload;
      })
      .addCase(whoami.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(forgotPassword.pending, (state) => {
        state.error = false;
        state.success = false;
        state.loading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.success = payload.success;
      })
      .addCase(forgotPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      })
      .addCase(resetPassword.pending, (state) => {
        state.error = false;
        state.loading = true;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = false;
        state.success = payload.status;
      })
      .addCase(resetPassword.rejected, (state, { payload }) => {
        state.loading = false;
        state.success = false;
        state.error = payload;
      });
  }
});

// Selector
const selectAuth = (state) => state.auth;

export const getUserToken = createSelector([selectAuth], (auth) => auth.userToken);
export const getUserInfo = createSelector([selectAuth], (auth) => auth.userInfo);

export const { logout } = authSlice.actions;
export default authSlice.reducer;
