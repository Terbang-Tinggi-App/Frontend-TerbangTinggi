/* eslint-disable import/extensions */
import { useEffect, useState } from 'react';
import { IoMdAirplane } from 'react-icons/io';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getTransactionsData } from '@/redux/transactions/transactions.actions';
import { Protected } from '@/components/Routes';

export function Transactions() {
  const [tabActive, setTabActive] = useState('paid');

  const dispatch = useDispatch();

  const {
    paid: paidTransactions,
    unpaid: unpaidTransactions,
    experied: experiedTransactions
  } = useSelector((state) => state.transactions);

  const handlePaidTab = () => {
    setTabActive('paid');
  };

  const handleUnpaidTab = () => {
    setTabActive('unpaid');
  };

  const handleExperiedTab = () => {
    setTabActive('experied');
  };

  useEffect(() => {
    dispatch(getTransactionsData());
  }, []);

  return (
    <Protected>
      <div className="min-h-screen mx-4 md:mx-16 my-8">
        <h1 className="text-3xl font-bold my-4">Transactions</h1>
        <div className="tabs tabs-boxed mb-4 flex justify-center">
          <button
            className={`tab ${tabActive === 'paid' ? 'tab-active' : null}`}
            type="button"
            onClick={handlePaidTab}>
            Paid
          </button>
          <button
            className={`tab ${tabActive === 'unpaid' ? 'tab-active' : null}`}
            type="button"
            onClick={handleUnpaidTab}>
            Unpaid
          </button>
          <button
            className={`tab ${tabActive === 'experied' ? 'tab-active' : null}`}
            type="button"
            onClick={handleExperiedTab}>
            Expired
          </button>
        </div>
        <div className="flex flex-col flex-wrap gap-4">
          {tabActive === 'paid' && paidTransactions
            ? paidTransactions?.map((item) => (
                <Link
                  key={item.id}
                  className="border rounded-[4px] p-4 flex flex-wrap gap-2"
                  to={`/user/transactions/${item.payment_code}`}>
                  <div className="flex justify-between gap-4 w-full">
                    <p className="text-slate-500">
                      ID Transaction {item?.detail_transaction[0]?.transaction_id}
                    </p>
                    <p className="font-semibold md:font-bold text-base md:text-lg">
                      Rp{' '}
                      {new Intl.NumberFormat('ID-id').format(
                        item.detail_transaction[0].flight.price * item.total
                      ) ?? 0}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 flex-wrap font-medium">
                    <IoMdAirplane className="rotate-45" />
                    {item?.detail_transaction[0]?.flight?.departureAirport} &rarr;{' '}
                    {item?.detail_transaction[0]?.flight?.arrivalAirport}
                  </p>
                  <div className="flex justify-between gap-4 w-full">
                    <p className="text-slate-500">
                      {item?.detail_transaction[0]?.flight?.airlineName} &bull;{' '}
                      {new Date(item?.detail_transaction[0]?.flight?.date).toLocaleDateString()}
                    </p>
                    <div className="badge badge-success gap-2">Paid</div>
                  </div>
                </Link>
              ))
            : ''}

          {tabActive === 'unpaid' && unpaidTransactions
            ? unpaidTransactions?.map((item) => (
                <Link
                  key={item.id}
                  className="border rounded-[4px] p-4 flex flex-wrap gap-2"
                  to={`/payment/${item.payment_code}`}>
                  <div className="flex justify-between gap-4 w-full">
                    <p className="text-slate-500">
                      ID Transaction {item?.detail_transaction[0]?.transaction_id}
                    </p>
                    <p className="font-semibold md:font-bold text-base md:text-lg">
                      Rp{' '}
                      {new Intl.NumberFormat('ID-id').format(
                        item.detail_transaction[0].flight.price * item.total
                      ) ?? 0}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 flex-wrap font-medium">
                    <IoMdAirplane className="rotate-45" />
                    {item?.detail_transaction[0]?.flight?.departureAirport} &rarr;{' '}
                    {item?.detail_transaction[0]?.flight?.arrivalAirport}
                  </p>
                  <div className="flex justify-between gap-4 w-full">
                    <p className="text-slate-500">
                      {item?.detail_transaction[0]?.flight?.airlineName} &bull;{' '}
                      {new Date(item?.detail_transaction[0]?.flight?.date).toLocaleDateString()}
                    </p>
                    <div className="badge badge-warning gap-2">Unpaid</div>
                  </div>
                </Link>
              ))
            : ''}

          {tabActive === 'experied' && experiedTransactions
            ? experiedTransactions?.map((item) => (
                <div key={item.id} className="border rounded-[4px] p-4 flex flex-wrap gap-2">
                  <div className="flex justify-between gap-4 w-full">
                    <p className="text-slate-500">
                      ID Transaction {item?.detail_transaction[0]?.transaction_id}
                    </p>
                    <p className="font-semibold md:font-bold text-base md:text-lg">
                      Rp{' '}
                      {new Intl.NumberFormat('ID-id').format(
                        item.detail_transaction[0].flight.price * item.total
                      ) ?? 0}
                    </p>
                  </div>
                  <p className="flex items-center gap-2 flex-wrap font-medium">
                    <IoMdAirplane className="rotate-45" />
                    {item?.detail_transaction[0]?.flight?.departureAirport} &rarr;{' '}
                    {item?.detail_transaction[0]?.flight?.arrivalAirport}
                  </p>
                  <div className="flex justify-between gap-4 w-full">
                    <p className="text-slate-500">
                      {item?.detail_transaction[0]?.flight?.airlineName} &bull;{' '}
                      {new Date(item?.detail_transaction[0]?.flight?.date).toLocaleDateString()}
                    </p>
                    <div className="badge badge-error gap-2">Experied</div>
                  </div>
                </div>
              ))
            : ''}
        </div>
      </div>
    </Protected>
  );
}
