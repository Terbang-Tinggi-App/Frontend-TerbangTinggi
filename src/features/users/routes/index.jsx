import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Account } from './Account';
import { Notifications } from './Notifications';
import { DetailTransaction } from './DetailTransaction';
import { Transaction } from './Transaction';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="account" element={<Account />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="*" element={<Navigate to="account" />} />
      <Route path="/transactions" element={<Transaction />} />
      <Route path="/transactions/:id" element={<DetailTransaction />} />
    </Routes>
  );
}
