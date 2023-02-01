import { lazy, Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { Layout } from '@/components/Layout';
import { Spinner } from '@/components/Elements';

const UsersRoutes = lazy(() =>
  import('@/features/users').then((module) => ({ default: module.UsersRoutes }))
);
const DashboardRoutes = lazy(() =>
  import('@/features/dashboard').then((module) => ({ default: module.DashboardRoutes }))
);
const PaymentRoutes = lazy(() =>
  import('@/features/payment').then((module) => ({ default: module.PaymentRoutes }))
);
const Home = lazy(() => import('@/features/common').then((module) => ({ default: module.Home })));

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
