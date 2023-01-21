import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { toast } from 'react-toastify';

import { BASE_API_URL } from '../../config';

const userDataFromLocalStorage = JSON.parse(localStorage.getItem('user'));
const userToken = localStorage.getItem('token');

const initialState = {
  token: userToken || '',
  id: userDataFromLocalStorage?.id || '',
  name: userDataFromLocalStorage?.username || '',
  email: userDataFromLocalStorage?.email || '',
  role: userDataFromLocalStorage?.role || '',
  phone: '',
  province: '',
  fullName: userDataFromLocalStorage?.fullName || '',
  thumbnail: '',
  status: 'idle',
  error: null
};

export const login = createAsyncThunk(
  'user/login',
  async ({ dto: { email, password }, callback }) => {
    const { data, status } = await axios.post(`${BASE_API_URL}/auth/login`, {
      email,
      password
    });

    if (status === 200) {
      localStorage.setItem('token', data.data.token);
    }

    const { data: verifiedToken, status: verifiedStatus } = await axios.get(
      `${BASE_API_URL}/auth/me`,
      {
        headers: {
          Authorization: data.data.token
        }
      }
    );

    if (verifiedStatus === 200) {
      localStorage.setItem('user', JSON.stringify(verifiedToken.data));
      callback(verifiedStatus, verifiedToken.data.role);
    }

    return (
      {
        token: data.data.token,
        id: data.data.id,
        name: verifiedToken.data.username,
        email: verifiedToken.data.email,
        role: verifiedToken.data.role
      },
      (arg, error) => {
        toast(JSON.stringify(error.response.data.message), { type: 'error' });
        return { payload: arg, error: error.response.data.message };
      }
    );
  }
);

export const logout = createAsyncThunk('user/logout', () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    _register: (state, action) => {
      const { email } = action.payload;
      state.email = email;
    },
    // _logout: (state) => {
    //   state.email = '';
    //   state.role = '';
    //   state.name = '';
    //   state.token = '';
    //   state.id = '';
    // },
    whoami: (state, action) => {
      const { name, email, role } = action.payload;
      state.name = name;
      state.email = email;
      state.role = role;
    },
    setError: (state, action) => {
      const { error } = action.payload;
      state.error = error;
    },
    _myprofile: (state, action) => {
      const { name, email, thumbnail, fullName, gender, country, province, city, address, phone } =
        action.payload;
      state.name = name;
      state.email = email;
      state.thumbnail = thumbnail;
      state.fullName = fullName;
      state.gender = gender;
      state.country = country;
      state.province = province;
      state.city = city;
      state.address = address;
      state.phone = phone;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.token = action.payload.token;
        state.id = action.payload.id;
        state.name = action.payload.name;
        state.email = action.payload.email;
        state.role = action.payload.role;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = 'succeeded';
        state.token = '';
        state.id = '';
        state.name = '';
        state.email = '';
        state.role = '';
      })
      .addCase(logout.rejected, (state) => {
        state.error = 'Logout failed';
      });
  }
});

export const { _login, _register, _logout, whoami, setError, _myprofile } = userSlice.actions;

export default userSlice.reducer;
