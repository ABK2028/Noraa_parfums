import React, { createContext, useContext, useState, useEffect } from 'react';

const RegionContext = createContext();

export const REGIONS = {
  UK: { code: 'UK', currency: '£', name: 'United Kingdom', flag: '🇬🇧' },
  IN: { code: 'IN', currency: '₹', name: 'India', flag: '🇮🇳' },
};

export function RegionProvider({ children }) {
  const [region, setRegion] = useState('UK');

  useEffect(() => {
    const saved = localStorage.getItem('noraa_region');
    if (saved && REGIONS[saved]) {
      setRegion(saved);
    }
  }, []);

  const changeRegion = (newRegion) => {
    setRegion(newRegion);
    localStorage.setItem('noraa_region', newRegion);
  };

  return (
    <RegionContext.Provider value={{ region, changeRegion, regionData: REGIONS[region] }}>
      {children}
    </RegionContext.Provider>
  );
}

export function useRegion() {
  const context = useContext(RegionContext);
  if (!context) {
    throw new Error('useRegion must be used within a RegionProvider');
  }
  return context;
}
