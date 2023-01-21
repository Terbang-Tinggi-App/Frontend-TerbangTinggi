import React from 'react';

/**
 *
 * @param {React.DetailedHTMLProps<React.SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement>} props
 * @returns
 */
export function SeatClassSelect(props) {
  const { className, ...rest } = props;
  return (
    <select
      className={`select select-primary w-full max-w-xs ${className}`}
      name="seatClass"
      {...rest}
    >
      <option value="economy">Economy</option>
      <option value="business">Bussiness</option>
    </select>
  );
}
