import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Account } from './Account';
import { ETicket } from './ETicket';
import { Notifications } from './Notifications';
import { Transactions } from './Transactions';

export function UsersRoutes() {
  return (
    <Routes>
      <Route path="account" element={<Account />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="*" element={<Navigate to="account" />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="transactions/:paymentId" element={<ETicket />} />
    </Routes>
  );
}
