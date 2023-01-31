import { Link } from 'react-router-dom';

import { Logo } from '../Icons';

export function Footer({ variant }) {
  return (
    <footer
      className={`p-4 ${
        variant === 'white' ? 'bg-white' : 'bg-slate-100'
      } rounded-t-md shadow md:px-6 md:py-8 mx-auto max-w-screen-2xl print:hidden`}>
      <div className="sm:flex sm:items-center sm:justify-between">
        <Link className="font-bold text-2xl hidden md:inline-flex items-center gap-2" to="/">
          <Logo size={36} />
          Terbang Tinggi
        </Link>
        <ul className="flex flex-wrap items-center mb-6 text-sm text-gray-500 sm:mb-0 ">
          <li>
            <Link to="/about" className="mr-4 hover:underline md:mr-6 ">
              About
            </Link>
          </li>
          <li>
            <Link to="/policy" className="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </Link>
          </li>
        </ul>
      </div>
      <hr className="my-6 border-gray-500 sm:mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 sm:text-center">
        © {new Date().getFullYear()}{' '}
        <a href="https://terbangtinggi.km3ggwp.com" className="hover:underline">
          Terbang Tinggi
        </a>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
