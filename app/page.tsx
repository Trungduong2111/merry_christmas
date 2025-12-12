"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, User, Menu, X, List, Timer, Heart, Mail, Instagram, Twitter, Youtube, ArrowRight, ArrowUpRight } from 'lucide-react';

// Define types for products
interface Product {
  id: string;
  title: string;
  meta: string;
  price: number;
  category: string;
  image: string;
  badge?: string;
}

interface FlashSaleItem {
  title: string;
  meta: string;
  price: number;
  oldPrice: number;
  discount: number;
  image: string;
}

export default function AuroraAudio() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [preferredCategory, setPreferredCategory] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState({ hours: 2, minutes: 15, seconds: 27 });

  const categories = [
    { name: "Headphones", count: 28 },
    { name: "Speakers", count: 18 },
    { name: "Earbuds", count: 34 },
    { name: "Accessories", count: 22 }
  ];

  const products: Product[] = [
  { id: 'p1', title: 'Nova Pro Wireless', meta: 'Over-ear • ANC', price: 199, category: 'Headphones', badge: 'Best Seller', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b' },
  { id: 'p2', title: 'EchoMax Portable', meta: 'Bluetooth • 20h battery', price: 129, category: 'Speakers', badge: 'New', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1' },
  { id: 'p3', title: 'AirLite TWS', meta: 'IPX5 • Fast charge', price: 89, category: 'Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df' },
  { id: 'p4', title: 'StudioX Monitor', meta: 'Wired • Neutral', price: 159, category: 'Headphones', badge: "Editor's pick", image: 'https://images.unsplash.com/photo-1599669454699-248893623440' },
  { id: 'p5', title: 'QuietWave ANC', meta: 'ANC • 30h battery', price: 219, category: 'Headphones', image: 'https://images.unsplash.com/photo-1484704849700-f032a568e944' },
  { id: 'p6', title: 'SoundBar X Pro', meta: 'Dolby • Wi-Fi', price: 349, category: 'Speakers', image: 'https://images.unsplash.com/photo-1545127398-14699f92334b' },
  { id: 'p7', title: 'GoldLink Cable', meta: 'OFC • 1.5m', price: 29, category: 'Accessories', image: 'https://images.unsplash.com/photo-1625749284600-1dd4dde0b775' },
  { id: 'p8', title: 'ArcLite Gaming', meta: 'Surround • Mic', price: 109, category: 'Headphones', image: 'https://images.unsplash.com/photo-1599669454699-248893623440' }
];


 const flashSaleItems: FlashSaleItem[] = [
  { title: 'MiniGo Speaker', meta: 'Compact • Waterproof', price: 49, oldPrice: 79, discount: 38, image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1' },
  { title: 'SilenceBuds', meta: 'ANC • Wireless', price: 59, oldPrice: 99, discount: 40, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df' },
  { title: 'Walnut Stand', meta: 'Solid wood • Minimal', price: 25, oldPrice: 39, discount: 36, image: 'https://images.unsplash.com/photo-1625749284600-1dd4dde0b775' }
];


 const recommendedProducts: Product[] = [
  { id: 'r1', title: 'PocketBeat Mini', meta: 'Ultra compact', price: 39, category: 'Speakers', image: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1' },
  { id: 'r2', title: 'CloudEars Soft', meta: 'Memory foam tips', price: 19, category: 'Accessories', image: 'https://images.unsplash.com/photo-1625749284600-1dd4dde0b775' },
  { id: 'r3', title: 'BassBoost Pro', meta: 'Earbuds • Deep bass', price: 69, category: 'Earbuds', image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df' },
  { id: 'r4', title: 'Clarity Mic', meta: 'USB-C • Noise filter', price: 59, category: 'Accessories', image: 'https://images.unsplash.com/photo-1589003077984-894e133dabab' }
];

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Search suggestions
  useEffect(() => {
    if (searchQuery.trim()) {
      const allProducts = [...products, ...recommendedProducts];
      const filtered = allProducts
        .filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 7);
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  }, [searchQuery]);

  const handleCategoryClick = (category: string) => {
    setPreferredCategory(category);
    setIsCategoriesOpen(false);
  };

  const getRecommendedProducts = (): Product[] => {
    if (preferredCategory) {
      const filtered = [...products, ...recommendedProducts].filter(p => p.category === preferredCategory);
      return filtered.length > 0 ? filtered.slice(0, 8) : recommendedProducts;
    }
    return recommendedProducts;
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-900 to-pink-700 rounded-lg"></div>
              <span className="text-xl font-semibold text-gray-900 group-hover:opacity-90">Aurora Audio</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center space-x-6">
              <div className="relative">
                <button
                  onClick={() => setIsCategoriesOpen(!isCategoriesOpen)}
                  className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-purple-900 transition-colors"
                >
                  <List size={18} className="text-purple-900" />
                  <span>Categories</span>
                </button>
                {isCategoriesOpen && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg py-2">
                    {categories.map(cat => (
                      <a
                        key={cat.name}
                        href="#featured"
                        onClick={() => handleCategoryClick(cat.name)}
                        className="flex items-center justify-between px-4 py-2.5 hover:bg-gray-50 text-gray-700 hover:text-purple-900 transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm text-gray-400">{cat.count}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
              <a href="#promotions" className="text-gray-700 hover:text-purple-900 transition-colors">Promotions</a>
              <a href="#featured" className="text-gray-700 hover:text-purple-900 transition-colors">Featured</a>
              <a href="#recommendations" className="text-gray-700 hover:text-purple-900 transition-colors">Recommended</a>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <a href="#" className="hidden md:flex items-center space-x-2 text-gray-700 hover:text-purple-900 transition-colors">
                <User size={18} className="text-purple-900" />
                <span>Sign In</span>
              </a>
              <button className="relative flex items-center space-x-2 px-3 py-2 text-gray-700 hover:text-purple-900 transition-colors">
                <ShoppingCart size={18} className="text-purple-900" />
                <span className="hidden sm:inline">Cart</span>
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-pink-600 text-white text-xs rounded-full flex items-center justify-center">2</span>
              </button>
              <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="pb-4 relative">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-900" size={18} />
              <input
                type="search"
                placeholder="Search headphones, speakers, earbuds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-32 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600 focus:border-transparent"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-24 top-1/2 transform -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear
                </button>
              )}
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors">
                Search
              </button>
            </div>

            {/* Autocomplete */}
            {suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-80 overflow-y-auto">
                {suggestions.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between px-4 py-3 hover:bg-gray-50 cursor-pointer"
                    onClick={() => setSearchQuery('')}
                  >
                    <span className="text-sm text-gray-800">{item.title}</span>
                    <ArrowUpRight size={16} className="text-gray-400" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section id="promotions" className="bg-gradient-to-r from-purple-100 via-pink-50 to-rose-100">
        <a href="#flash-sale" className="block">
          <div className="max-w-7xl mx-auto px-4 py-16">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h1 className="text-5xl font-bold text-gray-900 mb-4">
                  48h Flash Sale: Up to 40% off selected audio gear
                </h1>
                <p className="text-xl text-gray-700 mb-6">
                  Upgrade your sound with premium headphones, speakers, and earbuds. Limited stock, free shipping over $50.
                </p>
                <div className="flex flex-wrap items-center gap-4">
                  <span className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200">
                    <Timer size={18} className="text-pink-600" />
                    <span className="text-sm font-medium">
                      Ends in {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                    </span>
                  </span>
                  <button className="px-6 py-3 bg-gray-900 text-white rounded-full hover:bg-gray-800 transition-colors font-medium">
                    Shop Deals
                  </button>
                </div>
              </div>
              <div>
                <img
                  src="https://images.unsplash.com/photo-1545127398-14699f92334b?w=920&q=80"
                  alt="Audio gear on sale"
                  className="w-full h-auto rounded-xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </a>
      </section>

      {/* Featured Products */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Products</h2>
              <p className="text-gray-600">Curated picks with best ratings and value</p>
            </div>
            <a href="#featured" className="text-pink-600 hover:text-pink-700 font-medium">View all</a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <article key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all hover:shadow-lg">
                <a href="#" onClick={() => setQuickViewProduct(product)}>
                  <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {product.badge && (
                      <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-xs font-medium rounded-full border border-gray-200">
                        {product.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.meta}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-pink-600">${product.price}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setQuickViewProduct(product);
                        }}
                        className="text-sm px-3 py-1.5 border border-gray-200 rounded hover:border-gray-300 transition-colors"
                      >
                        Quick View
                      </button>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Flash Sale */}
      <section id="flash-sale" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Flash Sale</h2>
              <p className="text-gray-600">Limited-time deals, refreshed hourly</p>
            </div>
            <span className="inline-flex items-center space-x-2 px-4 py-2 bg-white rounded-full border border-gray-200">
              <Timer size={18} className="text-pink-600" />
              <span className="text-sm font-medium">Next refresh in 15m</span>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {flashSaleItems.map((item, idx) => (
              <article key={idx} className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all hover:shadow-lg">
                <div className="aspect-[3/2] overflow-hidden bg-gray-100">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{item.meta}</p>
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-2xl font-bold text-pink-600">${item.price}</span>
                    <span className="text-sm text-gray-400 line-through">${item.oldPrice}</span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 text-xs font-bold rounded">-{item.discount}%</span>
                  </div>
                  <a href="#" className="inline-flex items-center space-x-2 text-sm font-medium hover:opacity-70 transition-opacity">
                    <ArrowRight size={16} />
                    <span>View Deal</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Recommended */}
      <section id="recommendations" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Recommended for You</h2>
              <p className="text-gray-600">Personalized based on your browsing</p>
            </div>
            <button
              onClick={() => setPreferredCategory(null)}
              className="text-sm px-4 py-2 border border-gray-200 rounded hover:border-gray-300 transition-colors"
            >
              Reset Preferences
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {getRecommendedProducts().map(product => (
              <article key={product.id} className="group border border-gray-200 rounded-lg overflow-hidden hover:border-gray-300 transition-all hover:shadow-lg">
                <a href="#">
                  <div className="relative aspect-[3/2] overflow-hidden bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-3 left-3 px-3 py-1 bg-white/95 text-xs font-medium rounded border border-gray-200">
                      {preferredCategory || product.category}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1">{product.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{product.meta}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xl font-bold text-pink-600">${product.price}</span>
                      <button className="text-sm px-3 py-1.5 border border-gray-200 rounded hover:border-gray-300">
                        Quick View
                      </button>
                    </div>
                  </div>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Quick View Modal */}
      {quickViewProduct && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setQuickViewProduct(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-8 p-8">
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-3xl font-bold text-gray-900">{quickViewProduct.title}</h3>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <X size={24} />
                  </button>
                </div>
                <p className="text-lg text-gray-600 mb-6">{quickViewProduct.meta}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-pink-600">${quickViewProduct.price}</span>
                  <p className="text-sm text-gray-500 mt-2">Free shipping over $50</p>
                </div>
                <div className="space-y-3">
                  <button className="w-full py-4 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                    View Details
                  </button>
                  <button className="w-full py-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors flex items-center justify-center space-x-2">
                    <Heart size={20} />
                    <span>Add to Wishlist</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-900 to-pink-700 rounded-lg"></div>
                <span className="text-xl font-semibold text-gray-900">Aurora Audio</span>
              </div>
              <p className="text-gray-600 text-sm leading-relaxed">
                We craft minimalist, high‑fidelity audio products. Fast shipping, elegant design, and support you can trust.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Shop</h3>
              <ul className="space-y-2">
                <li><a href="#featured" className="text-gray-600 hover:text-gray-900 text-sm">Featured</a></li>
                <li><a href="#promotions" className="text-gray-600 hover:text-gray-900 text-sm">Promotions</a></li>
                <li><a href="#recommendations" className="text-gray-600 hover:text-gray-900 text-sm">Recommended</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Account</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Orders</a></li>
                <li><a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Help Center</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Stay in touch</h3>
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="email"
                    placeholder="Your email"
                    className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-600"
                  />
                </div>
                <button className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row items-center justify-between">
            <p className="text-sm text-gray-600 mb-4 md:mb-0">© 2025 Aurora Audio. All rights reserved.</p>
            <div className="flex items-center space-x-4">
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-gray-900 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
