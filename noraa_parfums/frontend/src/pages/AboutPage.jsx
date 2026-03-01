import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function About() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Hero Section - Our Story */}
      <section className="py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="tracking-[0.3em] text-xs mb-6" style={{ color: 'var(--color-gold)' }}>OUR STORY</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4">
              The Essence of{' '}
              <span className="italic" style={{ color: 'var(--color-gold)' }}>Noraa Parfums</span>
            </h1>
            <p className="text-stone-400 text-lg max-w-2xl mx-auto">
              Where artistry meets alchemy, and every drop tells a story of passion, heritage, and the pursuit of olfactory perfection.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Legacy Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <img
                src="/images/Dior%20Sauvage%20Elixir%20(2).jpeg"
                alt="Dior Sauvage Elixir bottle"
                className="rounded-2xl w-full"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
                A Legacy of{' '}
                <span className="italic" style={{ color: 'var(--color-gold)' }}>Excellence</span>
              </h2>
              <p className="text-stone-400 mb-6">
                Born from a deep reverence for the ancient art of perfumery, Noraa Parfums represents the pinnacle of olfactory craftsmanship. Each fragrance is a masterpiece, meticulously composed to evoke emotion and create lasting memories.
              </p>
              <p className="text-stone-400 mb-6">
                Our journey began with a simple belief: that fragrance is the most intimate form of self-expression. It has the power to transport, to transform, and to tell the stories that words cannot.
              </p>
              <p className="text-stone-400">
                We source only the finest ingredients from around the world—rare florals from Grasse, precious ouds from the Middle East, and exotic spices from distant lands. Each element is carefully selected to create harmonious compositions that resonate with the soul.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="order-1"
            >
              <p className="tracking-[0.3em] text-xs mb-4" style={{ color: 'var(--color-gold)' }}>OUR PHILOSOPHY</p>
              <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                The Art of{' '}
                <span className="italic" style={{ color: 'var(--color-gold)' }}>Timeless Elegance</span>
              </h2>
              <p className="text-stone-400 mb-6">
                At Noraa Parfums, we believe that fragrance is the most intimate form of self-expression. Each bottle contains not just a scent, but a story waiting to be told.
              </p>
              <p className="text-stone-400 mb-8">
                Our master perfumers blend rare ingredients from around the world, creating compositions that transcend time and trend. Every creation is a testament to craftsmanship, passion, and the pursuit of perfection.
              </p>
              <Link 
                to={createPageUrl('Products')}
                className="inline-flex items-center gap-2 text-sm tracking-widest transition-colors"
                style={{ color: 'var(--color-gold)' }}
                onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-gold)'}
              >
                Discover Our Heritage
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="order-2"
            >
              <img
                src="/images/Bleu%20de%20Chanel%20(1).jpeg"
                alt="Perfume bottle"
                className="rounded-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What Defines Us */}
      <section className="py-24 px-4" style={{ backgroundColor: 'rgba(10, 10, 10, 0.5)' }}>
        <div className="max-w-7xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-3xl md:text-4xl font-light text-white text-center mb-20"
          >
            What Defines Us
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-16">
            {[
              {
                title: 'Craftsmanship',
                description: 'Every fragrance is handcrafted with meticulous attention to detail, honoring centuries-old traditions of perfumery.'
              },
              {
                title: 'Authenticity',
                description: 'We use only the highest quality natural ingredients, refusing to compromise on the integrity of our creations.'
              },
              {
                title: 'Timelessness',
                description: 'Our fragrances are designed to transcend trends, becoming cherished companions for a lifetime of moments.'
              }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                className="text-center"
              >
                <h3 className="text-xl font-light text-white mb-4">
                  <span className="italic" style={{ color: 'var(--color-gold)' }}>{item.title}</span>
                </h3>
                <p className="text-stone-400 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Begin Your Journey CTA */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-white mb-6">
              Begin Your Journey
            </h2>
            <p className="text-stone-400 mb-10 max-w-2xl mx-auto">
              Discover the fragrance that speaks to your soul. Explore our collections and find your signature scent.
            </p>
            <Link to={createPageUrl('Products')}>
              <Button
                className="px-10 py-6 text-sm tracking-widest text-black"
                style={{ backgroundColor: 'var(--color-gold)' }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
              >
                Explore Collections
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stay Connected */}
      <section className="py-24 px-4 border-t border-stone-800">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="tracking-[0.3em] text-xs mb-4" style={{ color: 'var(--color-gold)' }}>STAY CONNECTED</p>
            <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
              Join the Noraa Family
            </h2>
            <p className="text-stone-400 mb-10">
              Be the first to discover new collections, exclusive offers, and the stories behind our fragrances.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md mx-auto">
              <div className="flex gap-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-stone-900 border-stone-700 text-white placeholder:text-stone-600 focus:border-amber-400"
                />
                <Button
                  type="submit"
                  className="px-8 text-black tracking-widest text-sm"
                  style={{ backgroundColor: 'var(--color-gold)' }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold-light)'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'var(--color-gold)'}
                >
                  Subscribe
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
              {subscribed && (
                <p className="text-sm mt-4" style={{ color: 'var(--color-gold)' }}>
                  Thank you for joining our family!
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
