import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

import { BASE_API_URL } from '@/config';
import { Layout } from '@/components/Layout';
import { ExpediaCard } from '@/components/Cards';
import { Modal, SearchFlightsForm, Spinner } from '@/components/Elements';
import { getSortedTicket } from '@/utils/tickets';

export function SearchResult() {
  const [resultData, setResultData] = useState(null);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState('best');
  const [isOpen, setIsOpen] = useState(false);

  const [refresh, setRefresh] = useState(false);
  const [searchParams] = useSearchParams();

  const departureParams = searchParams.get('departure');
  const arrivalParams = searchParams.get('arrival');
  const passengers = searchParams.get('passengers');
  const tripTypeParams = searchParams.get('tripType');
  const seatClassParams = searchParams.get('sc');
  const fromDate = searchParams.get('date');
  const returnDateParams = searchParams.get('returnDate');

  const isPast = new Date(fromDate) < new Date().setHours(0, 0, 0, 0);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    if (tripTypeParams === 'one_way') {
      (async () => {
        try {
          setError(null);
          const { data } = await axios.get(
            `${BASE_API_URL}/schedule/search?departure=${departureParams}&arrival=${arrivalParams}&date=${fromDate}&sc=${seatClassParams}&tripType=${tripTypeParams}&passengers=${passengers}`
          );
          setResultData(data?.data);
        } catch (err) {
          setError(err);
        }
      })();
    }
    if (tripTypeParams === 'round_trip') {
      (async () => {
        try {
          setError(null);
          const { data } = await axios.get(
            `${BASE_API_URL}/schedule/search?departure=${departureParams}&arrival=${arrivalParams}&date=${fromDate}&sc=${seatClassParams}&tripType=${tripTypeParams}&passengers=${passengers}&returnDate=${returnDateParams}`
          );
          setResultData(data?.data);
        } catch (err) {
          setError(err);
        }
      })();
    }
    setRefresh(false);
  }, [refresh]);

  if (isPast) {
    return (
      <Layout>
        <section className="min-h-screen md:h-[calc(100vh-250px)] flex flex-col justify-center items-center mx-8">
          <img
            className="h-48"
            src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1672595705/terbangtinggi/undraw_Booked_re_vtod_virqiq.png"
            alt="Date has passed"
          />
          <h2 className="capitalize mb-2 font-semibold text-xl">Departure date has passed</h2>
          <p className="text-center mb-2">Please search for flights on other dates.</p>
          <button className="btn btn-primary bg-brand" onClick={openModal} type="button">
            Change Date
          </button>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            label="Change search destination"
            className="w-11/12 max-w-4xl">
            <SearchFlightsForm setRefresh={setRefresh} setIsOpen={setIsOpen} />
            <div className="-mt-14 mx-8 block md:hidden">
              <button className="btn btn-outline w-full" onClick={closeModal} type="button">
                Cancel
              </button>
            </div>
          </Modal>
        </section>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <section className="min-h-screen md:h-[calc(100vh-250px)] flex flex-col justify-center items-center mx-8">
          <img
            className="h-48"
            src="https://res.cloudinary.com/dmgrxm78p/image/upload/v1672468918/terbangtinggi/undraw_Lost_re_xqjt_i075rg.png"
            alt="Lost illustration"
          />
          <h2 className="capitalize mb-2 font-semibold text-xl">
            {error?.response?.data?.message}
          </h2>
          <p className="text-center mb-2">
            Tip: Modify your search with a different date or cabin class.
          </p>
          <button className="btn btn-primary bg-brand" onClick={openModal} type="button">
            Change search
          </button>
          <Modal
            isOpen={isOpen}
            closeModal={closeModal}
            label="Change search destination"
            className="w-11/12 max-w-4xl">
            <SearchFlightsForm setRefresh={setRefresh} setIsOpen={setIsOpen} />
            <div className="-mt-14 mx-8 block md:hidden">
              <button className="btn btn-outline w-full" onClick={closeModal} type="button">
                Cancel
              </button>
            </div>
          </Modal>
        </section>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full mx-auto min-h-screen">
        {resultData ? (
          <div className="flex gap-4 justify-center py-4 items-center bg-slate-200 px-4">
            <p className="capitalize">
              {departureParams} &rarr; {arrivalParams} &bull; {new Date(fromDate).toDateString()}{' '}
              &bull; {passengers} passengers &bull; {seatClassParams}
            </p>
            &bull;
            <button className="btn btn-sm btn-info" type="button" onClick={openModal}>
              Change Search
            </button>
          </div>
        ) : (
          ''
        )}

        <div className="flex justify-center my-8">
          <div className="flex justify-center items-center max-w-3xl flex-col gap-4 mx-4">
            {resultData ? (
              <div className="flex justify-between w-full">
                <p>Showing {resultData?.length} results</p>
                <label htmlFor="sort">
                  <select
                    name="sort"
                    onChange={(e) => setSort(e.target.value)}
                    className="select select-bordered w-full max-w-xs select-xs">
                    <option value="best">Featured</option>
                    <option value="price">Price: Low to High</option>
                    <option value="priceAsc">Price: High to Low</option>
                    <option value="time">Arrival: Earlier</option>
                    <option value="timeLate">Arrival: Later</option>
                  </select>
                </label>
              </div>
            ) : null}
            {resultData ? (
              getSortedTicket(sort, resultData)?.map((ticket) => (
                <ExpediaCard
                  key={ticket.id}
                  id={ticket.id}
                  airlineName={ticket.airlineName}
                  logo={ticket.airlineLogo}
                  departureAirport={ticket.departureAirport}
                  departureIata={ticket.departure}
                  arrivalAirport={ticket.arrivalAirport}
                  arrivalIata={ticket.arrival}
                  departureTime={ticket.departureTime}
                  arrivalTime={ticket.arrivalTime}
                  price={ticket.price}
                  sc={ticket.sc}
                  passengers={ticket.passengers}
                  tripType={ticket.tripType.split('_').join(' ')}
                  query={`departure=${departureParams}&arrival=${arrivalParams}&date=${fromDate}&sc=${seatClassParams}&tripType=${tripTypeParams}&passengers=${passengers}`}
                />
              ))
            ) : (
              <Spinner textContent="Searching your ticket" />
            )}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        closeModal={closeModal}
        label="Change search destination"
        className="w-11/12 max-w-4xl">
        <SearchFlightsForm setRefresh={setRefresh} setIsOpen={setIsOpen} />
        <div className="-mt-14 mx-8 block md:hidden">
          <button className="btn btn-outline w-full" onClick={closeModal} type="button">
            Cancel
          </button>
        </div>
      </Modal>
    </Layout>
  );
}
