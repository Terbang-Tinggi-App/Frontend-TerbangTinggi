import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';
import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/Elements';

const { UsersRoutes } = lazyImport(() => import('@/features/users'), 'UsersRoutes');
const { DashboardRoutes } = lazyImport(() => import('@/features/dashboard'), 'DashboardRoutes');
const { PaymentRoutes } = lazyImport(() => import('@/features/payment'), 'PaymentRoutes');
const { Home } = lazyImport(() => import('@/features/common'), 'Home');

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
