/* eslint-disable import/extensions */
/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TbList, TbPlaylistAdd, TbUsers, TbLogout, TbHome } from 'react-icons/tb';
import { IoWarningOutline } from 'react-icons/io5';

import { Protected } from '@/components/Routes';
import { Logo } from '@/components/Icons';
import { Modal } from '@/components/Elements';
import { logout } from '@/features/auth/redux/auth.slice';

export function Layout({ children }) {
  const [modalOpen, setModalOpen] = useState(false);

  const { userInfo } = useSelector((state) => state.auth);
  const { username: name } = userInfo ?? {};

  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <Protected access="Admin">
      <div className="drawer">
        <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col">
          {/* <!-- Navbar --> */}
          <div className="w-full navbar bg-white shadow-md px-4 sm:px-6 lg:px-8">
            <div className="flex-none lg:hidden">
              <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  className="inline-block w-6 h-6 stroke-current">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
            </div>
            <div className="flex-1 px-2 mx-2">
              <Link to="/dashboard">
                <Logo />
              </Link>
            </div>
            <div className="flex-none hidden lg:block">
              <ul className="menu menu-horizontal">
                {/* Navbar menu content here */}
                <li>
                  <Link to="/dashboard/users">
                    <TbUsers size={18} /> Users List
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/flights">
                    <TbList size={18} /> List Flights
                  </Link>
                </li>
                <li>
                  <Link to="/dashboard/flights/add">
                    <TbPlaylistAdd size={18} /> Create Flight
                  </Link>
                </li>
              </ul>
            </div>
            <AuthRightElementNavbar
              handleLogout={handleLogout}
              username={name}
              openModal={openModal}
              closeModal={closeModal}
              isOpen={modalOpen}
            />
          </div>
          <main className="mx-4 md:mx-8">{children}</main>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-3" className="drawer-overlay" />
          <ul className="menu p-4 w-80 bg-base-100">
            {/* Sidebar content here  */}
            <li className="select-none hover:bg-none">
              <h2 className="font-semibold text-xl select-none hover:bg-none">Menu</h2>
            </li>
            <li>
              <Link to="/dashboard">
                <TbHome size={18} /> Dashboard
              </Link>
            </li>
            <li>
              <Link to="/dashboard/users">
                <TbUsers size={18} /> Users List
              </Link>
            </li>
            <li>
              <Link to="/dashboard/flights">
                <TbList size={18} /> Flights List
              </Link>
            </li>
            <li>
              <Link to="/dashboard/flights/add">
                <TbPlaylistAdd size={18} /> Create Flight
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </Protected>
  );
}

export function AuthRightElementNavbar({ handleLogout, username, openModal, isOpen, closeModal }) {
  return (
    <div className="flex items-center gap-2">
      <div className="dropdown dropdown-end">
        <label
          tabIndex={0}
          className="btn btn-outline btn-primary btn-sm btn-circle avatar placeholder"
          title="Profile Menu">
          {username ? <span>{username[0].toUpperCase()}</span> : <span>TT</span>}
        </label>
        <ul
          tabIndex={0}
          className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
          <li>
            <Link to="/dashboard">
              <TbHome /> Back to Home
            </Link>
          </li>

          <li>
            <button type="button" onClick={openModal}>
              <TbLogout /> Logout
            </button>
            <Modal
              isOpen={isOpen}
              closeModal={closeModal}
              className="max-w-xs"
              label="Logout warning">
              <IoWarningOutline className="mb-2" size={32} />
              <h2 className="text-lg font-semibold">Are you sure you want to logout?</h2>
              <div className="flex gap-4 mt-4 justify-between">
                <button
                  type="button"
                  className="btn btn-primary btn-outline w-28 sm:w-32"
                  onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-error w-28 sm:w-32" onClick={handleLogout}>
                  <TbLogout className="mr-2" /> Logout
                </button>
              </div>
            </Modal>
          </li>
        </ul>
      </div>
    </div>
  );
}
