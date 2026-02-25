import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-stone-800" style={{ backgroundColor: 'var(--color-dark-lighter)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-light tracking-[0.3em] text-white mb-2">
              NORAA
              <span className="block text-[10px] tracking-[0.4em] -mt-1" style={{ color: 'var(--color-gold)' }}>PARFUMS</span>
            </h2>
            <p className="text-stone-400 text-sm leading-relaxed mt-4 max-w-md">
              Discover the art of fragrance. Each scent is carefully curated to evoke emotions
              and create lasting memories. Luxury perfumes at accessible prices.
            </p>
          </div>

          <div>
            <h3 className="text-white text-sm tracking-widest mb-6">EXPLORE</h3>
            <div className="space-y-3">
              {[
                { name: 'Products', path: 'Products' },
                { name: 'Our Story', path: 'About' },
                { name: 'Contact', path: 'Contact' },
                { name: 'Find Your Scent', path: 'PerfumeFinder' },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={createPageUrl(link.path)}
                  className="block text-white text-sm transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-white text-sm tracking-widest mb-6">FOLLOW US</h3>
            <div className="flex gap-4">
              <a href="#" className="p-2 border border-stone-700 rounded-full text-white hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 border border-stone-700 rounded-full text-white hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 border border-stone-700 rounded-full text-white hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-stone-800 mt-12 pt-8 text-center">
          <p className="text-stone-500 text-sm">
            © {new Date().getFullYear()} Noraa Parfums. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
