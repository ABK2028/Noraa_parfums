import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { useQuery } from '@tanstack/react-query';
import { useRegion } from '../components/RegionContext';
import ProductCard from '../components/ProductCard';
import { Heart, ArrowRight } from 'lucide-react';
import LoadingBottle from '../components/LoadingBottle';

export default function Favorites() {
  const { region } = useRegion();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const isAuth = await base44.auth.isAuthenticated();
        if (!isAuth) {
          base44.auth.redirectToLogin(window.location.href);
          return;
        }
        setIsAuthenticated(true);
      } catch (error) {
        base44.auth.redirectToLogin(window.location.href);
      } finally {
        setCheckingAuth(false);
      }
    };
    checkAuth();
  }, []);

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => base44.entities.Favorite.list(),
    enabled: isAuthenticated,
  });

  const { data: products = [] } = useQuery({
    queryKey: ['products', region],
    queryFn: () => base44.entities.Product.filter({ region }),
    enabled: isAuthenticated,
  });

  const favoriteProducts = products.filter(p => 
    favorites.some(f => f.product_id === p.id)
  );

  if (checkingAuth) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--color-dark)' }}>
        <LoadingBottle size="lg" />
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Hero */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <Heart className="w-10 h-10 mx-auto mb-6" style={{ color: 'var(--color-gold)' }} />
            <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-wide mb-4">
              Your Favorites
            </h1>
            <p className="text-stone-400">
              {favoriteProducts.length} {favoriteProducts.length === 1 ? 'fragrance' : 'fragrances'} saved
            </p>
          </motion.div>
        </div>
      </section>

      {/* Favorites Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {favoriteProducts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {favoriteProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ backgroundColor: 'var(--color-dark-lighter)' }}>
                <Heart className="w-10 h-10 text-stone-700" />
              </div>
              <h2 className="text-2xl font-light text-white mb-4">No favorites yet</h2>
              <p className="text-stone-500 mb-8">
                Start exploring our collection and save your favorite fragrances
              </p>
              <Link
                to={createPageUrl('Products')}
                className="inline-flex items-center gap-2 px-6 py-3 text-black font-medium tracking-widest text-sm transition-colors"
                style={{ backgroundColor: 'var(--color-gold)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
              >
                EXPLORE COLLECTION
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
