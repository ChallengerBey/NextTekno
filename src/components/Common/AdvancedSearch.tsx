"use client";
import React, { useState, useEffect, useRef } from "react";
import { Search, Filter, X, Clock, TrendingUp, Package } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useAdmin } from "@/app/context/AdminContext";

interface AdvancedSearchProps {
  onClose?: () => void;
}

const AdvancedSearch: React.FC<AdvancedSearchProps> = ({ onClose }) => {
  const { products } = useAdmin();
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    priceRange: "",
    brand: "",
    rating: "",
    inStock: false
  });
  const [suggestions, setSuggestions] = useState([]);
  const [recentSearches, setRecentSearches] = useState([
    "iPhone 15 Pro",
    "MacBook Air",
    "Samsung TV",
    "PlayStation 5"
  ]);
  const [trendingSearches, setTrendingSearches] = useState([
    "RTX 4090",
    "iPad Pro",
    "AirPods Pro",
    "Smart Watch"
  ]);
  const searchRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const categories = [
    "Elektronik",
    "Bilgisayar",
    "Telefon",
    "TV",
    "Oyun",
    "Ev & Yaşam",
    "Moda",
    "Spor"
  ];

  const brands = [
    "Apple", "Samsung", "Sony", "LG", "Xiaomi", "Huawei",
    "Dell", "HP", "Lenovo", "Asus", "MSI", "Razer"
  ];

  const priceRanges = [
    { label: "₺0 - ₺1.000", value: "0-1000" },
    { label: "₺1.000 - ₺5.000", value: "1000-5000" },
    { label: "₺5.000 - ₺10.000", value: "5000-10000" },
    { label: "₺10.000 - ₺20.000", value: "10000-20000" },
    { label: "₺20.000+", value: "20000+" }
  ];

  const ratings = [
    { label: "4+ Yıldız", value: "4" },
    { label: "3+ Yıldız", value: "3" },
    { label: "2+ Yıldız", value: "2" }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (query.length > 2) {
      // Admin ürünlerinden arama önerileri oluştur
      const searchResults = products.filter(product => 
        product.title.toLowerCase().includes(query.toLowerCase()) ||
        product.brand?.toLowerCase().includes(query.toLowerCase()) ||
        product.category?.toLowerCase().includes(query.toLowerCase())
      ).slice(0, 5);

      const mockSuggestions = searchResults.length > 0 
        ? searchResults.map(product => ({
            name: product.title,
            category: product.category || "Genel",
            price: `₺${(product.discountedPrice || product.price).toLocaleString('tr-TR')}`
          }))
        : [
            { name: "iPhone 15 Pro Max", category: "Telefon", price: "₺54.999" },
            { name: "iPhone 15 Pro", category: "Telefon", price: "₺49.999" },
            { name: "iPhone 15", category: "Telefon", price: "₺39.999" },
            { name: "iPhone 14 Pro", category: "Telefon", price: "₺44.999" },
            { name: "iPhone 15 Case", category: "Aksesuar", price: "₺899" }
          ].filter(item => 
            item.name.toLowerCase().includes(query.toLowerCase())
          ).slice(0, 5);

      setSuggestions(mockSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [query, products]);

  const handleSearch = (searchQuery?: string) => {
    const finalQuery = searchQuery || query;
    if (finalQuery.trim()) {
      // Add to recent searches
      setRecentSearches(prev => [finalQuery, ...prev.filter(s => s !== finalQuery).slice(0, 4)]);
      
      // Navigate with filters
      const params = new URLSearchParams();
      params.set('q', finalQuery);
      
      if (selectedFilters.category) params.set('category', selectedFilters.category);
      if (selectedFilters.priceRange) params.set('price', selectedFilters.priceRange);
      if (selectedFilters.brand) params.set('brand', selectedFilters.brand);
      if (selectedFilters.rating) params.set('rating', selectedFilters.rating);
      if (selectedFilters.inStock) params.set('stock', 'true');
      
      router.push(`/shop-with-sidebar?${params.toString()}`);
      setIsOpen(false);
      setQuery("");
      onClose?.();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const clearFilters = () => {
    setSelectedFilters({
      category: "",
      priceRange: "",
      brand: "",
      rating: "",
      inStock: false
    });
  };

  const activeFilterCount = Object.values(selectedFilters).filter(v => v !== "" && v !== false).length;

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="flex items-center bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center px-4">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsOpen(true)}
            onKeyPress={handleKeyPress}
            placeholder="Ürün, marka veya kategori ara..."
            className="flex-1 px-45 py-2 bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 text-center"
          />
          
          {query && (
            <button
              onClick={() => setQuery("")}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-lg transition-colors"
            >
              <X className="w-4 h-4 text-gray-400" />
            </button>
          )}
          
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`p-3 border-l border-gray-300 dark:border-gray-600 transition-colors ${
              activeFilterCount > 0 ? 'text-blue-600 dark:text-blue-400' : 'text-gray-400 hover:text-gray-600 dark:hover:text-gray-300'
            }`}
          >
            <Filter className="w-5 h-5" />
            {activeFilterCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Advanced Search Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-xl z-50 max-h-96 overflow-y-auto"
          >
            <div className="p-6">
              {/* Search Suggestions */}
              {suggestions.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Search className="w-4 h-4" />
                    Arama Önerileri
                  </h3>
                  <div className="space-y-2">
                    {suggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(suggestion.name)}
                        className="w-full flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left"
                      >
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">
                            {suggestion.name}
                          </div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            {suggestion.category} • {suggestion.price}
                          </div>
                        </div>
                        <Search className="w-4 h-4 text-gray-400" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Filters */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filtreler
                  </h3>
                  {activeFilterCount > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
                    >
                      Temizle
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Kategori
                    </label>
                    <select
                      value={selectedFilters.category}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, category: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Tümü</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Brand Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Marka
                    </label>
                    <select
                      value={selectedFilters.brand}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, brand: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Tümü</option>
                      {brands.map(brand => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Fiyat Aralığı
                    </label>
                    <select
                      value={selectedFilters.priceRange}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, priceRange: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Tümü</option>
                      {priceRanges.map(range => (
                        <option key={range.value} value={range.value}>{range.label}</option>
                      ))}
                    </select>
                  </div>

                  {/* Rating Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Değerlendirme
                    </label>
                    <select
                      value={selectedFilters.rating}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, rating: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="">Tümü</option>
                      {ratings.map(rating => (
                        <option key={rating.value} value={rating.value}>{rating.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Stock Filter */}
                <div className="mt-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedFilters.inStock}
                      onChange={(e) => setSelectedFilters(prev => ({ ...prev, inStock: e.target.checked }))}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      Sadece stoktakiler
                    </span>
                  </label>
                </div>
              </div>

              {/* Recent Searches */}
              {recentSearches.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Son Aramalar
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((search, index) => (
                      <button
                        key={index}
                        onClick={() => handleSearch(search)}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full text-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {search}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Trending Searches */}
              <div>
                <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4" />
                  Popüler Aramalar
                </h3>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((search, index) => (
                    <button
                      key={index}
                      onClick={() => handleSearch(search)}
                      className="px-3 py-1.5 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-full text-sm hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdvancedSearch;
