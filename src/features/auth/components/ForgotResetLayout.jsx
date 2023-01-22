import React from 'react';

import Footer from '../../../components/Layout/Footer';

export function ForgotResetLayout({ children }) {
  return (
    <section className="bg-slate-100 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        {children}
      </div>
      <Footer />
    </section>
  );
}
