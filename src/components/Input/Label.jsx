import React from 'react';

export function Label({ children }) {
  return (
    <label className="label">
      <span>{children}</span>
    </label>
  );
}
