import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { MdFlightTakeoff, MdOutlineFlightLand } from 'react-icons/md';
import { toast } from 'react-toastify';

import CalendarIcon from '../../components/Icons/CalendarIcon';
import { Layout } from '../../components/Layout';
import Spinner from '../../components/Layout/Spinner';
import Protected from '../../components/Routes/Protected';

const API_URL = import.meta.env.VITE_BASE_URL;

export default function Transaction() {
  const [data, setData] = useState(null);
  const [refetch, setRefetch] = useState(false);

  const navigate = useNavigate();

  const paid = data?.filter((x) => x.isPaid) ?? [];

  const handleDetail = (id) => {
    navigate(`/transaction/${id}`);
  };

  const handleDeleteTransaction = async (id) => {
    try {
      const { status } = await axios.delete(`${API_URL}/transaction/${id}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (status === 200 || status === 201) {
        setRefetch(true);
        toast('Transaction deleted', { type: 'success' });
      }
    } catch (error) {
      toast('Cannot delete transaction, try again', { type: 'error' });
    }
  };

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get(`${API_URL}/transaction`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      setData(response.data.data);
    }

    fetchData();
    setRefetch(false);
  }, [refetch]);

  if (paid && paid.length === 0) {
    return (
      <Protected>
        <Layout>
          <section className="min-h-screen flex items-center justify-center flex-col">
            <img
              src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1672468918/terbangtinggi/undraw_Lost_re_xqjt_i075rg.png"
              alt="Not found"
              height={240}
              width={240}
            />
            <h1 className="text-2xl font-semibold">You have no transaction yet</h1>
            <Link to="/" className="btn btn-primary bg-brand mt-2 hover:bg-brand-darker-800">
              Search Flight
            </Link>
          </section>
        </Layout>
      </Protected>
    );
  }

  return (
    <Protected>
      <Layout title="Transactions">
        <div className="bg-slate-100">
          {data ? (
            <div className=" min-[400px]:px-32  py-10 ">
              <h1 className="text-3xl font-bold text-center">Transaction History </h1>
              {paid
                ?.sort((a, b) => Number(b.id) - Number(a.id))
                .map((x) => (
                  <div
                    key={x.id}
                    className="border-2 rounded-lg  drop-shadow-2xl md:drop-shadow-xl bg-white px-5 py-5 mt-5">
                    <p>{x?.detail_transaction[0].flight?.airlineName}</p>
                    <div className="flex">
                      <svg
                        width={40}
                        height={40}
                        viewBox="0 0 48 48"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_55_12)">
                          <circle cx="24" cy="24" r="24" fill="white" />
                          <path
                            d="M30.9486 13.974C31.7735 13.6991 32.8499 13.6146 33.6228 14.3875C34.3957 15.1604 34.3103 16.2378 34.0363 17.0617C33.7515 17.9142 33.1995 18.7392 32.6407 19.298L29.0158 22.9229L31.5545 30.539C31.6771 30.9062 31.6951 31.3002 31.6062 31.677C31.5174 32.0538 31.3254 32.3984 31.0517 32.6721L29.6944 34.0294C29.6231 34.1006 29.5371 34.1555 29.4425 34.1901C29.3478 34.2248 29.2468 34.2385 29.1463 34.2302C29.0458 34.2218 28.9484 34.1918 28.8607 34.142C28.7731 34.0922 28.6973 34.024 28.6387 33.942L24.1319 27.632L21.5509 29.4764V32.0652C21.5511 32.2027 21.5104 32.3372 21.4341 32.4516C21.3577 32.566 21.2491 32.6551 21.1221 32.7077C20.995 32.7603 20.8552 32.774 20.7203 32.747C20.5854 32.72 20.4616 32.6536 20.3645 32.5562L15.4541 27.6458C15.3567 27.5487 15.2903 27.4249 15.2633 27.29C15.2363 27.1552 15.25 27.0153 15.3026 26.8882C15.3552 26.7612 15.4443 26.6526 15.5587 26.5762C15.6731 26.4999 15.8076 26.4592 15.9451 26.4594L18.5349 26.4604L20.3783 23.8784L14.0683 19.3716C13.9863 19.313 13.9181 19.2372 13.8683 19.1496C13.8185 19.0619 13.7885 18.9645 13.7801 18.864C13.7718 18.7635 13.7855 18.6625 13.8202 18.5678C13.8548 18.4732 13.9097 18.3872 13.9809 18.3159L15.3382 16.9586C15.6119 16.6849 15.9565 16.4929 16.3333 16.4041C16.7101 16.3152 17.1041 16.3332 17.4713 16.4558L25.0874 18.9945L28.7123 15.3696C29.2702 14.8118 30.0981 14.2588 30.9486 13.974Z"
                            fill="black"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_55_12">
                            <rect width="48" height="48" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                      <h1 className="mt-2">{x?.detail_transaction[0].flight?.departureAirport} </h1>
                    </div>
                    <div className="flex ml-2">
                      <CalendarIcon />
                      <h2 className="ml-1">{x?.detail_transaction[0].flight?.date}</h2>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3  mt-5">
                      <div className="col-span-2 border-l-4 border-black px-5 ml-5">
                        <div className="flex">
                          <MdFlightTakeoff size={30} className="mt-4" />
                          <div className="ml-4">
                            <div>{x?.detail_transaction[0].flight?.departureTime}</div>
                            <div>{x?.detail_transaction[0].flight?.departureAirport}</div>
                            <div>{x?.detail_transaction[0].flight?.departure}</div>
                          </div>
                        </div>

                        <div className="mt-5 flex">
                          <MdOutlineFlightLand size={30} className="mt-4" />
                          <div className="ml-4">
                            <div>{x?.detail_transaction[0].flight?.arrivalTime}</div>
                            <div>{x?.detail_transaction[0].flight?.arrivalAirport}</div>
                            <div>{x?.detail_transaction[0].flight?.arrival}</div>
                          </div>
                        </div>
                      </div>
                      <div className="grid text-center min-[100px]:ml-5   gap-6 sm:grid-cols-3 py-7 border-l-4 border-black px-5">
                        <div className=" min-[100px]:text-left">
                          <div>Triptype</div>
                          <div>Aircraft</div>
                          <div>Cabin</div>
                        </div>
                        <div className="w-40 text-left">
                          <div>{x?.detail_transaction[0].flight?.tripType}</div>
                          <div>{x?.detail_transaction[0].flight?.code}</div>
                          <div>{x?.detail_transaction[0].flight?.sc}</div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 justify-end items-center w-ful mt-4">
                      <button
                        type="button"
                        className="font-medium btn-success px-5 py-2 rounded-lg"
                        onClick={() => {
                          handleDetail(x.id);
                        }}>
                        Detail
                      </button>
                      <button
                        type="button"
                        className="font-medium btn-error px-5 py-2 rounded-lg"
                        onClick={() => {
                          handleDeleteTransaction(x.id);
                        }}>
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <Spinner textContent="Getting your transactions" />
          )}
        </div>
      </Layout>
    </Protected>
  );
}
