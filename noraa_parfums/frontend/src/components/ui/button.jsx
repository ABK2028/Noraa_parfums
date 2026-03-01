import React from 'react';

export function Button({ className = '', type = 'button', children, ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center rounded-md px-4 py-2 font-medium transition-colors ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
