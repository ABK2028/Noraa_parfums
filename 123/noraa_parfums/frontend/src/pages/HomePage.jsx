import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles, Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { useRegion } from '../components/RegionContext';
import ProductCard from '../components/ProductCard';
import { getProducts } from '../lib/perfumeStore';

export default function Home() {
  const { region } = useRegion();

  const { data: products = [] } = useQuery({
    queryKey: ['products', region],
    queryFn: () => Promise.resolve(getProducts(region)),
  });

  const featuredProducts = products.filter(p => !p.coming_soon).slice(0, 3);

  return (
    <div style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=1920"
            alt="Luxury perfume"
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <Sparkles className="w-8 h-8 mx-auto mb-6" style={{ color: 'var(--color-gold)' }} />
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-[0.2em] text-white mb-4">
              NORAA
            </h1>
            <p className="tracking-[0.5em] text-sm md:text-base mb-8" style={{ color: 'var(--color-gold)' }}>
              PARFUMS
            </p>
            <p className="text-stone-300 text-lg md:text-xl font-light max-w-2xl mx-auto mb-12 leading-relaxed">
              Discover the essence of luxury. Premium fragrances crafted for those who 
              appreciate the finer things in life.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={createPageUrl('Products')}
                className="inline-flex items-center gap-3 px-8 py-4 text-black font-medium tracking-widest text-sm transition-colors"
                style={{ backgroundColor: 'var(--color-gold)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
              >
                EXPLORE COLLECTION
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to={createPageUrl('PerfumeFinder')}
                className="inline-flex items-center gap-3 px-8 py-4 border text-white font-medium tracking-widest text-sm transition-colors"
                style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--color-gold)';
                  e.currentTarget.style.color = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
                  e.currentTarget.style.color = 'white';
                }}
              >
                <Search className="w-4 h-4" />
                FIND YOUR SCENT
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border border-stone-500 rounded-full flex justify-center">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="w-1.5 h-1.5 rounded-full mt-2"
              style={{ backgroundColor: 'var(--color-gold)' }}
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="text-center mb-16"
          >
            <p className="tracking-[0.3em] text-sm mb-4" style={{ color: 'var(--color-gold)' }}>CURATED SELECTION</p>
            <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">
              Featured Fragrances
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to={createPageUrl('Products')}
              className="inline-flex items-center gap-2 tracking-widest text-sm transition-colors"
              style={{ color: 'var(--color-gold)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
            >
              VIEW ALL PRODUCTS
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Promise */}
      <section className="py-24 px-4" style={{ backgroundColor: 'var(--color-dark-lighter)' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { title: 'AUTHENTIC', desc: 'Premium quality fragrances from renowned houses' },
              { title: 'ACCESSIBLE', desc: 'Luxury scents at competitive prices' },
              { title: 'CURATED', desc: 'Hand-selected collection for discerning tastes' },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
                className="p-8"
              >
                <div className="w-16 h-px mx-auto mb-6" style={{ backgroundColor: 'var(--color-gold)' }} />
                <h3 className="text-white tracking-[0.3em] text-lg mb-4">{item.title}</h3>
                <p className="text-stone-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-4">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=1920"
            alt="Perfume collection"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 to-black" />
        </div>
        
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-extralight text-white tracking-wide mb-6">
              Not sure which fragrance suits you?
            </h2>
            <p className="text-stone-400 mb-8">
              Let our AI perfume consultant help you discover your perfect scent
            </p>
            <Link
              to={createPageUrl('PerfumeFinder')}
              className="inline-flex items-center gap-3 px-8 py-4 text-black font-medium tracking-widest text-sm transition-colors"
              style={{ backgroundColor: 'var(--color-gold)' }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
            >
              <Search className="w-4 h-4" />
              FIND YOUR PERFECT MATCH
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
