import axios from 'axios';

import { BASE_API_URL } from '@/config';
import { _setAirport } from './airport.slice';

export const setAirport = () => async (dispatch) => {
  const response = await axios.get(`${BASE_API_URL}/airport/indonesia`);
  const { data } = await response;
  localStorage.setItem('allAirports', JSON.stringify(data.data));
  dispatch(_setAirport(data.data));
};
