import { useEffect } from 'react';
import { useRoutes, useLocation, useNavigate } from 'react-router-dom';

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

import {
  AboutUs,
  Booking,
  Error,
  Home,
  PrivacyPolicy,
  SearchResult,
  Sandbox
} from '../features/common';
import useValidUser from '../hooks/useValidUser';

const protectedRegex = /\/(user|dashboard|payment)\/?.*/;

export function AppRoutes() {
  const isValidUser = useValidUser();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user is try to access protected routes
  useEffect(() => {
    if (!isValidUser && location.pathname.match(protectedRegex)) {
      sessionStorage.setItem('redirectTo', location.pathname);
      navigate('/auth/login');
    }
  }, [isValidUser, location]);

  // Redirect after successfully logged in
  useEffect(() => {
    if (isValidUser) {
      const redirectAfterLogin = sessionStorage.getItem('redirectTo');
      if (redirectAfterLogin) {
        sessionStorage.removeItem('redirectTo');
        navigate(redirectAfterLogin);
      }
    }
  }, [isValidUser, navigate]);

  const commonRoutes = [
    { path: '/', element: <Home withLayout /> },
    { path: '*', element: <Error /> },
    { path: 'about', element: <AboutUs /> },
    { path: 'booking/:id', element: <Booking /> },
    { path: 'policy', element: <PrivacyPolicy /> },
    { path: 'search', element: <SearchResult /> },
    { path: 'sandbox', element: <Sandbox /> }
  ];

  const routes = isValidUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
}
