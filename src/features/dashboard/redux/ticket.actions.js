import { createAsyncThunk } from '@reduxjs/toolkit';

import { axios } from '@/lib/axios';

export const getAllTickets = createAsyncThunk(
  'ticket/getAllTickets',
  async ({ page = 1, limit = 1 }, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/flight/data?page=${page}&limit=${limit}`);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);

export const deleteFlight = createAsyncThunk(
  'ticket/deleteFlight',
  async (id, { rejectWithValue }) => {
    try {
      const data = await axios.delete(`/flight/data/${id}`);
      return { data, id };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue(error.message);
    }
  }
);
