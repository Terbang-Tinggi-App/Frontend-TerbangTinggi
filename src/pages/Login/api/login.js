import { axios } from '../../../lib/axios';

export const loginWithEmailAndPassword = async (data) => {
  const response = await axios.post('/auth/login', data);
  return response;
};
