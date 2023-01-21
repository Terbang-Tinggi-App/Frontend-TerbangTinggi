import React, { useState } from 'react';
import { toast } from 'react-toastify';

import { Layout } from '../../components/Layout';

export function Reset() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResetLocalData = () => {
    setIsLoading(true);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('allAirports');
    localStorage.removeItem('historyArrival');
    localStorage.removeItem('historyDeparture');
    localStorage.removeItem('historyReturnDate');
    localStorage.removeItem('historyStartDate');
    localStorage.removeItem('historyTripType');
    localStorage.removeItem('historyStartDate');
    localStorage.removeItem('historySearch');
    setTimeout(() => {
      setIsLoading(false);
      toast('Cache is cleared', { type: 'success' });
    }, 1500);
  };

  return (
    <Layout title="Clear Cache">
      <div className="h-screen flex items-center justify-center flex-col gap-4">
        <h1 className="text-xl font-semibold">
          If for some reason, you can&apos;t login or something, just press this button
        </h1>
        <button
          className="btn btn-error"
          disabled={isLoading}
          onClick={handleResetLocalData}
          type="button"
        >
          {isLoading ? 'Clearing...' : 'Clear Cache'}
        </button>
      </div>
    </Layout>
  );
}
