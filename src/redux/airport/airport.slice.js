import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  airportsIndonesia: JSON.parse(localStorage.getItem('allAirports'))
};

const airportSlice = createSlice({
  name: 'airport',
  initialState,
  reducers: {
    _setAirport: (state, action) => {
      state.airportsIndonesia = action.payload;
    }
  }
});

export const { _setAirport } = airportSlice.actions;

export default airportSlice.reducer;
