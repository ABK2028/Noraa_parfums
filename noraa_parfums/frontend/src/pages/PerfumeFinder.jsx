import React, { useState, useEffect, useRef, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { motion } from 'framer-motion';
import { useRegion } from '../components/RegionContext';
import { Send, Sparkles } from 'lucide-react';
import api from '../api';
import { getPerfumeFinderProducts } from '../data/perfumeFinderCatalog';

const NOTE_GROUPS = {
  citrus: ['bergamot', 'lemon', 'orange', 'mandarin', 'grapefruit', 'lime', 'clementine', 'citrus'],
  fruity: ['apple', 'pear', 'peach', 'cherry', 'plum', 'lychee', 'pineapple', 'berries', 'fruit'],
  floral: ['rose', 'jasmine', 'gardenia', 'peony', 'orange blossom', 'neroli', 'lavender', 'tuberose'],
  woody: ['cedar', 'sandalwood', 'guaiac', 'vetiver', 'patchouli', 'wood'],
  warm: ['vanilla', 'amber', 'tonka', 'benzoin', 'musk', 'incense', 'resin'],
  spicy: ['pepper', 'cardamom', 'cinnamon', 'nutmeg', 'saffron', 'ginger', 'spice'],
  fresh: ['mint', 'marine', 'aquatic', 'clean', 'fresh'],
};

const NOTE_GROUP_ALIASES = {
  woody: 'woody',
  wood: 'woody',
  floral: 'floral',
  flower: 'floral',
  fruity: 'fruity',
  fruit: 'fruity',
  citrus: 'citrus',
  fresh: 'fresh',
  spicy: 'spicy',
  spice: 'spicy',
  warm: 'warm',
  sweet: 'warm',
  amber: 'warm',
  musky: 'warm',
  musk: 'warm',
};

const normalize = (value = '') =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getAllNotes = (product) => {
  const top = product.notes?.top || [];
  const heart = product.notes?.heart || [];
  const base = product.notes?.base || [];
  return [...top, ...heart, ...base];
};

const deriveAccords = (product) => {
  const notes = getAllNotes(product).map((note) => normalize(note));
  const accords = Object.entries(NOTE_GROUPS)
    .filter(([, terms]) => notes.some((note) => terms.some((term) => note.includes(term))))
    .map(([accord]) => accord.charAt(0).toUpperCase() + accord.slice(1));

  return accords.slice(0, 4);
};

const parseInputIntent = (text = '') => {
  const normalizedText = normalize(text);
  const ignored = new Set(['top', 'heart', 'middle', 'base']);
  const rawParts = String(text)
    .split(',')
    .map((part) => part.trim())
    .filter(Boolean);

  const tokens = rawParts.length > 0 ? rawParts : [text];
  const fallbackNotes = tokens
    .flatMap((part) => normalize(part).split(' '))
    .map((token) => token.trim())
    .filter((token) => token && !ignored.has(token));

  return {
    raw: text,
    normalizedText,
    topPreference: '',
    heartPreference: '',
    basePreference: '',
    terms: fallbackNotes,
  };
};

const formatPreferenceLabel = (value = '') =>
  value
    .split(' ')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

const scoreProduct = (product, intent) => {
  const name = normalize(product.name);
  const brand = normalize(product.brand);
  const top = (product.notes?.top || []).map((note) => normalize(note));
  const heart = (product.notes?.heart || []).map((note) => normalize(note));
  const base = (product.notes?.base || []).map((note) => normalize(note));
  const all = [...top, ...heart, ...base];

  let score = 0;

  const isGroupedTermMatch = (term) => {
    const groupKey = NOTE_GROUP_ALIASES[term];
    if (!groupKey) return false;
    const terms = NOTE_GROUPS[groupKey] || [];
    return all.some((note) => terms.some((groupTerm) => note.includes(groupTerm)));
  };

  if (intent.normalizedText && (name.includes(intent.normalizedText) || brand.includes(intent.normalizedText))) {
    score += 20;
  }

  intent.terms.forEach((term) => {
    if (!term) return;
    if (name.includes(term) || brand.includes(term)) score += 8;
    if (all.some((note) => note.includes(term))) score += 5;
    if (isGroupedTermMatch(term)) score += 9;
  });

  if (intent.topPreference && top.some((note) => note.includes(intent.topPreference))) score += 12;
  if (intent.heartPreference && heart.some((note) => note.includes(intent.heartPreference))) score += 8;
  if (intent.basePreference && base.some((note) => note.includes(intent.basePreference))) score += 5;

  return score;
};

const getNoteMatches = (product) => {
  const top = (product.notes?.top || []).map((note) => normalize(note));
  const heart = (product.notes?.heart || []).map((note) => normalize(note));
  const base = (product.notes?.base || []).map((note) => normalize(note));
  return [...top, ...heart, ...base];
};

const matchesTerm = (product, term) => {
  if (!term) return false;
  const allNotes = getNoteMatches(product);
  if (allNotes.some((note) => note.includes(term))) return true;

  const groupKey = NOTE_GROUP_ALIASES[term];
  if (!groupKey) return false;
  const groupTerms = NOTE_GROUPS[groupKey] || [];
  return allNotes.some((note) => groupTerms.some((groupTerm) => note.includes(groupTerm)));
};

const getTopMatches = (products, intent, limit = 3) =>
  products
    .map((product) => ({ product, score: scoreProduct(product, intent) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

const getLocalMatches = (inputText, region, limit = 3) => {
  const products = getPerfumeFinderProducts(region);
  const intent = parseInputIntent(inputText);
  return getTopMatches(products, intent, limit);
};

const getMatchesInCatalogOrder = (inputText, region) => {
  const products = getPerfumeFinderProducts(region);
  const intent = parseInputIntent(inputText);
  const requiredTerms = intent.terms.filter(Boolean);

  if (requiredTerms.length === 0) {
    return products;
  }

  return products.filter((product) => requiredTerms.every((term) => matchesTerm(product, term)));
};

const buildLocalMatchReply = (inputText, region) => {
  const matches = getLocalMatches(inputText, region, 3);

  if (matches.length === 0) {
    return null;
  }

  const [best] = matches;
  const topText = best.product.notes?.top?.join(', ') || '—';
  const heartText = best.product.notes?.heart?.join(', ') || '—';
  const baseText = best.product.notes?.base?.join(', ') || '—';
  const accordsText = deriveAccords(best.product).join(' • ') || 'Balanced';

  const rankedText = matches
    .map((entry, index) => `${index + 1}) ${entry.product.name}`)
    .join(' | ');

  return `Best match: ${best.product.name} by ${best.product.brand}. Top: ${topText}. Heart: ${heartText}. Base: ${baseText}. Accords: ${accordsText}. Top 3 matches: ${rankedText}.`;
};

const buildFallbackReply = (message, region) => {
  const text = (message || '').toLowerCase();
  const products = getPerfumeFinderProducts(region);

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
  const [suggestions, setSuggestions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [isBooting, setIsBooting] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const typedIntent = useMemo(() => parseInputIntent(input), [input]);

  const preferenceBubbles = useMemo(() => {
    const top = typedIntent.topPreference || '';
    const heart = typedIntent.heartPreference || '';
    const base = typedIntent.basePreference || '';

    if (!top && !heart && !base) return [];

    return [
      { key: 'top', label: 'Top', value: top },
      { key: 'heart', label: 'Heart', value: heart },
      { key: 'base', label: 'Base', value: base },
    ];
  }, [typedIntent]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsBooting(false);
      setMessages([
        {
          role: 'bot',
          content: "Welcome to Noraa Parfums! I'm your personal fragrance consultant, Noraa. I'll help you discover your perfect scent. Tell me, what kind of fragrances do you typically enjoy? Are you drawn to fresh and citrusy notes, or do you prefer something deeper and more mysterious like oud and leather?",
        },
      ]);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  // Removed auto-scroll on new messages as requested

  useEffect(() => {
    const query = input.trim();

    // Remove default product name suggestions
    if (!query || isBooting) {
      setSuggestions([]);
    } else {
      const orderedMatches = getMatchesInCatalogOrder(query, region).slice(0, 8);
      setSuggestions(orderedMatches);
    }
  }, [input, region, isBooting]);

  useEffect(() => {
    if (isBooting) return;

    const query = input.trim();
    const orderedMatches = query
      ? getMatchesInCatalogOrder(query, region)
      : [];
    // Only set recommendations if there is a query
    setRecommendations(query ? orderedMatches : []);
  }, [input, region, isBooting]);

  const sendMessage = async (text) => {
    const finalMessage = text?.trim();

    if (!finalMessage || isLoading || isBooting) return;

    const historyWithUser = [...messages, { role: 'user', content: finalMessage }];
    setMessages(historyWithUser);
    setInput('');
    setSuggestions([]);
    setIsLoading(true);

    const localReply = buildLocalMatchReply(finalMessage, region);
    if (localReply) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: localReply,
        },
      ]);
      setIsLoading(false);
      return;
    }

    try {
      const response = await api.post('/api/chatbot', {
        message: finalMessage,
        conversationHistory: historyWithUser,
        region: region,
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: response.data?.response ?? buildFallbackReply(finalMessage, region),
        },
      ]);
    } catch (error) {
      console.error('Perfume Finder error:', error);
      setMessages((prev) => [
        ...prev,
        {
          role: 'bot',
          content: buildFallbackReply(finalMessage, region),
        },
      ]);
      setRecommendations([]);
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
              {preferenceBubbles.length > 0 && (
                <div className="mb-3 flex flex-wrap gap-2">
                  {preferenceBubbles.map((bubble) => (
                    <div
                      key={bubble.key}
                      className="px-3 py-1 rounded-full text-xs"
                      style={{
                        backgroundColor: 'rgba(201, 169, 98, 0.14)',
                        border: '1px solid rgba(201, 169, 98, 0.26)',
                        color: 'var(--color-gold)',
                      }}
                    >
                      {bubble.label}: {formatPreferenceLabel(bubble.value) || '—'}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type perfume name or extra notes..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={isLoading || isBooting}
                    className="w-full bg-stone-950 border border-stone-800 text-white px-4 py-3 rounded-lg focus:outline-none focus:border-amber-400 placeholder:text-stone-600"
                  />
                </div>
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

            {input.trim() && recommendations.length > 0 && (
              <div className="border-t px-4 py-4" style={{ borderColor: 'rgba(201, 169, 98, 0.2)' }}>
                <h3 className="text-white text-sm font-medium mb-3">Perfume Recommendations</h3>
                <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: '260px' }}>
                  {recommendations.map((product, index) => (
                    <div
                      key={product.id}
                      className="rounded-lg px-3 py-3"
                      style={{
                        backgroundColor: 'rgba(201, 169, 98, 0.08)',
                        border: '1px solid rgba(201, 169, 98, 0.18)',
                      }}
                    >
                      <p className="text-white text-sm font-medium">{index + 1}. {product.name}</p>
                      <p className="text-stone-400 text-xs mt-1">
                        Top: {(product.notes?.top || []).join(', ')} • Heart: {(product.notes?.heart || []).join(', ')} • Base: {(product.notes?.base || []).join(', ')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
