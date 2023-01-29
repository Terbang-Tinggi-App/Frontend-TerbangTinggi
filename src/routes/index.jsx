import React from 'react';
import { useRoutes } from 'react-router-dom';

import { publicRoutes } from './public';
import { protectedRoutes } from './protected';

import { AboutUs, Error, Home, PrivacyPolicy, SearchResult, Sandbox } from '../features/common';
import useValidUser from '../hooks/useValidUser';

export function AppRoutes() {
  const isValidUser = useValidUser();

  const commonRoutes = [
    { path: '/', element: <Home withLayout /> },
    { path: '*', element: <Error /> },
    { path: 'about', element: <AboutUs /> },
    { path: 'policy', element: <PrivacyPolicy /> },
    { path: 'search', element: <SearchResult /> },
    { path: 'sandbox', element: <Sandbox /> }
  ];

  const routes = isValidUser ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return element;
}
