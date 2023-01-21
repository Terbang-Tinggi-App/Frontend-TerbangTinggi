import React from 'react';
import { RiTicket2Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <aside className="w-72 bg-[#363740]  h-screen">
      <Link to="/admin-page">
        <h1 className="text-4xl border-b-4 font-bold py-10 px-8 text-white">Dasboard</h1>
      </Link>
      <div className="overflow-y-auto p-10 px-3 bg-[#363740] rounded dark:bg-gray-800">
        <ul className="space-y-2 h-32">
          <li className="border-b-4">
            <Link
              to="/user-page"
              className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-600 "
            >
              <svg
                aria-hidden="true"
                className="flex-shrink-0 w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="flex-1 ml-3 whitespace-nowrap text-white">Users</span>
            </Link>
          </li>
          <li className="border-b-4">
            <Link
              to="/create-ticket"
              className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-600 "
            >
              <RiTicket2Line className="w-6 h-6 text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap text-white">Create Ticket</span>
            </Link>
          </li>
          <li className="border-b-4">
            <Link
              to="/ticket"
              className="flex items-center p-2 px-10 text-base font-normal rounded-lg hover:bg-slate-600 "
            >
              <RiTicket2Line className="w-6 h-6 text-white" />
              <span className="flex-1 ml-3 whitespace-nowrap text-white">List Ticket</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
}
