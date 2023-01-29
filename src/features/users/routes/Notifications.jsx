/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RxCross2 } from 'react-icons/rx';

import { BASE_API_URL } from '@/config';
import Protected from '@/components/Routes/Protected';
import Spinner from '@/components/Layout/Spinner';

export function Notifications() {
  const [notif, setNotif] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const unread = notif && notif.filter((x) => !x.is_read);

  useEffect(() => {
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
    setRefresh(false);
  }, [refresh]);

  const handleReadallnotif = () => {
    const config = {
      method: 'patch',
      url: `${BASE_API_URL}/notification/readall`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    axios(config)
      .then((response) => {
        toast(response.data.message);
        setRefresh(true);
      })
      .catch((error) => {
        toast(error);
      });
  };

  const handleReadbyid = (id) => {
    const config = {
      method: 'patch',
      url: `${BASE_API_URL}/notification/read/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    axios(config)
      .then(() => {
        setRefresh(true);
      })
      .catch((error) => {
        toast(error);
      });
  };

  const handleDeletebyid = (id) => {
    const config = {
      method: 'delete',
      url: `${BASE_API_URL}/notification/${id}`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    axios(config)
      .then((response) => {
        toast(response.data.detail_message);
        setRefresh(true);
      })
      .catch((error) => {
        toast(error);
      });
  };
  const handleDeleteall = () => {
    const config = {
      method: 'delete',
      url: `${BASE_API_URL}/notification/readall`,
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };

    axios(config)
      .then((response) => {
        toast(response.data.message);
        setRefresh(true);
      })
      .catch((error) => {
        toast(error);
      });
  };

  if (notif && notif.length === 0) {
    return (
      <section className="min-h-screen flex items-center justify-center flex-col">
        <img
          src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1672468918/terbangtinggi/undraw_Lost_re_xqjt_i075rg.png"
          alt="Not found"
          loading="lazy"
          height={240}
          width={240}
        />
        <h1 className="text-2xl font-bold">You have no notification</h1>
      </section>
    );
  }

  return (
    <Protected>
      {notif ? (
        <main className="min-h-screen my-8 mx-4">
          {notif ? (
            <>
              <div className="text-2xl font-bold mt-5 ">
                <div className="flex ml-2 lg:ml-28">
                  Notifications
                  <span
                    className={`${
                      unread && unread.length > 0 ? 'bg-primary w-3 h-3 rounded-full' : ''
                    }`}
                  />
                  <div className="ml-auto lg:mr-32">
                    <button
                      type="button"
                      className="text-sm cursor-pointer mt-2 mx-2  text-red-500 "
                      onClick={handleDeleteall}>
                      Delete all
                    </button>
                    <button
                      type="button"
                      className="text-sm mt-2 text-sky-500 cursor-pointer"
                      onClick={handleReadallnotif}>
                      Mark all as read
                    </button>
                  </div>
                </div>
              </div>
              {notif ? (
                notif?.map((x) => (
                  <div
                    key={x.id}
                    className={`${
                      x.is_read
                        ? 'lg:mx-28 bg-white rounded-lg mt-5 drop-shadow-md hover:drop-shadow-xl cursor-pointer'
                        : 'lg:mx-28 bg-sky-50 rounded-lg mt-5 drop-shadow-md hover:drop-shadow-xl cursor-pointer'
                    }`}
                    onClick={() => {
                      handleReadbyid(x.id);
                    }}>
                    <div className="mx-5 ">
                      <div className="flex">
                        <div className="font-bold text-xl text-blue-500 py-1 font-sans">
                          #{x.id}
                        </div>
                        <button
                          type="button"
                          className="ml-auto"
                          onClick={() => {
                            handleDeletebyid(x.id);
                          }}>
                          <RxCross2 className="text-slate-400" />
                        </button>
                      </div>

                      <div className="flex">
                        <div className="font-bold text-lg font-sans">{x.detail_message}</div>
                        <div className="ml-2 text-sm italic mt-1 font-sans">{x.title}</div>
                      </div>
                      <div className="py-2 text-slate-400  font-sans">
                        <div>Created : {new Date(x.createdAt).toDateString()}</div>
                        <div>Updated : {new Date(x.updatedAt).toDateString()}</div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <Spinner />
              )}
            </>
          ) : (
            <Spinner />
          )}
        </main>
      ) : (
        <Spinner textContent="Getting your notifications" />
      )}
    </Protected>
  );
}
