const PRODUCTS = [
  {
    id: '1',
    name: 'Acqua di Gio',
    brand: 'Giorgio Armani',
    category: 'male',
    region: 'UK',
    description: 'Fresh aquatic fragrance with citrus and marine notes for timeless elegance.',
    notes: {
      top: ['Bergamot', 'Neroli', 'Green Tangerine'],
      heart: ['Jasmine', 'Rosemary', 'Marine Notes'],
      base: ['Patchouli', 'Cedar', 'White Musk'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Acqua Di Gio (1).jpeg', '/images/Acqua Di Gio (2).jpeg'],
    sold_out: false,
  },
  {
    id: '100',
    name: 'Baccarat Rouge 540',
    brand: 'Maison Francis Kurkdjian',
    category: 'unisex',
    region: 'UK',
    description: 'Amber, woody, sweet, and airy. For him and her.',
    notes: {
      top: ['Saffron', 'Jasmine'],
      heart: ['Amberwood', 'Ambergris'],
      base: ['Fir Resin', 'Cedar'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Baccarat Rouge 540 (1).jpeg', '/images/Baccarat Rouge 540 (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '102',
    name: 'Parfum De Marly Delina',
    brand: 'Parfums de Marly',
    category: 'female',
    region: 'UK',
    description: 'Rose, fruity, musky. For her.',
    notes: {
      top: ['Rhubarb', 'Lychee', 'Bergamot'],
      heart: ['Turkish Rose', 'Peony', 'Vanilla'],
      base: ['Cashmeran', 'Musk', 'Incense'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Parfum De Marly Delina (1).jpeg', '/images/Parfum De Marly Delina (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '103',
    name: "Killian Paris Angel's Share",
    brand: 'Kilian Paris',
    category: 'male',
    region: 'UK',
    description: 'Boozy, sweet, spicy. For him.',
    notes: {
      top: ['Cognac'],
      heart: ['Cinnamon', 'Oak', 'Tonka Bean'],
      base: ['Vanilla', 'Praline', 'Sandalwood'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ["/images/Killian Paris Angel's Share (1).jpeg", "/images/Killian Paris Angel's Share (2).jpeg"],
    coming_soon: false,
  },
  {
    id: '2',
    name: 'Sauvage Elixir',
    brand: 'Dior',
    category: 'male',
    region: 'UK',
    description: 'Bold spicy amber profile with rich lavender and licorice over smooth woods.',
    notes: {
      top: ['Cinnamon', 'Nutmeg', 'Cardamom'],
      heart: ['Lavender'],
      base: ['Licorice', 'Amber', 'Patchouli', 'Sandalwood'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Dior Sauvage Elixir (1).jpeg', '/images/Dior Sauvage Elixir (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '3',
    name: 'Ombre Leather',
    brand: 'Tom Ford',
    category: 'male',
    region: 'UK',
    description: 'Rich leather fragrance with spicy cardamom and earthy patchouli depth.',
    notes: {
      top: ['Cardamom'],
      heart: ['Leather', 'Jasmine Sambac'],
      base: ['Patchouli', 'Amber', 'Moss'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Leather Ombre (1).jpeg', '/images/Leather ombre (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '4',
    name: 'Stronger With You Intensely',
    brand: 'Emporio Armani',
    category: 'male',
    region: 'UK',
    description: 'Warm oriental with vanilla, amber, and spicy toffee sweetness.',
    notes: {
      top: ['Pink Pepper', 'Juniper'],
      heart: ['Toffee', 'Cinnamon', 'Sage'],
      base: ['Vanilla', 'Amber', 'Tonka Bean', 'Suede'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Stronger With You Intensely (1).jpeg', '/images/Stronger With You Intensely (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '5',
    name: 'Black Opium Over Red',
    brand: 'Yves Saint Laurent',
    category: 'female',
    region: 'UK',
    description: 'A gourmand floral with cherry sweetness, coffee warmth, and creamy vanilla.',
    notes: {
      top: ['Cherry', 'Pear', 'Orange'],
      heart: ['Coffee', 'Jasmine'],
      base: ['Vanilla', 'Patchouli', 'Cedar'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Yves saint laurent Black Opium over red (1).jpeg', '/images/Yves saint laurent Black Opium over red  (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '9',
    name: 'Crystal Noir',
    brand: 'Versace',
    category: 'female',
    region: 'UK',
    description: 'Warm floral oriental blend with creamy coconut and soft sandalwood finish.',
    notes: {
      top: ['Ginger', 'Cardamom', 'Pepper'],
      heart: ['Gardenia', 'Peony', 'Coconut'],
      base: ['Musk', 'Sandalwood', 'Amber'],
    },
    sizes: [
      { ml: 3, price: 1 },
      { ml: 100, price: 30 },
    ],
    images: ['/images/Versace Crystal Noir (1).jpeg', '/images/Versace Crystal Noir (2).jpeg'],
    sold_out: true,
  },
  {
    id: '7',
    name: '5ml Travel Bottle',
    brand: 'Noraa',
    category: 'travel',
    region: 'UK',
    description: 'Compact 5ml atomizer bottle perfect for travel and on-the-go fragrance needs.',
    notes: {
      top: [],
      heart: [],
      base: [],
    },
    sizes: [
      { ml: 5, price: 3 },
    ],
    images: ['/images/Travel size bottle 5 ml (1).jpeg', '/images/Travel size bottle 5 ml (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '8',
    name: '10ml Travel Bottle',
    brand: 'Noraa',
    category: 'travel',
    region: 'UK',
    description: 'Stylish 10ml atomizer bottle ideal for weekend trips and daily carry.',
    notes: {
      top: [],
      heart: [],
      base: [],
    },
    sizes: [
      { ml: 10, price: 5 },
    ],
    images: ['/images/Travel size bottle 10 ml (1).jpeg', '/images/Travel size bottle 10 ml (2).jpeg'],
    coming_soon: false,
  },
  {
    id: '12',
    name: '12ml Travel Bottle',
    brand: 'Noraa',
    category: 'travel',
    region: 'UK',
    description: 'Premium 12ml atomizer bottle with elegant design for longer journeys.',
    notes: {
      top: [],
      heart: [],
      base: [],
    },
    sizes: [
      { ml: 12, price: 10 },
    ],
    images: ['/images/Travel size bottle 12 ml (1).jpeg', '/images/Travel size bottle 12 ml (2).jpeg'],
    coming_soon: false,
  },
  // India Products
  {
    id: '10',
    name: 'Bleu de Chanel',
    brand: 'Chanel',
    category: 'male',
    region: 'IN',
    description: 'Fresh aromatic citrus opening with woody incense depth for an elegant daily scent.',
    notes: {
      top: ['Lemon', 'Mint', 'Pink Pepper'],
      heart: ['Ginger', 'Jasmine', 'Nutmeg'],
      base: ['Sandalwood', 'Incense', 'Cedar'],
    },
    sizes: [
      { ml: 5, price: 900 },
      { ml: 10, price: 1500 },
      { ml: 12, price: 1700 },
    ],
    images: ['/images/Bleu de Chanel (1).jpeg', '/images/Bleu de Chanel (2).jpeg'],
    coming_soon: false,
  },
];

const FAVORITES_KEY = 'noraa_favorites';

function notifyFavoritesUpdated() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('favorites-updated'));
  }
}

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
    notifyFavoritesUpdated();
  }
  return favorites;
}

export function removeFavorite(product_id) {
  const favorites = getFavorites().filter((item) => item.product_id !== product_id);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  notifyFavoritesUpdated();
  return favorites;
}

export function toggleFavorite(product_id) {
  const favorites = getFavorites();
  if (favorites.some((item) => item.product_id === product_id)) {
    return removeFavorite(product_id);
  }
  return addFavorite(product_id);
}
