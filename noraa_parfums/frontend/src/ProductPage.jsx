import React, { useState } from 'react';
import { useSearchParams, useParams, Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { motion } from 'framer-motion';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRegion } from './components/RegionContext';
import { Heart, ArrowLeft, Clock, Droplets, Wind, TreePine, Search } from 'lucide-react';
import LoadingBottle from './components/LoadingBottle';
import { addFavorite, getFavorites, getProductById, removeFavorite } from './lib/perfumeStore';

export default function ProductDetail() {
  const [searchParams] = useSearchParams();
  const { id: routeId } = useParams();
  const productId = routeId ?? searchParams.get('id');
  const { regionData } = useRegion();
  const queryClient = useQueryClient();
  const [selectedSize, setSelectedSize] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => Promise.resolve(getProductById(productId)),
    enabled: !!productId,
  });

  const { data: favorites = [] } = useQuery({
    queryKey: ['favorites'],
    queryFn: () => Promise.resolve(getFavorites()),
  });

  const isFavorited = favorites.some(f => f.product_id === product?.id);

  const toggleFavorite = useMutation({
    mutationFn: async () => {
      if (isFavorited) {
        removeFavorite(product.id);
      } else {
        addFavorite(product.id);
      }
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['favorites'] }),
  });

  React.useEffect(() => {
    if (product?.sizes?.length > 0 && !selectedSize) {
      setSelectedSize(product.sizes[0]);
    }
  }, [product, selectedSize]);

  React.useEffect(() => {
    if (product?.images?.length > 1) {
      const interval = setInterval(() => {
        setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [product?.images]);

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--color-dark)' }}>
        <LoadingBottle size="lg" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center" style={{ backgroundColor: 'var(--color-dark)' }}>
        <div className="text-center">
          <p className="text-stone-400 mb-4">Product not found</p>
          <Link to={createPageUrl('Products')} style={{ color: 'var(--color-gold)' }}>
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const noteIcons = {
    top: <Wind className="w-5 h-5" />,
    heart: <Droplets className="w-5 h-5" />,
    base: <TreePine className="w-5 h-5" />,
  };

  const noteLabels = {
    top: 'Top Notes',
    heart: 'Heart Notes',
    base: 'Base Notes',
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link
          to={createPageUrl('Products')}
          className="inline-flex items-center gap-2 text-stone-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm tracking-widest">BACK TO COLLECTION</span>
        </Link>
      </div>

      {/* Product Content */}
      <div className="max-w-7xl mx-auto px-4 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="relative"
          >
            <div className="aspect-square rounded-3xl overflow-hidden border border-stone-800" 
              style={{ backgroundImage: 'linear-gradient(to bottom, var(--color-dark-lighter), var(--color-dark))' }}
            >
              <motion.img
                key={currentImageIndex}
                src={product.images?.[currentImageIndex] || product.images?.[0]}
                alt={product.name}
                className="w-full h-full object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
              />
              {product.coming_soon && (
                <div className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--color-gold)' }}>
                  <Clock className="w-4 h-4 text-black" />
                  <span className="text-sm font-medium text-black tracking-wide">COMING SOON</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col"
          >
            <p className="tracking-[0.3em] text-sm mb-2" style={{ color: 'var(--color-gold)' }}>{product.brand}</p>
            <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-wide mb-6">
              {product.name}
            </h1>
            <p className="text-stone-400 leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Fragrance Notes */}
            {product.notes && Object.keys(product.notes).length > 0 && (
              <div className="mb-10">
                <h3 className="text-white tracking-widest text-sm mb-6">FRAGRANCE NOTES</h3>
                <div className="space-y-4">
                  {['top', 'heart', 'base'].map((noteType) => (
                    product.notes[noteType]?.length > 0 && (
                      <div key={noteType} className="flex items-start gap-4 p-4 rounded-xl border border-stone-800" style={{ backgroundColor: 'rgba(20, 20, 20, 0.5)' }}>
                        <div style={{ color: 'var(--color-gold)' }}>{noteIcons[noteType]}</div>
                        <div>
                          <p className="text-stone-500 text-xs tracking-widest mb-1">{noteLabels[noteType]}</p>
                          <p className="text-white text-sm">{product.notes[noteType].join(', ')}</p>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            )}

            {/* Size Selection */}
            {!product.coming_soon && product.sizes?.length > 0 && (
              <div className="mb-8">
                <h3 className="text-white tracking-widest text-sm mb-4">SELECT SIZE</h3>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.ml}
                      onClick={() => setSelectedSize(size)}
                      className="px-6 py-4 rounded-xl border-2 transition-all"
                      style={{
                        borderColor: selectedSize?.ml === size.ml ? 'var(--color-gold)' : '#44403c',
                        backgroundColor: selectedSize?.ml === size.ml ? 'rgba(201, 169, 98, 0.1)' : 'transparent',
                        color: selectedSize?.ml === size.ml ? 'white' : '#a8a29e'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedSize?.ml !== size.ml) e.currentTarget.style.borderColor = '#57534e';
                      }}
                      onMouseLeave={(e) => {
                        if (selectedSize?.ml !== size.ml) e.currentTarget.style.borderColor = '#44403c';
                      }}
                    >
                      <span className="block text-lg font-light">{size.ml}ml</span>
                      <span className="block text-sm mt-1" style={{ color: 'var(--color-gold)' }}>
                        {regionData.currency}{size.price}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="text-stone-500 text-xs mt-3 tracking-wide">
                  Prices are exclusive of shipping and delivery.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-auto pt-8">
              <Link
                to={createPageUrl('Contact')}
                className="flex-1 flex items-center justify-center gap-3 px-8 py-4 rounded-full transition-all text-black"
                style={{ backgroundColor: 'var(--color-gold)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
              >
                <span className="tracking-widest text-sm font-medium">CONTACT FOR PURCHASE</span>
              </Link>
            </div>

            <div className="flex flex-wrap gap-4 mt-4">
              <button
                onClick={() => toggleFavorite.mutate()}
                className="flex items-center gap-3 px-8 py-4 rounded-full border-2 transition-all"
                style={{
                  borderColor: isFavorited ? 'var(--color-gold)' : '#57534e',
                  backgroundColor: isFavorited ? 'var(--color-gold)' : 'transparent',
                  color: isFavorited ? 'black' : 'white'
                }}
                onMouseEnter={(e) => {
                  if (!isFavorited) e.currentTarget.style.borderColor = 'var(--color-gold)';
                }}
                onMouseLeave={(e) => {
                  if (!isFavorited) e.currentTarget.style.borderColor = '#57534e';
                }}
              >
                <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                <span className="tracking-widest text-sm">
                  {isFavorited ? 'SAVED' : 'ADD TO FAVORITES'}
                </span>
              </button>

              <Link
                to={createPageUrl('PerfumeFinder')}
                className="flex items-center gap-3 px-8 py-4 rounded-full bg-stone-800 text-white hover:bg-stone-700 transition-all"
              >
                <Search className="w-5 h-5" />
                <span className="tracking-widest text-sm">FIND SIMILAR</span>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
