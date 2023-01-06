import axios from 'axios';

import { _getTransactionsData } from './transactions.slice';

const API_URL = import.meta.env.VITE_BASE_URL;

export const getTransactionsData = () => async (dispatch) => {
  const { data } = await axios.get(`${API_URL}/transaction`, {
    headers: {
      Authorization: localStorage.getItem('token')
    }
  });

  const unpaidAll = data?.data?.filter((x) => !x.isPaid);

  const paid = data?.data?.filter((x) => x.isPaid);

  const unpaid = unpaidAll?.filter(
    (x) => new Date(x?.detail_transaction[0]?.flight?.date) > new Date().setHours(0, 0, 0, 0)
  );

  const experied = unpaidAll?.filter(
    (x) => new Date(x?.detail_transaction[0]?.flight?.date) < new Date().setHours(0, 0, 0, 0)
  );

  dispatch(_getTransactionsData({ data: data.data, paid, unpaid, experied }));
};
