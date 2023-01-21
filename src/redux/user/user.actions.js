import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_API_URL } from '../../config';
import { _register, _myprofile } from './user.slice';

const token = localStorage.getItem('token');

export const loginGoogle = createAsyncThunk(
  'user/loginGoogle',
  async (accessToken, callback) => {
    const { data: tokenData, status } = await axios.post(`${BASE_API_URL}/auth/google`, {
      access_token: accessToken
    });

    if (status === 200 || status === 201) {
      localStorage.setItem('token', tokenData.token);
    }

    const { data: verifiedToken, status: verifiedStatus } = await axios.get(
      `${BASE_API_URL}/auth/me`,
      {
        headers: {
          Authorization: tokenData.token
        }
      }
    );

    if (verifiedStatus === 200) {
      localStorage.setItem('user', JSON.stringify(verifiedToken.data));
      callback(verifiedStatus);
    }
    return {
      token: tokenData.token,
      id: tokenData.id,
      name: verifiedToken.data.username,
      email: verifiedToken.data.email,
      role: verifiedToken.data.role
    };
  },
  (arg, error) => ({ payload: arg, error: error.response.data.message })
);

export const registerUser =
  ({ email, password, confirmPassword, username }, callback) =>
  async (dispatch) => {
    try {
      const { data: registerData, status: registerStatus } = await axios.post(
        `${BASE_API_URL}/auth/register`,
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
    const { data: tokenData } = await axios.get(`${BASE_API_URL}/user/myProfile`, {
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
