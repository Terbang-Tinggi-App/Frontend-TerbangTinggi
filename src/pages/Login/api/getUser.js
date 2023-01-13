import { axios } from '../../../lib/axios';

export const getUser = () => axios.get('/auth/me');
