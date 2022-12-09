import axios from "axios";

import { _login, _logout } from "./user.slice";

const API_URL = process.env.REACT_APP_AUTH_API;

export const login = (email, password) => async (dispatch) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, {
      email,
      password,
    });
    const userData = await response.data();
    localStorage.setItem("token", userData.data.token);
    dispatch(_login(userData.data));
  } catch (error) {
    return error;
  }
  return null;
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(_logout());
};

export const loginGoogle = () => () => {
  //
};
