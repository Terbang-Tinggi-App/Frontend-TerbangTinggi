import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import { DashboardIndex } from './Dashboard';
import { UsersList } from './UsersList';
import { CreateFlight } from './Ticket/CreateFlight';
import { ListFlights } from './Ticket/ListFlights';
import { UpdateFlight } from './Ticket/UpdateFlight';

export function DashboardRoutes() {
  return (
    <Routes>
      <Route path="/" element={<DashboardIndex />} />
      <Route path="flights/add" element={<CreateFlight />} />
      <Route path="flights" element={<ListFlights />} />
      <Route path="flights/:id" element={<UpdateFlight />} />
      <Route path="users" element={<UsersList />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
}
