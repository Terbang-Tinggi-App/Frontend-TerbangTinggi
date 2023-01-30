import { createAsyncThunk } from '@reduxjs/toolkit';

import { axios } from '@/lib/axios';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, confirmPassword, username }, { rejectWithValue }) => {
    try {
      await axios.post('/auth/register', {
        email,
        password,
        confirmPassword,
        username
      });
      return null;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token);
      return data;
    } catch (error) {
      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const loginGoogle = createAsyncThunk(
  'auth/loginGoogle',
  async (accessToken) => {
    const { token } = await axios.post('/auth/google', {
      access_token: accessToken
    });

    localStorage.setItem('token', token);

    const { data } = await axios.get('/auth/me');
    const { id, username, email, role } = data ?? {};

    return {
      token,
      id,
      name: username,
      email,
      role
    };
  },
  (arg, error) => ({ payload: arg, error: error.response.data.message })
);

export const whoami = createAsyncThunk('auth/whoami', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axios.get('/auth/me');
    return data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});
