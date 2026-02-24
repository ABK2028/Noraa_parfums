import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { useRegion } from '../components/RegionContext';
import { Send, Sparkles } from 'lucide-react';
import api from '../api';

export default function PerfumeFinder() {
  const { region } = useRegion();
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Welcome to Noraa Parfums Fragrance Finder! Tell me about your fragrance preferences, and I\'ll help you find the perfect scent. What are you looking for?',
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const quickQuestions = [
    'Fresh & Citrus fragrances',
    'Floral & Romance',
    'Warm & Woody scents',
    'Oriental & Spicy',
    'Suggest a bestseller',
    'Tell me about ingredients',
  ];

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const sendMessage = async (text) => {
    const userMessage = text?.trim();
    if (!userMessage || isLoading) return;

    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await api.post('/api/chatbot', {
        message: userMessage,
        conversationHistory: messages,
        region: region,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: response.data?.response ?? 'I\'d love to help you find the perfect fragrance. Could you tell me more about your preferences?',
        },
      ]);
    } catch (error) {
      console.error('Perfume Finder error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content:
            'I\'m having trouble connecting right now. Please visit our Products page to explore our collection or contact us at noraaparfums@gmail.com.',
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

  const handleQuickQuestion = (q) => {
    sendMessage(q);
  };

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
            transition={{ duration: 0.5, ease: 'easeOut' }}
          >
            <Sparkles className="w-10 h-10 mx-auto mb-6" style={{ color: 'var(--color-gold)' }} />
            <h1 className="text-4xl md:text-5xl font-extralight text-white tracking-wide mb-4">
              Fragrance Finder
            </h1>
            <p className="text-stone-400 max-w-2xl mx-auto">
              Discover your signature scent with our AI-powered fragrance advisor. Answer a few questions and we'll recommend the perfect fragrance just for you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chat Section */}
      <section className="py-12 px-4 pb-24">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: 'rgba(10, 10, 10, 0.6)', border: '1px solid rgba(201, 169, 98, 0.2)' }}
          >
            {/* Messages Container */}
            <div className="h-[500px] overflow-y-auto p-6 space-y-4">
              {messages.map((msg, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
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

              {isLoading && (
                <div className="flex justify-start">
                  <div
                    className="px-4 py-3 rounded-lg rounded-bl-none"
                    style={{ backgroundColor: 'rgba(201, 169, 98, 0.1)' }}
                  >
                    <div className="flex gap-2">
                      <span
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{ backgroundColor: 'var(--color-gold)' }}
                      />
                      <span
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: 'var(--color-gold)',
                          animationDelay: '0.1s',
                        }}
                      />
                      <span
                        className="w-2 h-2 rounded-full animate-bounce"
                        style={{
                          backgroundColor: 'var(--color-gold)',
                          animationDelay: '0.2s',
                        }}
                      />
                    </div>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            {messages.length <= 2 && (
              <div
                className="border-t p-4"
                style={{ borderColor: 'rgba(201, 169, 98, 0.2)' }}
              >
                <p className="text-stone-400 text-xs tracking-widest mb-3">
                  TRY ASKING:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {quickQuestions.map((q) => (
                    <button
                      key={q}
                      type="button"
                      className="text-stone-300 text-sm px-3 py-2 rounded-lg text-left transition-all hover:text-white"
                      style={{
                        backgroundColor: 'rgba(201, 169, 98, 0.1)',
                        border: '1px solid rgba(201, 169, 98, 0.3)',
                      }}
                      onClick={() => handleQuickQuestion(q)}
                      disabled={isLoading}
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Form */}
            <form
              className="border-t p-4"
              style={{ borderColor: 'rgba(201, 169, 98, 0.2)' }}
              onSubmit={handleSubmit}
            >
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Describe what you're looking for..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  disabled={isLoading}
                  className="flex-1 bg-stone-950 border border-stone-700 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder:text-stone-600"
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="px-4 py-3 rounded-lg transition-colors flex items-center justify-center"
                  style={{
                    backgroundColor: 'var(--color-gold)',
                    color: '#000',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-gold-light)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = 'var(--color-gold)')
                  }
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>

          {/* CTA to Products */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center mt-8"
          >
            <p className="text-stone-400 mb-4">
              Or browse our complete collection
            </p>
            <Link
              to={createPageUrl('Products')}
              className="inline-flex items-center gap-2 px-6 py-3 text-black font-medium tracking-widest text-sm transition-colors rounded-lg"
              style={{ backgroundColor: 'var(--color-gold)' }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-gold-light)')
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = 'var(--color-gold)')
              }
            >
              EXPLORE COLLECTION
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
