/* eslint-disable react/no-array-index-key */
/* eslint-disable array-callback-return */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { BiUserCircle } from 'react-icons/bi';
import { IoWarningOutline } from 'react-icons/io5';

import { Button, FormControl, Label } from '../../components/Input';
import { Layout } from '../../components/Layout';
import TextSkeleton from '../../components/Layout/TextSkeleton';
import CustomModal from '../../components/Modal/CustomModal';

const API_URL = import.meta.env.VITE_BASE_URL;

export function Booking() {
  const [data, setData] = useState([]);
  const [ticketData, setTicketData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const valiadteForms =
    data?.filter((x) => x?.firstName && x?.travelDocument)?.length === data?.length;

  const [searchParams] = useSearchParams();
  const passengers = searchParams.get('passengers');
  const date = searchParams.get('date');
  const { id } = useParams();
  const navigate = useNavigate();

  const lsPassengersData = JSON.parse(localStorage.getItem('passengersData'));

  const {
    airlineName,
    airlineLogo,
    code,
    departureAirport,
    arrivalAirport,
    departure,
    arrival,
    departureTime,
    price
  } = ticketData ?? {};

  const handleTransaction = async () => {
    try {
      const { data: transactionData, status: transactionStatus } = await axios.post(
        `${API_URL}/transaction`,
        {
          flight_id: Number(id),
          passenger: data
        },
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      const paymentCode = await transactionData.data.transaction.payment_code;

      if (transactionStatus === 200 && paymentCode) {
        localStorage.removeItem('passengersData');
        navigate(`/payment/${paymentCode}`);
      }

      return null;
    } catch (error) {
      localStorage.setItem('passengersData', JSON.stringify(data));
      toast(
        `${error.response.data.message} 
      please log in to book`,
        {
          type: 'error',
          className: 'capitalize'
        }
      );
      setTimeout(() => {
        navigate(`/login?redirect=booking&id=${id}&passengers=${passengers}`);
      }, 2000);
    }
    return null;
  };

  const handleChange = (index, name, value) => {
    const newData = data.map((d, i) => {
      if (index === i) {
        return { ...d, [name]: value };
      }
      return d;
    });
    setData(newData);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { data: ticketResponse } = await axios.get(`${API_URL}/flight/data/${id}`);
      setTicketData(ticketResponse?.data);
    })();
  }, []);

  useEffect(() => {
    if (Number(passengers) > 0) {
      const passengerData = {
        email: '',
        firstName: '',
        lastName: '',
        phone: '6281',
        type: 'adult',
        travelDocument: ''
      };
      const passengersData = [];
      Array.from({ length: passengers }, () => {
        passengersData.push(passengerData);
      });
      if (lsPassengersData?.length > 0) {
        setData(lsPassengersData);
      } else {
        setData(passengersData);
      }
    }
  }, [passengers]);

  if (date && new Date(date) < new Date().setHours(0, 0, 0, 0)) {
    return (
      <Layout>
        <main className="min-h-screen flex items-center justify-center flex-col">
          <img
            src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1672468918/terbangtinggi/undraw_Lost_re_xqjt_i075rg.png"
            alt="Not found"
            loading="lazy"
            height={240}
            width={240}
          />
          <h1 className="text-2xl font-bold">Cannot book past flight</h1>
        </main>
      </Layout>
    );
  }

  return (
    <Layout title="Booking" className="bg-slate-100">
      <div className="flex justify-center my-4">
        <ul className="steps w-full">
          <li className="step step-primary">Book</li>
          <li className="step">Pay</li>
          <li className="step">E-ticket</li>
        </ul>
      </div>
      <div className="flex justify-around flex-wrap flex-col-reverse md:flex-row mx-8 gap-4">
        <Button className="my-4 md:hidden block" onClick={openModal} disabled={!valiadteForms}>
          Proceed to payment
        </Button>
        <div className="flex flex-col flex-wrap bg-white flex-[2] rounded-[4px]">
          <h1 className="text-lg md:text-xl px-8 pt-4 font-bold inline-flex items-center gap-2">
            <BiUserCircle size="32" /> Data Passengers
          </h1>
          {data.length > 0 &&
            data.map((v, i) => (
              <div className="p-2 md:p-8 flex flex-col gap-4" key={i}>
                <h2 className="font-semibold bg-[#F5F6FA] text-lg md:text-xl p-3 rounded-[4px]">
                  Passenger {i + 1}
                </h2>
                <form onSubmit={handleTransaction} disabled={!valiadteForms}>
                  <FormControl>
                    <Label>First Name</Label>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="John"
                      className="input input-primary "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.firstName}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <Label>Last Name</Label>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Doe"
                      className="input input-primary "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.lastName}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <Label>Nationality ID</Label>
                    <input
                      type="tel"
                      name="travelDocument"
                      id="phone"
                      placeholder="123456789"
                      className="input input-primary "
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.travelDocument}
                      required
                    />
                  </FormControl>

                  <FormControl>
                    <Label>Passenger type</Label>
                    <select
                      name="type"
                      id="type"
                      className="select select-primary w-full"
                      onChange={(e) => {
                        handleChange(i, e.target.name, e.target.value);
                      }}
                      value={data[i]?.type}>
                      <option value="adult">Adult</option>
                      <option value="child">Child</option>
                    </select>
                  </FormControl>
                </form>
              </div>
            ))}
        </div>

        <div className="min-w-xs p-4 md:p-6 flex flex-col gap-3 bg-white h-min rounded-md md:ml-4 flex-1 md:sticky md:self-start md:top-0">
          <h2 className="font-bold text-lg md:text-xl">Flight Detail</h2>

          {departureAirport ? (
            <p className="text-base font-semibold">
              {departureAirport} &rarr; {arrivalAirport}
            </p>
          ) : (
            <TextSkeleton />
          )}

          <div className="flex items-center gap-2 font-semibold flex-wrap">
            {airlineLogo ? (
              <div className="font-semibold flex gap-4 items-center">
                <img src={airlineLogo} alt={airlineName} className="h-10" /> &bull;
                <p>{code}</p>
              </div>
            ) : (
              <TextSkeleton />
            )}
          </div>

          {departure ? (
            <p className="font-semibold">
              {departure} &rarr; {arrival} &bull; {departureTime}
            </p>
          ) : (
            <TextSkeleton />
          )}

          <div className="border-t-2">
            <div className="text-lg md:text-xl mt-2 flex justify-between">
              <p>Total Price</p>
              {price ? (
                <span className="font-semibold">
                  Rp.{' '}
                  {passengers
                    ? new Intl.NumberFormat('ID-id').format(passengers * price ?? 0)
                    : new Intl.NumberFormat('ID-id').format(price ?? 0)}
                </span>
              ) : (
                <TextSkeleton className="w-20" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto basis-[100vw] md:flex md:justify-center hidden z-10">
        <Button className="my-4 max-w-xl mx-auto" onClick={openModal} disabled={!valiadteForms}>
          Proceed to payment
        </Button>
      </div>
      <CustomModal
        isOpen={isOpen}
        closeModal={closeModal}
        label="example modal usage"
        className="z-10">
        <IoWarningOutline size="32" />
        <h1 className="font-semibold text-2xl md:text-3xl my-2 md:my-4">Proceed to payment?</h1>
        <p>
          Make sure your data is correct. You cannot change the order details after proceeding to
          checkout.
        </p>
        <div className="flex flex-wrap gap-4 justify-end mt-2 md:mt-4">
          <Button className="w-auto btn-outline" onClick={closeModal} variant="none">
            Cancel
          </Button>
          <Button className="w-auto" onClick={handleTransaction}>
            Proceed to payment
          </Button>
        </div>
      </CustomModal>
    </Layout>
  );
}
