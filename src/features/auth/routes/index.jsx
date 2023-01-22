import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Login } from './Login';
import { Register } from './Register';
import { ResetPassword } from './ResetPassword';
import { ForgotPassword } from './ForgotPassword';

export function AuthRoutes() {
  return (
    <Routes>
      <Route path="register" element={<Register />} />
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="reset-password" element={<ResetPassword />} />
    </Routes>
  );
}
