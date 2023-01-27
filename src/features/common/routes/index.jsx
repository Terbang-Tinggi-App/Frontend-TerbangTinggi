import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { AboutUs } from './AboutUs';
import { Error } from './Error';
import { Home } from './Home';
import { PrivacyPolicy } from './PrivacyPolicy';
import { SearchResult } from './SearchResult';
import { Sandbox } from './Sandbox';

export function CommonRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Error />} />
      <Route path="about" element={<AboutUs />} />
      <Route path="policy" element={<PrivacyPolicy />} />
      <Route path="search" element={<SearchResult />} />
      <Route path="sandbox" element={<Sandbox />} />
    </Routes>
  );
}
