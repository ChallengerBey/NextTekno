"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, Star, TrendingUp, Package } from "lucide-react";

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<string>("electronics");

  const categories = [
    {
      id: "electronics",
      name: "Elektronik",
      icon: "📱",
      featured: [
        { name: "iPhone 15 Pro", price: "₺54.999", image: "/images/products/iphone.jpg" },
        { name: "MacBook Air M2", price: "₺32.999", image: "/images/products/macbook.jpg" },
        { name: "Samsung TV 55\"", price: "₺18.999", image: "/images/products/tv.jpg" },
      ],
      subcategories: [
        { name: "Akıllı Telefonlar", count: 245 },
        { name: "Dizüstü Bilgisayarlar", count: 89 },
        { name: "Tabletler", count: 67 },
        { name: "Televizyonlar", count: 123 },
        { name: "Kulaklıklar", count: 156 },
        { name: "Akıllı Saatler", count: 78 },
      ]
    },
    {
      id: "gaming",
      name: "Oyun",
      icon: "🎮",
      featured: [
        { name: "PlayStation 5", price: "₺24.999", image: "/images/products/ps5.jpg" },
        { name: "Xbox Series X", price: "₺22.999", image: "/images/products/xbox.jpg" },
        { name: "RTX 4090", price: "₺45.999", image: "/images/products/gpu.jpg" },
      ],
      subcategories: [
        { name: "Oyun Konsolları", count: 45 },
        { name: "Ekran Kartları", count: 67 },
        { name: "Oyun Monitörleri", count: 89 },
        { name: "Oyun Klavyeleri", count: 134 },
        { name: "Oyun Fareleri", count: 156 },
        { name: "Oyun Koltukları", count: 34 },
      ]
    },
    {
      id: "home",
      name: "Ev & Yaşam",
      icon: "🏠",
      featured: [
        { name: "Robot Süpürge", price: "₺8.999", image: "/images/products/vacuum.jpg" },
        { name: "Hava Temizleyici", price: "₺4.999", image: "/images/products/purifier.jpg" },
        { name: "Kahve Makinesi", price: "₺3.499", image: "/images/products/coffee.jpg" },
      ],
      subcategories: [
        { name: "Mutfak Aletleri", count: 234 },
        { name: "Temizlik", count: 89 },
        { name: "Isıtma & Soğutma", count: 67 },
        { name: "Aydnlatma", count: 123 },
        { name: "Mobilya", count: 456 },
        { name: "Bahçe", count: 78 },
      ]
    },
    {
      id: "fashion",
      name: "Moda",
      icon: "👕",
      featured: [
        { name: "Akıllı Saat", price: "₺2.999", image: "/images/products/smartwatch.jpg" },
        { name: "Spor Ayakkabı", price: "₺1.899", image: "/images/products/shoes.jpg" },
        { name: "Güneş Gözlüğü", price: "₺899", image: "/images/products/glasses.jpg" },
      ],
      subcategories: [
        { name: "Erkek Giyim", count: 567 },
        { name: "Kadın Giyim", count: 789 },
        { name: "Çocuk Giyim", count: 234 },
        { name: "Ayakkabı", count: 456 },
        { name: "Aksesuar", count: 345 },
        { name: "Çantalar", count: 123 },
      ]
    }
  ];

  const deals = [
    { name: "Flash Sale", discount: "50%", time: "2 saat kaldı" },
    { name: "Weekend Deal", discount: "30%", time: "3 gün kaldı" },
    { name: "Clearance", discount: "70%", time: "Son fırsatlar" },
  ];

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.2 }}
        className="absolute top-full left-0 right-0 bg-white dark:bg-gray-800 shadow-2xl border-t border-gray-200 dark:border-gray-700 z-50"
        onMouseLeave={onClose}
      >
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="grid grid-cols-12 gap-8">
            {/* Sol Kategori Listesi */}
            <div className="col-span-3">
              <div className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                      activeCategory === category.id
                        ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-l-4 border-blue-600"
                        : "hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}
                  >
                    <span className="text-2xl">{category.icon}</span>
                    <div>
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        {category.subcategories.reduce((acc, sub) => acc + sub.count, 0)} ürün
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Orta İçerik */}
            <div className="col-span-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Alt Kategoriler */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <Package size={16} />
                    Kategoriler
                  </h3>
                  <div className="space-y-2">
                    {categories
                      .find(cat => cat.id === activeCategory)
                      ?.subcategories.map((sub) => (
                        <Link
                          key={sub.name}
                          href={`/shop-with-sidebar?category=${sub.name.toLowerCase()}`}
                          className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                        >
                          <span className="text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {sub.name}
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-600 px-2 py-1 rounded-full">
                            {sub.count}
                          </span>
                        </Link>
                      ))}
                  </div>
                </div>

                {/* Öne Çıkan Ürünler */}
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                    <TrendingUp size={16} />
                    Öne Çıkanlar
                  </h3>
                  <div className="space-y-3">
                    {categories
                      .find(cat => cat.id === activeCategory)
                      ?.featured.slice(0, 3)
                      .map((product) => (
                        <Link
                          key={product.name}
                          href={`/product/${product.name.toLowerCase().replace(/\s+/g, '-')}`}
                          className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors group"
                        >
                          <div className="w-12 h-12 bg-gray-200 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                            <Package size={20} className="text-gray-500" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-sm text-gray-900 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                              {product.name}
                            </div>
                            <div className="text-sm text-blue-600 dark:text-blue-400 font-semibold">
                              {product.price}
                            </div>
                          </div>
                          <ChevronRight size={16} className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                        </Link>
                      ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Sağ Fırsatlar */}
            <div className="col-span-3">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
                <Star size={16} />
                Özel Fırsatlar
              </h3>
              <div className="space-y-3">
                {deals.map((deal) => (
                  <div
                    key={deal.name}
                    className="bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-red-600 dark:text-red-400">
                        {deal.name}
                      </span>
                      <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full font-bold">
                        {deal.discount}
                      </span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">
                      {deal.time}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Yeni Gelenler
                </h4>
                <p className="text-sm text-blue-700 dark:text-blue-300 mb-3">
                  En yeni ürünleri keşfedin!
                </p>
                <Link
                  href="/new-arrivals"
                  className="inline-flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  Keşfet
                  <ChevronRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MegaMenu;
