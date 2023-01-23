import React from 'react';

import { AuthRoutes } from '../features/auth';
import { CommonRoutes } from '../features/common';

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />
  },
  {
    path: '/*',
    element: <CommonRoutes />
  }
];
