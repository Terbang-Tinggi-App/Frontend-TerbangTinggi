/* eslint-disable no-unsafe-optional-chaining */
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdPayment } from 'react-icons/md';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import useValidUser from '@/hooks/useValidUser';
import { Layout } from '@/components/Layout';
import { Button, CustomModal, ImageSkeleton, TextSkeleton } from '@/components/Elements';
import { Protected } from '@/components/Routes';

export function Payment() {
  const [ticketData, setTicketData] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const { paymentId } = useParams();
  const navigate = useNavigate();
  const isValidUser = useValidUser();

  const { isPaid, detail_transaction: detailTransaction, total } = ticketData ?? {};
  const passengers = detailTransaction ? detailTransaction[0]?.passenger : [];
  const {
    price,
    tripType,
    sc,
    arrivalAirport,
    departureAirport,
    date,
    arrivalTime,
    departureTime,
    airlineName,
    airlineLogo
  } = detailTransaction ? detailTransaction[0]?.flight : 0;

  const handlePayment = async () => {
    try {
      const { status, data } = await axios.post(
        `${BASE_API_URL}/ticket/${paymentId}`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem('token')
          }
        }
      );

      if (status === 200) {
        toast('Payment successfull, grab your ticket now', {
          type: 'success'
        });
        navigate(
          `/user/transactions/${paymentId}?id=${data.data.detail_transaction[0].transaction_id}`
        );
      }
    } catch (error) {
      toast(error.message, { type: 'error' });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`${BASE_API_URL}/ticket/${paymentId}`, {
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });
      if (data.data.isPaid) {
        navigate(`/eticket/${paymentId}`);
      }
      setTicketData(data.data);
    })();
  }, []);

  if (!isValidUser) {
    navigate('/login');
  }

  return (
    <Protected>
      <Layout title="Payment">
        <div className="flex justify-center my-4">
          <ul className="steps w-full">
            <li data-content="✓" className="step step-primary">
              Book
            </li>
            <li className="step step-primary">Pay</li>
            <li className="step">E-ticket</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 m-4 md:mx-44">
          <div className="self-start mb-2 md:mb-4">
            <div className="flex flex-wrap gap-4 font-normal text-sm mb-2 md:mb-4">
              {detailTransaction ? (
                <>
                  <p className="capitalize">{sc}</p> &bull;
                  <p className="capitalize">{tripType ? tripType.split('_').join(' ') : ''}</p>{' '}
                  &bull;
                  <p>{new Date(date).toDateString()}</p>
                </>
              ) : (
                <TextSkeleton className="w-80" />
              )}
            </div>
            <div>
              {detailTransaction ? (
                <h1 className="text-2xl md:text-3xl font-bold">
                  {departureAirport} &rarr; {arrivalAirport}
                </h1>
              ) : (
                <TextSkeleton className="h-5 w-80" />
              )}
            </div>
          </div>
          <h2 className="text-xl md:text-2xl self-start font-semibold">Check and pay</h2>
          {/* Flight detail */}
          <div className="flex items-center gap-4 border p-4 rounded-[4px]">
            {detailTransaction ? (
              <>
                <img src={airlineLogo} alt={airlineName} className="h-12" title={airlineName} />
                <div className="text-sm flex flex-col gap-2">
                  <p className="font-semibold">Flight to {arrivalAirport}</p>
                  <p>
                    {departureTime ? departureTime.substring(0, 5) : ''} -{' '}
                    {arrivalTime ? arrivalTime.substring(0, 5) : ''}
                  </p>
                  <p className="capitalize">{sc}</p>
                </div>
              </>
            ) : (
              <ImageSkeleton className="h-20 w-20" />
            )}
          </div>
          {/* Traveler Detail */}
          <div className="border p-4 rounded-[4px]">
            <h3 className="text-lg font-semibold mb-2">Traveler details</h3>
            <div className="text-sm flex flex-col gap-2">
              {detailTransaction ? (
                passengers.map((x, i) => (
                  <div key={x.id}>
                    <p className="capitalize font-medium">
                      <span className="font-bold">{i + 1}. </span>
                      {x.firstName} {x.lastName} - {x.type}
                    </p>
                  </div>
                ))
              ) : (
                <>
                  <TextSkeleton />
                  <TextSkeleton />
                </>
              )}
            </div>
          </div>
          {/* Price detail */}
          <div className="border p-4 rounded-[4px]">
            <h3 className="text-lg font-semibold mb-2">Fare details</h3>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <p>Ticket ({total ?? 0})</p>
                {detailTransaction ? (
                  <p className="font-semibold">
                    {`IDR${new Intl.NumberFormat('ID-id').format(price * total)}`}
                  </p>
                ) : (
                  <TextSkeleton />
                )}
              </div>
              <div className="flex justify-between">
                <p>Platform service fee</p>
                {detailTransaction ? (
                  <p className="font-semibold">
                    {`IDR${new Intl.NumberFormat('ID-id').format(15000)}`}
                  </p>
                ) : (
                  <TextSkeleton />
                )}
              </div>
              <div className="flex justify-between font-semibold text-xl border-t-2 border-gray-300 mt-2">
                <p>Total</p>
                {detailTransaction ? (
                  <p>{`IDR${new Intl.NumberFormat('ID-id').format(15000 + price * total)}`}</p>
                ) : (
                  <TextSkeleton />
                )}
              </div>
            </div>
          </div>
          <div className="mx-auto">
            <Button className={`max-w-xs ${isPaid ? 'hidden' : 'block'}`} onClick={openModal}>
              Confirm Payment
            </Button>
            <div
              className={`max-w-xs ${
                !isPaid ? 'hidden' : 'block'
              } bg-info text-black font-bold px-4 py-2 rounded-[4px]`}>
              Paid, get your e-ticket now
            </div>
            <CustomModal isOpen={isOpen} closeModal={closeModal} label="Payment confirmation">
              <MdPayment size={32} />
              <div className="flex flex-col justify-center gap-4 mt-2">
                <h2 className="font-bold text-xl">Confirm this payment?</h2>
                <p>
                  Make sure your data is correct. You cannot change the order details after
                  proceeding to checkout.
                </p>
                <div className="flex gap-4 justify-end">
                  <button type="button" className="btn btn-outline" onClick={closeModal}>
                    Cancel
                  </button>
                  <Button className="w-[120px]" onClick={handlePayment}>
                    Confirm
                  </Button>
                </div>
              </div>
            </CustomModal>
          </div>
        </div>
      </Layout>
    </Protected>
  );
}
