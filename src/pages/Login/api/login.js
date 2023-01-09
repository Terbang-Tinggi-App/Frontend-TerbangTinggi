import { axios } from '../../../lib/axios';

export const loginWithEmailAndPassword = (data) => axios.post('/auth/login', data);
