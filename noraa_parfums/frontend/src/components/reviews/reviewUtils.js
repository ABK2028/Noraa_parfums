export const fallbackReviews = [
  {
    name: 'Sophia M.',
    location: 'London, UK',
    initials: 'SM',
    rating: 5,
    text: 'Absolutely divine. The longevity is unmatched - I received compliments all evening. Noraa Parfums has earned a lifelong customer.',
  },
  {
    name: 'Arjun R.',
    location: 'Mumbai, IN',
    initials: 'AR',
    rating: 5,
    text: 'The packaging alone feels like a luxury gift. The scent is rich, warm, and deeply personal. Worth every penny.',
  },
  {
    name: 'Isabelle T.',
    location: 'Edinburgh, UK',
    initials: 'IT',
    rating: 5,
    text: "I've tried many niche perfume houses but Noraa stands apart. Sophisticated, confident and utterly beautiful.",
  },
  {
    name: 'Priya K.',
    location: 'Delhi, IN',
    initials: 'PK',
    rating: 5,
    text: 'The AI fragrance finder helped me discover a scent I now wear every day. Such a unique and personal experience.',
  },
  {
    name: 'James W.',
    location: 'Manchester, UK',
    initials: 'JW',
    rating: 5,
    text: 'Bold, elegant, and long-lasting. A fragrance that truly makes a statement without being overpowering.',
  },
  {
    name: 'Meera S.',
    location: 'Bangalore, IN',
    initials: 'MS',
    rating: 5,
    text: "Gifted this to my partner and they haven't stopped wearing it. The presentation was exquisite too.",
  },
];

export const REVIEW_STORAGE_KEY = 'noraa_frontend_reviews';

export function getInitials(name) {
  if (!name) {
    return 'NP';
  }

  const parts = String(name).trim().split(/\s+/).filter(Boolean);
  const initials = parts.slice(0, 2).map((part) => part[0].toUpperCase()).join('');
  return initials || 'NP';
}

export function parseReviewBody(comment) {
  const value = String(comment || '');
  const [mainText, details] = value.split('\n\n');

  return {
    text: (mainText || '').trim(),
    location: (details || '').trim() || 'Verified Customer',
  };
}

export function normalizeServerReviews(serverReviews) {
  return (Array.isArray(serverReviews) ? serverReviews : []).map((review) => ({
    ...review,
    ...parseReviewBody(review.comment),
    name: review.reviewer_name || 'Verified Customer',
    initials: getInitials(review.reviewer_name),
    rating: Number(review.rating) || 5,
  }));
}

export function loadFrontendReviews() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(REVIEW_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveFrontendReviews(reviews) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(REVIEW_STORAGE_KEY, JSON.stringify(reviews));
}

export function getAllReviews() {
  const localReviews = loadFrontendReviews();
  return [...localReviews, ...fallbackReviews];
}
