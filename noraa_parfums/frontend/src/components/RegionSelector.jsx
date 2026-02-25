import React, { useState } from 'react';
import { useRegion, REGIONS } from './RegionContext';
import { ChevronDown, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RegionSelector() {
  const { region, changeRegion, regionData } = useRegion();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 text-sm text-stone-300 hover:text-white transition-colors"
      >
        <Globe className="w-4 h-4" />
        <span>{regionData.flag}</span>
        <span className="hidden sm:inline">{regionData.code}</span>
        <ChevronDown className={`w-3 h-3 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="absolute right-0 top-full mt-2 border border-stone-700 rounded-lg shadow-xl z-50 overflow-hidden min-w-[180px]"
              style={{ backgroundColor: 'var(--color-dark-lighter)' }}
            >
              {Object.values(REGIONS).map((r) => (
                <button
                  key={r.code}
                  onClick={() => {
                    changeRegion(r.code);
                    setIsOpen(false);
                  }}
                  className="w-full px-4 py-3 text-left text-sm flex items-center gap-3 transition-colors"
                  style={{
                    backgroundColor: region === r.code ? 'rgba(201, 169, 98, 0.15)' : 'transparent',
                    color: region === r.code ? 'var(--color-gold)' : '#d6d3d1',
                  }}
                  onMouseEnter={(e) => {
                    if (region !== r.code) {
                      e.currentTarget.style.backgroundColor = '#1c1917';
                      e.currentTarget.style.color = 'white';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (region !== r.code) {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = '#d6d3d1';
                    }
                  }}
                >
                  <span className="text-lg">{r.flag}</span>
                  <span>{r.name}</span>
                  <span className="ml-auto text-stone-500">{r.currency}</span>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
