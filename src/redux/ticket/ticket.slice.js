import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allTickets: {
    data: null,
    error: null
  }
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    _getAllTickets: (state, action) => {
      const { data, error } = action.payload;
      state.allTickets.data = data;
      state.allTickets.error = error;
    }
  }
});

export const { _getAllTickets } = ticketSlice.actions;
export default ticketSlice.reducer;
