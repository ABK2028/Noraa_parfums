import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-1 ${className}`}
      {...props}
    />
  );
}
