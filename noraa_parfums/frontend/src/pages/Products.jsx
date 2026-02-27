import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { useRegion } from '../components/RegionContext';
import ProductCard from '../components/ProductCard';
import LoadingBottle from '../components/LoadingBottle';
import { getProducts } from '../lib/perfumeStore';

export default function Products() {
  const { region } = useRegion();
  const [activeCategory, setActiveCategory] = useState('all');

  const { data: products = [], isLoading } = useQuery({
    queryKey: ['products', region],
    queryFn: () => Promise.resolve(getProducts(region)),
  });

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'male', name: 'For Him' },
    { id: 'female', name: 'For Her' },
    { id: 'travel', name: 'Travel Bottles' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? products
    : products.filter((product) => product.category === activeCategory);

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Hero */}
      <section className="relative py-24 px-4">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=1920"
            alt="Perfume collection"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <p className="tracking-[0.3em] text-sm mb-4" style={{ color: 'var(--color-gold)' }}>OUR COLLECTION</p>
            <h1 className="text-4xl md:text-6xl font-extralight text-white tracking-wide">
              Fragrances
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="sticky top-20 z-40 backdrop-blur-md border-y border-stone-800" style={{ backgroundColor: 'rgba(10, 10, 10, 0.95)' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-center gap-2 py-4 overflow-x-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className="px-6 py-2 text-sm tracking-widest transition-all rounded-full whitespace-nowrap"
                style={{
                  backgroundColor: activeCategory === cat.id ? 'var(--color-gold)' : 'transparent',
                  color: activeCategory === cat.id ? 'black' : '#a8a29e',
                }}
                onMouseEnter={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.backgroundColor = '#1c1917';
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeCategory !== cat.id) {
                    e.currentTarget.style.color = '#a8a29e';
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                {cat.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <LoadingBottle size="lg" />
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500 text-lg">No products found in this category.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
