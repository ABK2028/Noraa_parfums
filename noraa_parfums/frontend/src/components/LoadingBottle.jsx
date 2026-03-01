import React from 'react';
import { motion } from 'framer-motion';

export default function LoadingBottle({ size = 'md' }) {
  const sizes = {
    sm: { bottle: 'w-8 h-12', liquid: 'h-8' },
    md: { bottle: 'w-12 h-16', liquid: 'h-12' },
    lg: { bottle: 'w-16 h-24', liquid: 'h-16' },
  };

  const sizeClasses = sizes[size] || sizes.md;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizeClasses.bottle} relative`}>
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-1/5 rounded-t-sm"
          style={{ backgroundColor: 'var(--color-gold)' }}
        />

        <div
          className="absolute top-[20%] left-0 w-full h-[80%] rounded-b-lg border-2 overflow-hidden"
          style={{ borderColor: 'var(--color-gold)', backgroundColor: 'rgba(20, 20, 20, 0.3)' }}
        >
          <motion.div
            className="absolute bottom-0 left-0 w-full rounded-b-lg"
            style={{ backgroundColor: 'var(--color-gold)', opacity: 0.6 }}
            initial={{ height: '0%' }}
            animate={{ height: ['0%', '100%', '0%'] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </div>
      </div>

      <motion.p
        className="text-xs tracking-widest"
        style={{ color: 'var(--color-gold)' }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        LOADING
      </motion.p>
    </div>
  );
}
