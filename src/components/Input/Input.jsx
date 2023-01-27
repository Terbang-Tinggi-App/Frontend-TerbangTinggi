import React from 'react';

/**
 *
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} rest
 * @param {string} className
 * @param {string} error
 * @returns
 */
export const Input = React.forwardRef((props, ref) => {
  const { className, error, ...rest } = props;
  return (
    <>
      <input
        ref={ref}
        className={`input  ${error ? 'input-error' : `input-primary`} ${className} max-w-sm`}
        {...rest}
      />
      <small className="text-error block mt-1">{error}</small>
    </>
  );
});
