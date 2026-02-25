import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';

export function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <style>{`
        :root {
          --color-gold: #C9A962;
          --color-gold-light: #D4BC7C;
          --color-dark: #0a0a0a;
          --color-dark-lighter: #141414;
        }
      `}</style>
      <div className="min-h-screen text-white" style={{ backgroundColor: 'var(--color-dark)' }}>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </>
  );
}
