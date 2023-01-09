import { axios } from '../../../lib/axios';

export const registerWithEmailAndPassword = (data) => axios.post('/auth/register', data);
