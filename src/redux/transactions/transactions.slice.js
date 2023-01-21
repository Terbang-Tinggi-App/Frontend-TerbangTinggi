import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

import { BASE_API_URL } from '../../config';

const initialState = {
  data: null,
  paid: [],
  unpaid: [],
  experied: [],
  status: 'idle',
  error: null
};

export const getTransactionsData = createAsyncThunk(
  'transactions/getTransactionsData',
  async () => {
    const { data } = await axios.get(`${BASE_API_URL}/transaction`, {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    });

    // Get all unpaid transactions even it's already expired
    const unpaidAll = data?.data?.filter((x) => !x.isPaid);

    // Get only paid transactions
    const paid = data?.data?.filter((x) => x.isPaid);

    // Get only active unpaid transactions
    const unpaid = unpaidAll?.filter(
      (x) => new Date(x?.detail_transaction[0]?.flight?.date) > new Date().setHours(0, 0, 0, 0)
    );

    // Get only expired unpaid transactions
    const experied = unpaidAll?.filter(
      (x) => new Date(x?.detail_transaction[0]?.flight?.date) < new Date().setHours(0, 0, 0, 0)
    );

    return { data: data.data, paid, unpaid, experied };
  }
);

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTransactionsData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTransactionsData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload.data;
        state.paid = action.payload.paid;
        state.unpaid = action.payload.unpaid;
        state.experied = action.payload.experied;
      })
      .addCase(getTransactionsData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export default transactionsSlice.reducer;
