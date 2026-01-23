"use client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Flaş Ürünler | NextTekno - Sınırlı Süreli İndirimler",
  description: "NextTekno'da flaş ürünler! Sınırlı süreli büyük indirimler. iPhone, Samsung, laptop ve teknoloji ürünlerinde özel fiyatlar. Kaçırma!",
  keywords: [
    "flaş ürünler",
    "sınırlı süre",
    "büyük indirim",
    "özel fiyat",
    "kampanya",
    "iPhone indirimi",
    "Samsung indirimi",
    "laptop indirimi",
    "teknoloji indirimi",
    "NextTekno flaş"
  ],
  openGraph: {
    title: "Flaş Ürünler | NextTekno - Sınırlı Süreli İndirimler",
    description: "Sınırlı süreli büyük indirimler! Kaçırma!",
    url: 'https://nexttekno.com/flash-sales',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Flaş Ürünler | NextTekno",
    description: "Sınırlı süreli büyük indirimler! Kaçırma!",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/flash-sales',
  },
};
import React, { useState, useEffect } from "react";
import { getFlashSaleProducts, Product } from "@/lib/database";
import HepsiburadaHeader from "@/components/Home/HepsiburadaStyle/HepsiburadaHeader";
import { Star, ShoppingCart, Heart, Clock, Zap } from "lucide-react";

const FlashSalesPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  useEffect(() => {
    const flashProducts = getFlashSaleProducts();
    setProducts(flashProducts);

    // Countdown timer
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <HepsiburadaHeader />
      
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-orange-500">Ana Sayfa</a>
            <span>/</span>
            <span className="text-orange-500 font-medium">Flaş Ürünler</span>
          </div>
        </nav>

        {/* Flash Sales Header */}
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-8 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Zap size={32} />
                <h1 className="text-4xl font-bold">⚡ Flaş Ürünler</h1>
              </div>
              <p className="text-xl opacity-90">Sınırlı süre, sınırlı stok! Kaçırma!</p>
            </div>
            
            {/* Countdown Timer */}
            <div className="bg-white/20 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={20} />
                <span className="font-semibold">Kalan Süre</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-white/30 rounded-lg p-3 text-center min-w-[60px]">
                  <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                  <div className="text-xs">Saat</div>
                </div>
                <span className="text-2xl">:</span>
                <div className="bg-white/30 rounded-lg p-3 text-center min-w-[60px]">
                  <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                  <div className="text-xs">Dakika</div>
                </div>
                <span className="text-2xl">:</span>
                <div className="bg-white/30 rounded-lg p-3 text-center min-w-[60px]">
                  <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                  <div className="text-xs">Saniye</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow overflow-hidden group">
                {/* Product Image */}
                <div className="relative aspect-square bg-gray-50 p-4">
                  {/* Flash Sale Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                    ⚡ FLAŞ
                  </div>
                  
                  {/* Discount Badge */}
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                      %{product.discount} İndirim
                    </div>
                  )}

                  {/* Stock Badge */}
                  <div className="absolute bottom-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold z-10">
                    {product.stock} adet kaldı!
                  </div>

                  {/* Product Image Placeholder */}
                  <div className="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform">
                    <span className="text-4xl">📱</span>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.name}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center gap-1">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-gray-500">({product.reviewCount})</span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-red-600">
                      ₺{product.price.toLocaleString('tr-TR')}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        ₺{product.originalPrice.toLocaleString('tr-TR')}
                      </span>
                    )}
                  </div>

                  {/* Stock Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Stok Durumu</span>
                      <span>{product.stock} adet kaldı</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-red-500 h-2 rounded-full transition-all"
                        style={{ width: `${Math.max(10, (product.stock / 100) * 100)}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Add to Cart Button */}
                  <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 font-semibold">
                    <ShoppingCart size={16} />
                    Hemen Al
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-lg p-8 text-center">
            <Zap size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Şu anda flaş ürün bulunmuyor</h3>
            <p className="text-gray-600">Yeni flaş ürünler için takipte kalın!</p>
          </div>
        )}

        {/* Flash Sale Info */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Flaş Ürünler Hakkında</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Clock size={24} className="text-red-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Sınırlı Süre</h3>
              <p className="text-sm text-gray-600">Flaş ürünler sadece belirli saatlerde satışta!</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap size={24} className="text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Süper İndirim</h3>
              <p className="text-sm text-gray-600">Normal fiyatlardan çok daha uygun fiyatlar!</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingCart size={24} className="text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Hızlı Teslimat</h3>
              <p className="text-sm text-gray-600">Flaş ürünlerde ücretsiz ve hızlı kargo!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlashSalesPage;