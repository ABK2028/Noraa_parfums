import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { getAllReviews } from './reviewUtils';

function StarRating({ count }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: 'var(--color-gold)', fontSize: '14px' }}>
          ★
        </span>
      ))}
    </div>
  );
}

function ReviewCard({ review }) {
  return (
    <div
      className="flex-shrink-0 w-80 mx-4 p-8 border"
      style={{
        backgroundColor: 'var(--color-dark-lighter)',
        borderColor: 'rgba(201,169,98,0.2)',
      }}
    >
      <StarRating count={review.rating} />
      <p className="text-stone-300 text-sm leading-relaxed mt-4 mb-6 font-light italic">"{review.text}"</p>
      <div className="flex items-center gap-3 pt-4 border-t" style={{ borderColor: 'rgba(201,169,98,0.15)' }}>
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium tracking-wider"
          style={{
            backgroundColor: 'rgba(201,169,98,0.12)',
            color: 'var(--color-gold)',
            border: '1px solid rgba(201,169,98,0.3)',
          }}
        >
          {review.initials}
        </div>
        <div>
          <p className="text-white text-sm font-medium">{review.name}</p>
          <p className="text-stone-500 text-xs tracking-wide">{review.location}</p>
        </div>
      </div>
    </div>
  );
}

export default function Ring3DCarousel() {
  const trackRef = useRef(null);
  const [offset, setOffset] = useState(0);
  const [reviews, setReviews] = useState(() => getAllReviews());
  const speed = 0.5;

  // Duplicate reviews for smooth infinite looping.
  const doubled = [...reviews, ...reviews];

  useEffect(() => {
    const refreshReviews = () => {
      setReviews(getAllReviews());
    };

    window.addEventListener('storage', refreshReviews);
    window.addEventListener('reviews-updated', refreshReviews);

    return () => {
      window.removeEventListener('storage', refreshReviews);
      window.removeEventListener('reviews-updated', refreshReviews);
    };
  }, []);

  useEffect(() => {
    let raf;
    let current = 0;

    const step = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      const totalWidth = track.scrollWidth / 2;
      current += speed;
      if (current >= totalWidth) {
        current = 0;
      }

      setOffset(current);
      raf = requestAnimationFrame(step);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="py-24 overflow-hidden" style={{ backgroundColor: 'var(--color-dark)' }}>
      <div className="max-w-7xl mx-auto px-4 mb-14 text-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <p className="tracking-[0.3em] text-sm mb-4" style={{ color: 'var(--color-gold)' }}>
            WHAT OUR CUSTOMERS SAY
          </p>
          <h2 className="text-4xl md:text-5xl font-extralight text-white tracking-wide">Voices of Noraa</h2>
        </motion.div>
      </div>

      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-dark), transparent)' }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-dark), transparent)' }}
        />

        <div ref={trackRef} className="flex" style={{ transform: `translateX(-${offset}px)`, willChange: 'transform' }}>
          {doubled.map((review, i) => (
            <ReviewCard key={i} review={review} />
          ))}
        </div>
      </div>
    </section>
  );
}
