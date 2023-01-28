import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { BASE_API_URL } from '../../../config';

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ email, password, confirmPassword, username }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      await axios.post(
        `${BASE_API_URL}/auth/register`,
        { email, password, confirmPassword, username },
        config
      );
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
      const config = {
        headers: {
          'Content-Type': 'application/json'
        }
      };
      const { data } = await axios.post(`${BASE_API_URL}/auth/login`, { email, password }, config);
      localStorage.setItem('token', data.data.token);
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
    const { data: tokenData, status } = await axios.post(`${BASE_API_URL}/auth/google`, {
      access_token: accessToken
    });

    if (status === 200 || status === 201) {
      localStorage.setItem('token', tokenData.token);
    }

    const { data: verifiedData } = await axios.get(`${BASE_API_URL}/auth/me`, {
      headers: {
        Authorization: tokenData.token
      }
    });

    return {
      token: tokenData.token,
      id: verifiedData.data.id,
      name: verifiedData.data.username,
      email: verifiedData.data.email,
      role: verifiedData.data.role
    };
  },
  (arg, error) => ({ payload: arg, error: error.response.data.message })
);

export const whoami = createAsyncThunk('auth/whoami', async (token, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${BASE_API_URL}/auth/me`, {
      headers: {
        Authorization: token
      }
    });
    return data.data;
  } catch (error) {
    if (error.response && error.response.data.message) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue(error.message);
  }
});
