import { useEffect } from 'react';

import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout({ children, title, className, footer }) {
  useEffect(() => {
    document.title = title
      ? `${title} | Best Price for Flights`
      : 'Terbang Tinggi | Best Price for Flights';
  }, []);

  return (
    <main className={`mx-auto ${className}`}>
      <Navbar />
      {children}
      <Footer variant={footer} />
    </main>
  );
}
