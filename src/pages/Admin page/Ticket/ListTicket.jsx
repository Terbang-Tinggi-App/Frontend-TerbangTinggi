/* eslint-disable react/no-array-index-key */
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { IoWarningOutline } from 'react-icons/io5';

import { Dashboard } from '../../../components/Layout';
import { setTicketData, resetData, getAllTickets } from '../../../redux/ticket/ticket.actions';
import TableSkeleton from '../../../components/Layout/Skeleton';
import CustomModal from '../../../components/Modal/CustomModal';
import Spinner from '../../../components/Layout/Spinner';
import { FormControl, Label } from '../../../components/Input';

const BASE_URL = import.meta.env.VITE_BASE_URL;

function ListTicket() {
  const [refetch, setRefetch] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const [limit, setLimit] = useState('10');
  const [query, setQuery] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data, error } = useSelector((state) => state.ticket.allTickets);

  const filterData = (q = '') =>
    data
      ? data?.rows?.filter((x) => Object.values(x).join().toLowerCase().includes(q.toLowerCase()))
      : {};

  const [searchParams, setSearchParams] = useSearchParams({
    page: 1
  });

  const page = searchParams.get('page');
  const { totalPage: totalPages } = data ?? {};

  const handleDecrementPage = () => {
    setSearchParams({
      page: +searchParams.get('page') - 1
    });
  };

  const handleIncrementPage = () => {
    setSearchParams({
      page: +searchParams.get('page') + 1
    });
  };

  const handleAmountPage = (amount) => {
    setSearchParams({
      page: amount
    });
  };

  const handleDeleteTicket = async (id) => {
    try {
      const { status } = await axios.delete(`${BASE_URL}/flight/data/${id}`, {
        headers: { Authorization: localStorage.getItem('token') }
      });
      if (status === 200 || status === 201) {
        toast('Ticket is deleted', { type: 'success' });
      }
      setRefetch(true);
    } catch (err) {
      toast(err.message, { type: 'error' });
    }
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentTicket({});
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    dispatch(resetData());
    dispatch(getAllTickets(Number(page), Number(limit)));
    setRefetch(false);
  }, [refetch, page, limit]);

  if (error) {
    return (
      <Dashboard>
        <section className="min-h-screen">
          <h1 className="text-2xl mb-4">List of all available tickets</h1>
          <p>
            {error}, create one{' '}
            <Link className="underline" to="/create-ticket">
              here
            </Link>
          </p>
        </section>
      </Dashboard>
    );
  }

  return (
    <Dashboard>
      <section className="my-4 mx-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mb-4 hidden md:block">List all Flights</h1>
          <div className="form-control">
            <FormControl>
              <Label> </Label>
              <input
                type="text"
                placeholder="Search…"
                className="input input-bordered input-sm md:input-md"
                value={query}
                onChange={handleSearch}
              />
            </FormControl>
          </div>
          <FormControl className="my-2">
            <Label>Items per page</Label>
            <select
              name="limit"
              id="limit"
              value={limit}
              onChange={(e) => {
                setLimit(e.target.value);
                setSearchParams({
                  page: 1
                });
              }}
              className="select select-bordered select-sm">
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </FormControl>
        </div>
        {data ? (
          <>
            <div className="overflow-x-auto">
              {data?.rows?.length > 0 ? (
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="cursor-pointer">
                      <th title="Flight Code">FC</th>
                      <th>Airline</th>
                      <th title="Departure Airport">DA</th>
                      <th title="Departure Airport IATA Code">DAI</th>
                      <th title="Arrival Airport">AA</th>
                      <th title="Arrival Airport IATA Code">AAI</th>
                      <th title="Seat Class">SC</th>
                      <th title="Trip Type">TT</th>
                      <th>Date</th>
                      <th>Return Date</th>
                      <th>Departure Time</th>
                      <th>Arrival Time</th>
                      <th>Capacity</th>
                      <th>Price</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filterData(query)?.map((ticket, index) => (
                      <tr key={index} className="py-2">
                        <td className="uppercase">{ticket.code}</td>
                        <td className="capitalize">{ticket.airlineName}</td>
                        <td>{ticket.departureAirport}</td>
                        <td>{ticket.departure}</td>
                        <td>{ticket.arrivalAirport}</td>
                        <td>{ticket.arrival}</td>
                        <td className="capitalize">{ticket.sc}</td>
                        <td className="capitalize">{ticket.tripType.split('_').join(' ')}</td>
                        <td>{new Date(ticket.date).toDateString()}</td>
                        <td className="text-center">
                          {ticket.returnDate ? new Date(ticket.returnDate).toDateString() : '-'}
                        </td>
                        <td>{ticket.departureTime}</td>
                        <td>{ticket.arrivalTime}</td>
                        <td>{ticket.capacity}</td>
                        <td>Rp. {new Intl.NumberFormat('ID-id').format(ticket.price)}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-xs mr-2"
                            onClick={() => {
                              dispatch(
                                setTicketData({
                                  code: ticket.code,
                                  airlineName: ticket.airlineName,
                                  departureAirport: ticket.departureAirport,
                                  departure: ticket.departure,
                                  arrivalAirport: ticket.arrivalAirport,
                                  arrival: ticket.arrival,
                                  date: ticket.date,
                                  departureTime: ticket.departureTime,
                                  arrivalTime: ticket.arrivalTime,
                                  price: ticket.price
                                })
                              );
                              navigate(`/flights/${ticket.id}`);
                            }}
                            type="button">
                            Update
                          </button>
                          <button
                            className="btn btn-error btn-xs"
                            onClick={() => {
                              openModal();
                              setCurrentTicket(ticket);
                            }}
                            type="button">
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <TableSkeleton />
              )}
            </div>

            <div className="flex justify-center my-4">
              <div className="btn-group">
                <button
                  type="button"
                  className={`btn ${page <= 1 ? 'hidden' : 'block'}`}
                  disabled={page <= 1}
                  onClick={handleDecrementPage}>
                  Prev
                </button>
                <button
                  type="button"
                  className={`btn ${
                    !Number(page <= 1) || !Number(page - 1) <= 1 ? 'hidden' : 'block'
                  }`}
                  disabled={page <= 1}
                  onClick={handleDecrementPage}>
                  1l
                </button>
                <button
                  type="button"
                  className={`btn ${page <= 1 ? 'hidden' : 'block'}`}
                  disabled={page <= 1}
                  onClick={handleDecrementPage}>
                  {page - 1}
                </button>
                <button type="button" className="btn btn-active">
                  {page}
                </button>
                <button
                  type="button"
                  className={`btn ${Number(page) === Number(totalPages) ? 'hidden' : 'block'}`}
                  disabled={page >= totalPages}
                  onClick={handleIncrementPage}>
                  {Number(page) + 1}
                </button>
                <button
                  type="button"
                  className={`btn ${
                    Number(page) === Number(totalPages) || Number(totalPages - 1) === Number(page)
                      ? 'hidden'
                      : 'block'
                  }`}
                  disabled={page >= totalPages}
                  onClick={() => handleAmountPage(Number(totalPages))}>
                  {totalPages}
                </button>
                <button
                  type="button"
                  className={`btn ${Number(page) === Number(totalPages) ? 'hidden' : 'block'}`}
                  disabled={page >= totalPages}
                  onClick={handleIncrementPage}>
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <Spinner textContent="Getting flights list" />
        )}
      </section>

      <CustomModal isOpen={isOpen} closeModal={closeModal} label="Delete flight">
        <div className="flex flex-wrap gap-4 flex-col">
          <IoWarningOutline size={32} />
          <h2 className="text-2xl font-bold">Delete flight {currentTicket.code}?</h2>
          <p>
            From {currentTicket.departureAirport} To {currentTicket.arrivalAirport}
          </p>
          <p>
            {currentTicket.airlineName} &bull; {new Date(currentTicket.date).toDateString()}
          </p>
          <div className="w-full flex justify-end gap-4">
            <button type="button" onClick={closeModal} className="btn btn-outline btn-primary">
              Cancel
            </button>
            <button
              className="btn btn-error"
              onClick={() => {
                handleDeleteTicket(currentTicket.id);
                closeModal();
              }}
              type="button">
              Delete
            </button>
          </div>
        </div>
      </CustomModal>
    </Dashboard>
  );
}

export default ListTicket;
