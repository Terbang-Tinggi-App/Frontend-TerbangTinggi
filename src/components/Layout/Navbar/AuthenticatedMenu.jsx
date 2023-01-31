/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
import { Link } from 'react-router-dom';
import { TbLogout, TbUser, TbHistory } from 'react-icons/tb';
import { IoWarningOutline } from 'react-icons/io5';
import { RxDashboard } from 'react-icons/rx';

import { CustomModal } from '@/components/Elements';

export function AuthenticatedMenu({
  handleLogout,
  isAdmin,
  username,
  openModal,
  isOpen,
  closeModal,
  isUser,
  handleProfile,
  unpaid,
  unreadNotif
}) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        <Link to="/user/transactions">
          <button className="btn btn-ghost btn-square" type="button" title="Transactions">
            <div className="indicator">
              <Cart />
              {unpaid.length > 0 ? (
                <span className="badge badge-xs badge-primary indicator-item" />
              ) : (
                ''
              )}
            </div>
          </button>
        </Link>
        <Link to="/user/notifications">
          <button className="btn btn-ghost btn-square" type="button">
            <div className="indicator">
              <Bell />
              {unreadNotif.length > 0 ? (
                <span className="badge badge-xs badge-primary indicator-item" />
              ) : (
                ''
              )}
            </div>
          </button>
        </Link>
      </div>

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
          {isAdmin ? (
            <li>
              <Link to="/dashboard">
                <RxDashboard /> Dashboard
              </Link>
            </li>
          ) : null}
          <li>
            {isUser ? (
              <button type="button" onClick={handleProfile}>
                <TbUser /> Profile
              </button>
            ) : null}
          </li>
          <li>
            <Link to="/user/transactions">
              <TbHistory /> Transactions
            </Link>
          </li>
          <li>
            <button type="button" onClick={openModal}>
              <TbLogout /> Logout
            </button>
            <CustomModal
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
            </CustomModal>
          </li>
        </ul>
      </div>
    </div>
  );
}

export function Bell() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
      />
    </svg>
  );
}

export function Cart() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
      />
    </svg>
  );
}
