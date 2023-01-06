import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BiTimeFive } from 'react-icons/bi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { HiOutlineTicket } from 'react-icons/hi';
import { toast } from 'react-toastify';
import axios from 'axios';
import { toPng } from 'html-to-image';

import { Layout } from '../../components/Layout';
import Logo from '../../components/Icons/Logo';
import TextSkeleton from '../../components/Layout/TextSkeleton';
import Protected from '../../components/Routes/Protected';

const API_URL = import.meta.env.VITE_BASE_URL;

function ETicket() {
  const [ticketData, setTicketData] = useState(null);
  const [image, setImage] = useState(null);

  const { buffer, url } = image ?? {};

  const ref = useRef(null);

  const { detail_transaction: detailTransaction, isPaid } = ticketData ?? {};
  const passengers = detailTransaction ? detailTransaction[0]?.passenger : [];
  const flight = detailTransaction ? detailTransaction[0]?.flight : {};
  const {
    airlineLogo,
    arrival,
    arrivalAirport,
    departure,
    departureAirport,
    date,
    airlineName,
    arrivalTime,
    departureTime,
    sc,
    code
  } = flight ?? {};

  const { paymentId } = useParams();

  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }

    toPng(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.download = 'my-image-name.png';
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        toast(err.message);
      });
  }, [ref]);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${API_URL}/ticket/${paymentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setTicketData(data.data);
    })();
    (async () => {
      const { data } = await axios.get(`${API_URL}/transaction/generatepdf/${paymentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      setImage(data);
    })();
  }, []);

  return (
    <Protected>
      <Layout title="E-ticket" className="bg-slate-100" footer="white">
        <div className="flex justify-center my-4 print:hidden">
          <ul className="steps w-full">
            <li data-content="✓" className="step step-primary">
              Book
            </li>
            <li data-content="✓" className="step step-primary">
              Pay
            </li>
            <li data-content="✓" className="step step-primary">
              E-ticket
            </li>
          </ul>
        </div>
        <div className="mx-4 md:mx-32 mt-8">
          <h1 className="text-3xl font-bold print:hidden">Your E-ticket has been issued</h1>
          <div className="my-8 bg-white p-8 rounded-[4px]" ref={ref}>
            {/* ticket header start */}
            <div className="flex flex-wrap items-start justify-between">
              <div>
                <h1 className="text-2xl font-semibold">E-ticket</h1>
                <p>Departure Flight</p>
              </div>
              <Logo />
            </div>
            {/* ticket header end */}
            {/* flight detail start */}
            <div className="flex flex-wrap  gap-4 justify-between mt-8 ">
              <div>
                {detailTransaction ? (
                  <>
                    <img src={airlineLogo} alt={airlineName} className="h-8" />
                    <p className="font-semibold mt-2">{airlineName}</p>
                    <p>{code}</p>
                    <p className="capitalize">{sc}</p>
                  </>
                ) : (
                  <>
                    <TextSkeleton className="w-20" />
                    <TextSkeleton className="w-20" />
                    <TextSkeleton className="w-20" />
                    <TextSkeleton className="w-20" />
                  </>
                )}
              </div>
              <div className="text-base">
                {detailTransaction ? (
                  <p className="mb-3">{new Date(date).toDateString()}</p>
                ) : (
                  <TextSkeleton />
                )}
                {detailTransaction ? (
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-3 justify-between text-xl">
                      <p>{departureTime ? departureTime.substring(0, 5) : ''}</p>
                      <p>{arrivalTime ? arrivalTime.substring(0, 5) : ''}</p>
                    </div>
                    <div className="flex flex-col gap-2 justify-between items-center">
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8Z"
                          fill="#512BD4"
                        />
                      </svg>
                      <div className="border-l-2 h-4" />
                      <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <circle cx="8" cy="8" r="7" stroke="#512BD4" strokeWidth="2" />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2 justify-between">
                      <p>
                        {departureAirport}({departure})
                      </p>
                      <p>
                        {arrivalAirport}({arrival})
                      </p>
                    </div>
                  </div>
                ) : (
                  <>
                    <TextSkeleton />
                    <TextSkeleton />
                    <TextSkeleton />
                  </>
                )}
              </div>
              <div>
                <p className="text-xs font-semibold">Terbang Tinggi Booking ID</p>
                <p className="text-sm font-bold mt-2 mb-2">{new Date().getTime()}</p>
                <div className={isPaid ? 'block' : 'hidden'}>
                  {image ? (
                    <img
                      src={`data:image/png;base64,${buffer}`}
                      alt="qr code ticket"
                      className="h-24"
                    />
                  ) : (
                    <div className="h-24 w-24 animate-pulse bg-gray-200 rounded-sm" />
                  )}
                </div>
              </div>
            </div>
            {/* flight detail end */}

            <InformationSection />

            <div className="overflow-x-auto">
              <table className="table w-full">
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Passenger(s)</th>
                    <th>Route</th>
                  </tr>
                </thead>
                <tbody>
                  {ticketData ? (
                    passengers.map((passenger, index) => (
                      <tr key={passenger.id}>
                        <th>{index + 1}</th>
                        <td className="capitalize">{`${passenger.firstName} ${passenger.lastName}`}</td>
                        <td>
                          <div className="badge badge-success text-xs">
                            {departure} - {arrival}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td>
                        <div className="flex flex-col gap-2 mt-4">
                          <TextSkeleton />
                          <TextSkeleton />
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex gap-4 flex-col flex-wrap my-8">
            <h2 className="text-xl font-semibold">
              Download your e-tikcet and boarding pass below
            </h2>
            <div className="flex gap-4 flex-wrap">
              <button
                onClick={onButtonClick}
                className="w-auto btn border-brand btn-outline"
                type="button">
                <HiOutlineTicket size={24} className="mr-2" />
                E-ticket
              </button>
              {url ? (
                <a href={url} target="_blank" rel="noreferrer">
                  <button
                    onClick={() => ''}
                    className="w-auto btn btn-primary bg-brand"
                    type="button">
                    <HiOutlineTicket size={24} className="mr-2" />
                    Boarding Pass
                  </button>
                </a>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
      </Layout>
    </Protected>
  );
}

export default ETicket;

export function InformationSection() {
  return (
    <div className="border-t-2 border-b-2 flex flex-col lg:flex-row justify-between gap-8 my-8 p-8">
      <div className="flex items-center gap-4">
        <div>
          <IoDocumentTextOutline size={24} />
        </div>
        <p>Show e-ticket and passengers identity when check-in</p>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <BiTimeFive size={24} />
        </div>
        <p>Check-in at least 30 minutes before scheduled departure time</p>
      </div>
      <div className="flex items-center gap-4">
        <div>
          <AiOutlineInfoCircle size={24} />
        </div>
        <p>Times shown are local airport time</p>
      </div>
    </div>
  );
}
