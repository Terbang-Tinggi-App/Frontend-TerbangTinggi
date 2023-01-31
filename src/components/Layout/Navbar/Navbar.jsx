/* eslint-disable import/extensions */
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import useValidUser from '@/hooks/useValidUser';
import { logout } from '@/features/auth/redux/auth.slice';
import { getTransactionsData } from '@/redux/transactions/transactions.actions';
import { Logo } from '../../Icons';
import { AuthenticatedMenu } from './AuthenticatedMenu';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [notif, setNotif] = useState([]);

  const { userInfo } = useSelector((state) => state.auth);
  const { username: name, role } = userInfo ?? {};
  const { unpaid } = useSelector((state) => state.transactions);

  const unreadNotif = notif.filter((x) => !x.is_read);

  const isAdmin = role === 'Admin';
  const isUser = role === 'User';

  const dispatch = useDispatch();
  const isValidUser = useValidUser();
  const navigate = useNavigate();

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    toast('Successfully log out', {
      type: 'info'
    });
  };

  const handleProfile = () => {
    navigate('/user');
  };

  useEffect(() => {
    if (isValidUser) {
      dispatch(getTransactionsData());
    }
  }, []);

  useEffect(() => {
    if (isValidUser) {
      const config = {
        method: 'get',
        url: `${BASE_API_URL}/notification/user/data`,
        headers: {
          Authorization: localStorage.getItem('token')
        }
      };
      axios(config)
        .then((response) => {
          setNotif(response.data.data);
        })
        .catch((error) => {
          toast(error);
        });
    }
    setRefresh(false);
  }, [refresh]);

  return (
    <nav className="bg-white text-black shadow-md print:hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link
            className="font-bold text-2xl hidden md:inline-flex items-center gap-2"
            to="/"
            title="Back to Home">
            <Logo size={36} />
            Terbang Tinggi
          </Link>
          <Link className="font-bold text-2xl md:hidden inline-flex items-center gap-2" to="/">
            <Logo />
          </Link>
          <div className="hidden md:block">
            {isValidUser ? (
              <AuthenticatedMenu
                handleLogout={handleLogout}
                isAdmin={isAdmin}
                isUser={isUser}
                username={name}
                openModal={openModal}
                closeModal={closeModal}
                isOpen={modalOpen}
                notif={notif}
                handleProfile={handleProfile}
                unpaid={unpaid}
                unreadNotif={unreadNotif}
              />
            ) : (
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/auth/login"
                  className=" hover:bg-brand-darker-800 hover:text-white px-3 py-2 rounded-md text-sm font-medium border-brand border-2">
                  Login
                </Link>

                <Link
                  to="/auth/register"
                  className="hover:bg-brand-darker-800  px-3 py-2 rounded-md text-sm font-medium bg-brand text-white border-brand border-solid border-2">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Show or hide hamburger button on mobile */}
          {isValidUser ? (
            <div className="md:hidden">
              <AuthenticatedMenu
                handleLogout={handleLogout}
                isAdmin={isAdmin}
                isUser={isUser}
                username={name}
                openModal={openModal}
                closeModal={closeModal}
                isOpen={modalOpen}
                notif={notif}
                handleProfile={handleProfile}
                unpaid={unpaid}
                unreadNotif={unreadNotif}
              />
            </div>
          ) : (
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-brand text-white hover:bg-brand-darker-800 inline-flex items-center justify-center p-2 rounded-md  hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-brand focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu Navbar */}
      {isValidUser ? null : (
        <div className={isOpen ? 'block' : 'hidden'}>
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link
                to="/auth/login"
                className="hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                Login
              </Link>

              <Link
                to="/auth/register"
                className=" hover:bg-gray-200 block px-3 py-2 rounded-md text-base font-medium">
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
