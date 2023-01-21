import React, { lazy } from 'react';

const { AuthRoutes } = lazy(() => import('../features/auth'));

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />
  }
];
