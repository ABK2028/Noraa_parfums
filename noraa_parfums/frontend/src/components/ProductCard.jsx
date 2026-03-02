import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Heart, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useRegion } from './RegionContext';
import { getFavorites, toggleFavorite } from '../lib/perfumeStore';

export default function ProductCard({ product, index = 0 }) {
  const { regionData } = useRegion();
  const [isHovered, setIsHovered] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const hasSecondImage = Boolean(product.images?.[1]);

  const favorites = useMemo(() => getFavorites(), [refreshKey]);
  const isFavorited = favorites.some((f) => f.product_id === product.id);

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
    setRefreshKey((prev) => prev + 1);
  };

  const minPrice = product.sizes?.[0]?.price;
  const maxPrice = product.sizes?.[product.sizes.length - 1]?.price;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: 'easeOut' }}
      className="group w-full max-w-sm mx-auto h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative rounded-2xl overflow-hidden border transition-all duration-500 h-full flex flex-col"
        style={{
          backgroundImage: 'linear-gradient(to bottom, var(--color-dark-lighter), var(--color-dark))',
          borderColor: 'rgba(120, 113, 108, 0.5)',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(201, 169, 98, 0.3)')}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(120, 113, 108, 0.5)')}
      >
        <Link to={`${createPageUrl('ProductDetail')}/${product.id}`} className="block h-full">
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <motion.div
              className="absolute inset-0"
              animate={{ scale: isHovered ? 1.05 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <img
                src={product.images?.[0]}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${isHovered && hasSecondImage ? 'opacity-0' : 'opacity-100'} ${product.sold_out ? 'blur-sm' : ''}`}
              />
              <img
                src={product.images?.[1] || product.images?.[0]}
                alt={product.name}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-150 ${isHovered && hasSecondImage ? 'opacity-100' : 'opacity-0'} ${product.sold_out ? 'blur-sm' : ''}`}
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            {/* SOLD OUT Badge */}
            {product.sold_out && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40">
                <div className="px-6 py-2 border-2 border-white/80 rounded-full">
                  <span className="text-white text-sm font-semibold tracking-[0.25em]">
                    SOLD OUT
                  </span>
                </div>
              </div>
            )}
            {/* COMING SOON Badge */}
            {product.coming_soon && (
              <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }}>
                <Clock className="w-3 h-3 text-black" />
                <span className="text-xs font-medium text-black tracking-wide">COMING SOON</span>
              </div>
            )}
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <p className="text-xs tracking-widest mb-1" style={{ color: 'rgba(201, 169, 98, 0.7)' }}>{product.brand}</p>
            <h3 className="text-white text-lg font-light mb-3 min-h-[3.5rem] line-clamp-2">{product.name}</h3>

            <div className="min-h-8 mt-auto flex items-baseline gap-2">
              {minPrice && (
                <>
                  <span className="text-white text-xl font-light">
                    {regionData.currency}{minPrice}
                  </span>
                  {maxPrice !== minPrice && (
                    <span className="text-stone-500 text-sm">
                      - {regionData.currency}{maxPrice}
                    </span>
                  )}
                </>
              )}
            </div>
          </div>
        </Link>

        <button
          onClick={(e) => {
            e.preventDefault();
            handleToggleFavorite();
          }}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-full backdrop-blur-sm transition-all duration-300"
          style={{
            backgroundColor: isFavorited ? 'var(--color-gold)' : 'rgba(0, 0, 0, 0.4)',
            color: isFavorited ? 'black' : 'white',
          }}
          onMouseEnter={(e) => {
            if (!isFavorited) {
              e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.2)';
              e.currentTarget.style.color = 'var(--color-gold)';
            }
          }}
          onMouseLeave={(e) => {
            if (!isFavorited) {
              e.currentTarget.style.backgroundColor = 'rgba(0, 0, 0, 0.4)';
              e.currentTarget.style.color = 'white';
            }
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </button>

      </div>
    </motion.div>
  );
}
