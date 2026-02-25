import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { useRegion } from '../components/RegionContext';
import { Send, Sparkles } from 'lucide-react';
import api from '../api';
import { getProducts } from '../lib/perfumeStore';

const buildFallbackReply = (message, region) => {
  const text = (message || '').toLowerCase();
  const products = getProducts(region);

  if (text.includes('fresh') || text.includes('citrus')) {
    const options = products.filter((product) =>
      product.notes?.top?.some((note) => ['lemon', 'bergamot', 'mint', 'citrus'].includes(note.toLowerCase()))
    );
    if (options.length > 0) {
      return `Try ${options[0].name} by ${options[0].brand} for a fresh and bright profile. If you want, I can suggest a stronger or softer alternative too.`;
    }
  }

  if (text.includes('floral') || text.includes('romance')) {
    const options = products.filter((product) =>
      product.notes?.heart?.some((note) => ['rose', 'jasmine', 'gardenia', 'peony'].includes(note.toLowerCase()))
    );
    if (options.length > 0) {
      return `${options[0].name} is a great floral choice with elegant heart notes. Tell me if you want it sweeter, powdery, or more intense.`;
    }
  }

  if (text.includes('woody') || text.includes('warm') || text.includes('spicy') || text.includes('oriental')) {
    const options = products.filter((product) =>
      product.notes?.base?.some((note) => ['amber', 'musk', 'sandalwood', 'cedar', 'patchouli'].includes(note.toLowerCase()))
    );
    if (options.length > 0) {
      return `For warm and rich depth, consider ${options[0].name}. It has a smooth base that works beautifully for evening wear.`;
    }
  }

  if (text.includes('best') || text.includes('bestseller') || text.includes('popular')) {
    if (products.length > 0) {
      return `A popular pick is ${products[0].name}. I can also recommend one for day wear, date nights, or office settings.`;
    }
  }

  return 'Great choice. Tell me your preferred scent style (fresh, floral, woody, or spicy), and when you plan to wear it, and I will recommend the best match.';
};

export default function PerfumeFinder() {
  const { region } = useRegion();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isBooting, setIsBooting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
      setMessages([
        {
          role: 'bot',
          content: 'Welcome to Noraa Parfums. Describe your scent preferences and I will help you find the perfect match.',
        },
      ]);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const userMessage = text?.trim();
    if (!userMessage || isLoading || isBooting) return;

    const historyWithUser = [...messages, { role: 'user', content: userMessage }];
    setMessages(historyWithUser);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/chatbot', {
        message: userMessage,
        conversationHistory: historyWithUser,
        region: region,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: response.data?.response ?? buildFallbackReply(userMessage, region),
        },
      ]);
    } catch (error) {
      console.error('Perfume Finder error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: buildFallbackReply(userMessage, region),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    sendMessage(input);
  };

  return (
    <div className="min-h-screen pt-20" style={{ backgroundColor: 'var(--color-dark)' }}>
      {/* Hero */}
      <section className="relative py-16 px-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-400/5 to-transparent" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Sparkles className="w-10 h-10 mx-auto mb-5" style={{ color: 'var(--color-gold)' }} />
            <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-wide mb-4">
              Find Your Perfect Scent
            </h1>
            <p className="text-stone-400 text-lg max-w-3xl mx-auto">
              Chat with our AI perfume consultant to discover fragrances that match your unique style
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-6 px-4 pb-20">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-3xl overflow-hidden"
            style={{ backgroundColor: 'rgba(8, 8, 8, 0.85)', border: '1px solid rgba(201, 169, 98, 0.18)' }}
          >
            {/* Messages Container */}
            <div className="h-[520px] overflow-y-auto p-8 space-y-4">
              {isBooting && (
                <div className="h-full flex flex-col items-center justify-center text-center">
                  <div
                    className="w-10 h-10 rounded-full border-4 border-transparent animate-spin mb-5"
                    style={{ borderTopColor: 'var(--color-gold)', borderRightColor: 'rgba(201, 169, 98, 0.35)' }}
                  />
                  <p className="text-stone-400 text-2xl">Starting your consultation...</p>
                </div>
              )}

              {!isBooting && messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-2xl px-4 py-3 rounded-xl ${
                      msg.role === 'user'
                        ? 'text-black rounded-br-none'
                        : 'text-white rounded-bl-none'
                    }`}
                    style={{
                      backgroundColor:
                        msg.role === 'user'
                          ? 'var(--color-gold)'
                          : 'rgba(201, 169, 98, 0.1)',
                      borderLeft:
                        msg.role === 'bot'
                          ? '3px solid var(--color-gold)'
                          : 'none',
                    }}
                  >
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {!isBooting && isLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-3 rounded-xl rounded-bl-none" style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}>
                    <div className="flex gap-2">
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--color-gold)' }} />
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--color-gold)', animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: 'var(--color-gold)', animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Form */}
            <form
              className="border-t p-4"
              style={{ borderColor: 'rgba(201, 169, 98, 0.2)' }}
              onSubmit={handleSubmit}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Describe your scent preferences..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading || isBooting}
                  className="flex-1 bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder:text-stone-600"
                />
                <button
                  type="submit"
                  disabled={isLoading || isBooting || !input.trim()}
                  className="w-16 py-3 rounded-lg transition-colors flex items-center justify-center"
                  style={{
                    backgroundColor: 'rgba(201, 169, 98, 0.75)',
                    color: '#000',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-gold)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'rgba(201, 169, 98, 0.75)')
                  }
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>

          <div className="text-center mt-6">
            <Link
              to={createPageUrl('Products')}
              className="text-stone-500 text-sm hover:text-stone-300 transition-colors"
            >
              Browse all fragrances
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
