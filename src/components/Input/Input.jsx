import React from 'react';

import { Label } from './Label';

/**
 *
 * @param {React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>} rest
 * @param {string} className
 * @param {string} variant
 * @returns
 */
export function Input({ className, label, variant, error, ...rest }) {
  const generateVariant = (type) => {
    switch (type) {
      case 'primary':
        return 'input-primary';
      case 'ghost':
        return 'input-ghost';
      case 'bordered':
        return 'input-bordered';
      case 'secondary':
        return 'input-secondary';
      default:
        return '';
    }
  };

  return (
    <Label>
      {label}
      <input className={`input ${generateVariant(variant)} ${className}`} {...rest} />
    </Label>
  );
}
