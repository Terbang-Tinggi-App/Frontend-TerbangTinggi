import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Payment } from './Payment';

export function PaymentRoutes() {
  return (
    <Routes>
      <Route path="/:paymentId" element={<Payment />} />
    </Routes>
  );
}
