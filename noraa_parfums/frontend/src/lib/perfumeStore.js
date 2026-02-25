const PRODUCTS = [
  {
    id: '1',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    category: 'male',
    region: 'UK',
    description: 'Fresh aromatic citrus opening with woody incense depth for an elegant daily scent.',
    notes: {
      top: ['Lemon', 'Mint', 'Pink Pepper'],
      heart: ['Ginger', 'Jasmine', 'Nutmeg'],
      base: ['Sandalwood', 'Incense', 'Cedar'],
    },
    sizes: [
      { ml: 5, price: 12 },
      { ml: 10, price: 20 },
      { ml: 12, price: 23 },
    ],
    images: ['/images/Bleu de Chanel (1).jpeg', '/images/Bleu de Chanel (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '2',
    name: 'Dior Sauvage Elixir',
    brand: 'Dior',
    category: 'male',
    region: 'UK',
    description: 'Bold spicy amber profile with rich lavender and licorice over smooth woods.',
    notes: {
      top: ['Cinnamon', 'Nutmeg'],
      heart: ['Lavender'],
      base: ['Licorice', 'Amber', 'Patchouli'],
    },
    sizes: [
      { ml: 5, price: 13 },
      { ml: 10, price: 22 },
    ],
    images: ['/images/Dior Sauvage Elixir (1).jpeg', '/images/Dior Sauvage Elixir (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '3',
    name: 'Versace Crystal Noir',
    brand: 'Versace',
    category: 'female',
    region: 'UK',
    description: 'Warm floral oriental blend with creamy coconut and soft sandalwood finish.',
    notes: {
      top: ['Pepper', 'Cardamom'],
      heart: ['Gardenia', 'Peony', 'Coconut'],
      base: ['Musk', 'Sandalwood', 'Amber'],
    },
    sizes: [
      { ml: 5, price: 12 },
      { ml: 10, price: 21 },
      { ml: 12, price: 24 },
    ],
    images: ['/images/Versace Crystal Noir (1).jpeg', '/images/Versace Crystal Noir (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '4',
    name: 'Black Opium Over Red',
    brand: 'YSL',
    category: 'female',
    region: 'UK',
    description: 'A gourmand floral with cherry sweetness, coffee warmth, and creamy vanilla.',
    notes: {
      top: ['Cherry', 'Pear'],
      heart: ['Coffee', 'Jasmine'],
      base: ['Vanilla', 'Patchouli'],
    },
    sizes: [
      { ml: 5, price: 12 },
      { ml: 10, price: 20 },
    ],
    images: ['/images/Yves saint laurent Black Opium over red (1).jpeg', '/images/Yves saint laurent Black Opium over red  (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '5',
    name: 'Travel Size Discovery',
    brand: 'Noraa Parfums',
    category: 'travel',
    region: 'UK',
    description: 'Mini atomizers ideal for travel and gifting with mixed signature scents.',
    notes: {
      top: ['Bergamot'],
      heart: ['Rose'],
      base: ['Amber'],
    },
    sizes: [
      { ml: 5, price: 10 },
      { ml: 10, price: 18 },
      { ml: 12, price: 21 },
    ],
    images: ['/images/Travel size bottle 5 ml (1).jpeg', '/images/Travel size bottle 10 ml (1).jpeg'],
    coming_soon: false,
  },
];

const FAVORITES_KEY = 'noraa_favorites';

export function getProducts(region = 'UK') {
  return PRODUCTS.filter((product) => product.region === region);
}

export function getProductById(productId) {
  return PRODUCTS.find((product) => String(product.id) === String(productId)) || null;
}

export function getFavorites() {
  try {
    const parsed = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function addFavorite(product_id) {
  const favorites = getFavorites();
  if (!favorites.some((f) => f.product_id === product_id)) {
    favorites.push({ id: String(Date.now()), product_id });
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }
  return favorites;
}

export function removeFavorite(product_id) {
  const favorites = getFavorites().filter((item) => item.product_id !== product_id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  return favorites;
}

export function toggleFavorite(product_id) {
  const favorites = getFavorites();
  if (favorites.some((item) => item.product_id === product_id)) {
    return removeFavorite(product_id);
  }
  return addFavorite(product_id);
}
