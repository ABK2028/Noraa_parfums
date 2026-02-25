const pageMap = {
  Home: '/',
  Products: '/products',
  PerfumeFinder: '/perfumefinder',
  Contact: '/contact',
  About: '/about',
  Wishlist: '/wishlist',
  Favorites: '/wishlist',
  ProductDetail: '/product',
  Cart: '/cart',
  Login: '/login',
};

export function createPageUrl(pageName) {
  if (!pageName) return '/';
  return pageMap[pageName] ?? `/${String(pageName).toLowerCase()}`;
}
