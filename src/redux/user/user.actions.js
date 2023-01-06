import axios from 'axios';
import { toast } from 'react-toastify';

import { _login, _register, _logout, whoami, setError, _myprofile } from './user.slice';

const API_URL = import.meta.env.VITE_BASE_URL;
const token = localStorage.getItem('token');

export const login =
  ({ email, password }, callback) =>
  async (dispatch) => {
    try {
      const { data, status } = await axios.post(`${API_URL}/auth/login`, {
        email,
        password
      });
      dispatch(_login({ token: data.data.token, id: data.data.id }));

      if (status === 200) {
        localStorage.setItem('token', data.data.token);
      }

      const { data: verifiedToken, status: verifiedStatus } = await axios.get(
        `${API_URL}/auth/me`,
        {
          headers: {
            Authorization: data.data.token
          }
        }
      );

      if (verifiedStatus === 200) {
        dispatch(
          whoami({
            name: verifiedToken.data.username,
            email: verifiedToken.data.email,
            role: verifiedToken.data.role
          })
        );
        localStorage.setItem('user', JSON.stringify(verifiedToken.data));
        callback(verifiedStatus, verifiedToken.data.role);
      }
    } catch (error) {
      setError({ error: error.response.data.message });
      toast(JSON.stringify(error.response.data.message), { type: 'error' });
    }
    return null;
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  dispatch(_logout());
};

export const loginGoogle = (accessToken, callback) => async (dispatch) => {
  try {
    const { data: tokenData, status } = await axios.post(`${API_URL}/auth/google`, {
      access_token: accessToken
    });

    dispatch(_login(tokenData));

    if (status === 200 || status === 201) {
      localStorage.setItem('token', tokenData.token);
    }

    const { data: verifiedToken, status: verifiedStatus } = await axios.get(`${API_URL}/auth/me`, {
      headers: {
        Authorization: tokenData.token
      }
    });

    if (verifiedStatus === 200) {
      dispatch(
        whoami({
          name: verifiedToken.data.username,
          email: verifiedToken.data.email,
          role: verifiedToken.data.role
        })
      );
      localStorage.setItem('user', JSON.stringify(verifiedToken.data));
      callback(verifiedStatus);
    }
  } catch (error) {
    return error;
  }
  return null;
};

export const registerUser =
  ({ email, password, confirmPassword, username }, callback) =>
  async (dispatch) => {
    try {
      const { data: registerData, status: registerStatus } = await axios.post(
        `${API_URL}/auth/register`,
        {
          email,
          password,
          confirmPassword,
          username
        }
      );
      if (registerStatus === 201 || registerStatus === 200) {
        dispatch(_register({ email: registerData.data.email }));
        callback(registerStatus);
      }
    } catch (error) {
      toast(JSON.stringify(error.response.data.message), { type: 'error' });
    }
    return null;
  };

export const myProfile = () => async (dispatch) => {
  try {
    const { data: tokenData } = await axios.get(`${API_URL}/user/myProfile`, {
      headers: {
        Authorization: token
      }
    });

    dispatch(
      _myprofile({
        name: tokenData.data.username,
        email: tokenData.data.email,
        thumbnail: tokenData.data.thumbnail,
        fullName: tokenData.data.fullName,
        gender: tokenData.data.gender,
        country: tokenData.data.country,
        province: tokenData.data.province,
        city: tokenData.data.city,
        address: tokenData.data.address,
        phone: tokenData.data.phone
      })
    );
  } catch (error) {
    toast(JSON.stringify(error.response.data.message), { type: 'error' });
  }
  return null;
};
