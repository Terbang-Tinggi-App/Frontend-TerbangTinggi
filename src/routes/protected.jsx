import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/Elements';
import { UsersRoutes } from '@/features/users';
import { DashboardRoutes } from '@/features/dashboard';
import { PaymentRoutes } from '@/features/payment';
import { Home } from '@/features/common';

function App() {
  return (
    <Layout>
      <Suspense fallback={<Spinner />}>
        <Outlet />
      </Suspense>
    </Layout>
  );
}

export function Dashboard() {
  return (
    <Suspense fallback={<Spinner />}>
      <Outlet />
    </Suspense>
  );
}

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/user/*', element: <UsersRoutes /> },
      { path: '*', element: <Navigate to="." /> }
    ]
  },
  {
    path: '/dashboard/*',
    element: <DashboardRoutes />
  },
  {
    path: '/payment/*',
    element: <PaymentRoutes />
  }
];
