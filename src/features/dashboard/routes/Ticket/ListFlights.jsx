import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { IoWarningOutline } from 'react-icons/io5';

import { Modal, Spinner } from '@/components/Elements';
import { FormControl, Label } from '@/components/Form';
import { getAllTickets, deleteFlight } from '../../redux/ticket.actions';
import { getAllTicketsState } from '../../redux/ticket.slice';
import { Layout } from '../../components/Layout';

export function ListFlights() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentTicket, setCurrentTicket] = useState({});
  const [limit, setLimit] = useState('10');

  const dispatch = useDispatch();

  const { error, data, loading } = useSelector(getAllTicketsState);

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
    dispatch(deleteFlight(id));
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
    setCurrentTicket({});
  };

  const handleHello = () => {
    const currentSearchParams = new URLSearchParams(window.location.search);
    const currentPage = currentSearchParams.get('page');
    currentSearchParams.set('page', Number(currentPage) + 1);
    window.history.pushState(
      {},
      '',
      `${window.location.pathname}?${currentSearchParams.toString()}`
    );
  };

  useEffect(() => {
    dispatch(getAllTickets({ page: Number(page), limit: Number(limit) }));
  }, [page, limit]);

  if (error) {
    return (
      <Layout>
        <section className="min-h-screen">
          <h1 className="text-2xl mb-4">List of all available flights</h1>
          <p>
            {error}, create one{' '}
            <Link className="underline" to="/dashboard/flights/add">
              here
            </Link>
          </p>
        </section>
      </Layout>
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <section className="my-4 mx-2">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl mb-4 hidden md:block">List all Flights</h1>
          <div className="form-control">
            <FormControl>
              <Label> </Label>
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
        <div className="overflow-x-auto">
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
              {data?.rows?.map((ticket) => (
                <tr key={ticket.id} className="py-2">
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
                    <Link
                      className="btn btn-warning btn-xs mr-2"
                      to={`/dashboard/flights/${ticket.id}`}>
                      Update
                    </Link>
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
        </div>
        <button className="btn btn-success" onClick={() => handleHello(5)} type="button">
          Hello
        </button>
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
              className={`btn ${!Number(page <= 1) || !Number(page - 1) <= 1 ? 'hidden' : 'block'}`}
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
      </section>

      <Modal isOpen={isOpen} closeModal={closeModal} label="Delete flight">
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
      </Modal>
    </Layout>
  );
}

// Create reusable pagination
export function Pagination({ page, totalPages }) {
  const handleDecrementPage = () => {
    //
  };

  const handleIncrementPage = () => {
    //
  };

  const handleAmountPage = (amount) => {
    //
    // eslint-disable-next-line no-console
    console.log(amount);
  };
  return (
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
        className={`btn ${!Number(page <= 1) || !Number(page - 1) <= 1 ? 'hidden' : 'block'}`}
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
  );
}

// Join all object values into string
// const filterData = (q = '') =>
//   data
//     ? data?.rows?.filter((x) => Object.values(x).join().toLowerCase().includes(q.toLowerCase()))
//     : {};
