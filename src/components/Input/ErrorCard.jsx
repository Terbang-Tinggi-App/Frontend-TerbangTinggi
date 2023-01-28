import React from 'react';

export function ErrorCard({ error }) {
  return error ? (
    <p className="bg-red-300 p-3 my-2 rounded-[4px] text-red-700 font-semibold w-80 text-center">
      {typeof error === 'string' ? error : JSON.stringify(error)}
    </p>
  ) : null;
}
