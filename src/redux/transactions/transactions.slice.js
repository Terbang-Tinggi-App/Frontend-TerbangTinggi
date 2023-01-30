import { createSlice } from '@reduxjs/toolkit';

import { getTransactionsData } from './transactions.actions';

const initialState = {
  data: null,
  paid: [],
  unpaid: [],
  experied: [],
  status: 'idle',
  error: null
};

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
