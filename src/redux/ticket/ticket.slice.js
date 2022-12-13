import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  code: "",
  airlineName: "",
  departureAirport: "",
  departure: "",
  arrivalAirport: "",
  arrival: "",
  date: "",
  departureTime: "",
  arrivalTime: "",
  price: +"",
};

const ticketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {
    _setTicketData: (state, action) => {
      const {
        code,
        airlineName,
        departureAirport,
        departure,
        arrivalAirport,
        arrival,
        date,
        departureTime,
        arrivalTime,
        price,
      } = action.payload;
      state.code = code;
      state.airlineName = airlineName;
      state.departureAirport = departureAirport;
      state.departure = departure;
      state.arrivalAirport = arrivalAirport;
      state.arrival = arrival;
      state.date = date;
      state.departureTime = departureTime;
      state.arrivalTime = arrivalTime;
      state.price = price;
    },
    _resetData: (state) => {
      state.code = "";
      state.airlineName = "";
      state.departureAirport = "";
      state.departure = "";
      state.arrivalAirport = "";
      state.arrival = "";
      state.date = "";
      state.departureTime = "";
      state.arrivalTime = "";
      state.price = "";
    },
  },
});

export const { _setTicketData, _resetData } = ticketSlice.actions;

export default ticketSlice.reducer;
