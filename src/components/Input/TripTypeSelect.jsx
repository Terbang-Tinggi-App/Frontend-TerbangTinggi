import React from 'react';

/**
 *
 * @param {React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>} props
 * @returns
 */
export function TripTypeSelect(props) {
  const { className, ...rest } = props;

  return (
    <select
      className={`select select-primary w-full max-w-xs ${className}`}
      name="tripType"
      {...rest}
    >
      <option value="one_way">One way</option>
      <option value="round_trip">Round trip</option>
    </select>
  );
}
