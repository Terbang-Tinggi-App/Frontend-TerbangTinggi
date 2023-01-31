import { Link } from 'react-router-dom';

import { Logo } from '@/components/Icons';

export function Layout({ children }) {
  return (
    <>
      <header className="shadow-sm h-16 flex items-center px-4 md:px-20">
        <Link to="/" className="font-bold text-xl flex items-center gap-2">
          <Logo />
        </Link>
      </header>
      <main className="flex min-h-screen justify-center mt-8">{children}</main>
    </>
  );
}
