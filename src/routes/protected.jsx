import React, { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from '../components/Layout';
import Spinner from '../components/Layout/Spinner';

function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [{ path: '*', element: <Navigate to="." /> }]
  }
];
