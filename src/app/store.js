/* eslint-disable import/extensions */
import { configureStore } from '@reduxjs/toolkit';

import airportReducer from '@/redux/airport/airport.slice';
import authReducer from '@/features/auth/redux/auth.slice';
import ticketReducer from '@/features/dashboard/redux/ticket.slice';
import transactionsReducer from '@/redux/transactions/transactions.slice';
import { setAirport } from '@/redux/airport/airport.actions';
import { whoami } from '@/features/auth/redux/auth.actions';

const airportData = JSON.parse(localStorage.getItem('allAirports'));
const token = localStorage.getItem('token');

export const store = configureStore({
  reducer: {
    auth: authReducer,
    airport: airportReducer,
    ticket: ticketReducer,
    transactions: transactionsReducer
  }
});

if (token) {
  store.dispatch(whoami(token));
}

if (!airportData) {
  store.dispatch(setAirport());
}
