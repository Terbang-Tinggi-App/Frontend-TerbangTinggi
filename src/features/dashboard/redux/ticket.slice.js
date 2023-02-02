import { createSelector, createSlice } from '@reduxjs/toolkit';

import { deleteFlight, getAllTickets } from './ticket.actions';

const initialState = {
  loading: false,
  data: null,
  error: null
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTickets.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.error = null;
        state.data = payload;
      })
      .addCase(getAllTickets.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      })
      .addCase(deleteFlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteFlight.fulfilled, (state, { payload }) => {
        state.loading = false;
        if (payload) {
          state.data.rows = state.data.rows.filter((flight) => flight.id !== payload.id);
        }
      })
      .addCase(deleteFlight.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  }
});

const ticketsState = (state) => state.ticket;

export const getAllTicketsState = createSelector([ticketsState], (tickets) => tickets);

export default ticketSlice.reducer;
