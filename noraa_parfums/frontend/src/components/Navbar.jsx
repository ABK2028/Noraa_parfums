import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Menu, X, Heart, Search } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import RegionSelector from './RegionSelector';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: 'Home' },
    { name: 'Products', path: 'Products' },
    { name: 'Our Story', path: 'About' },
    { name: 'Contact', path: 'Contact' },
  ];

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 backdrop-blur-md shadow-lg"
      style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          <Link to={createPageUrl('Home')} className="flex-shrink-0 inline-flex items-center px-2">
            <img
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697d3ca8cdcd480e7b1498cf/86b7ebcf2_Logo.jpg"
              alt="Noraa Parfums"
              className="h-20 w-auto object-contain"
            />
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={createPageUrl(link.path)}
                className="text-sm tracking-widest text-stone-300 hover:text-white transition-colors relative group"
              >
                {link.name.toUpperCase()}
                <span className="absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full" style={{ backgroundColor: 'var(--color-gold)' }} />
              </Link>
            ))}
            <Link
              to={createPageUrl('PerfumeFinder')}
              className="text-sm tracking-widest text-stone-300 hover:text-white transition-colors relative group"
            >
              FIND YOUR SCENT
              <span className="absolute -bottom-1 left-0 w-0 h-px transition-all group-hover:w-full" style={{ backgroundColor: 'var(--color-gold)' }} />
            </Link>
          </div>

          <div className="flex items-center gap-2">
            <RegionSelector />

            <Link
              to={createPageUrl('Favorites')}
              className="p-2 text-stone-300 transition-colors"
              style={{ '--hover-color': 'var(--color-gold)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-gold)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '')}
            >
              <Heart className="w-5 h-5" />
            </Link>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-stone-300 hover:text-white"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden backdrop-blur-md border-t border-stone-800"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  className="block text-lg tracking-widest text-stone-300 hover:text-white py-2"
                >
                  {link.name.toUpperCase()}
                </Link>
              ))}
              <Link
                to={createPageUrl('PerfumeFinder')}
                className="flex items-center gap-2 py-2"
                style={{ color: 'var(--color-gold)' }}
              >
                <Search className="w-5 h-5" />
                <span className="tracking-widest">FIND YOUR OWN SCENT</span>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
