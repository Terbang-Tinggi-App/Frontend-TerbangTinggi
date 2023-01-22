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
