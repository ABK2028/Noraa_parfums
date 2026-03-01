import React from 'react';

export function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`w-full rounded-md border px-3 py-2 outline-none focus:ring-1 ${className}`}
      {...props}
    />
  );
}
