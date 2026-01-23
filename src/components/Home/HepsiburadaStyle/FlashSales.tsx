"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Clock, Star, ShoppingCart, Zap } from "lucide-react";
import { useAdmin } from "@/app/context/AdminContext";
import { useAppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import toast from "react-hot-toast";

const FlashSales = () => {
  const { products } = useAdmin();
  const dispatch = useAppDispatch();
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    minutes: 45,
    seconds: 30
  });

  // İndirimli ürünleri filtrele veya varsayılan ürünleri kullan
  const flashSaleProducts = products.length > 0 
    ? products.filter(p => p.discountedPrice && p.discountedPrice < p.price).slice(0, 4)
    : [
        {
          id: 1,
          title: "iPhone 15 Pro 128GB",
          price: 45999,
          discountedPrice: 36799,
          rating: 4.8,
          reviews: 1250,
          imgs: { thumbnails: ["/images/products/product-1-bg-1.png"], previews: ["/images/products/product-1-bg-1.png"] },
          stock: 15,
          brand: "Apple"
        },
        {
          id: 2,
          title: "Samsung Galaxy Buds2 Pro",
          price: 2499,
          discountedPrice: 1999,
          rating: 4.6,
          reviews: 890,
          imgs: { thumbnails: ["/images/products/product-2-bg-1.png"], previews: ["/images/products/product-2-bg-1.png"] },
          stock: 8,
          brand: "Samsung"
        },
        {
          id: 3,
          title: "MacBook Air M3 13\"",
          price: 32999,
          discountedPrice: 29699,
          rating: 4.9,
          reviews: 567,
          imgs: { thumbnails: ["/images/products/product-3-bg-1.png"], previews: ["/images/products/product-3-bg-1.png"] },
          stock: 5,
          brand: "Apple"
        },
        {
          id: 4,
          title: "Sony WH-1000XM5",
          price: 8999,
          discountedPrice: 7199,
          rating: 4.7,
          reviews: 432,
          imgs: { thumbnails: ["/images/products/product-4-bg-1.png"], previews: ["/images/products/product-4-bg-1.png"] },
          stock: 12,
          brand: "Sony"
        }
      ];

  useEffect(() => {
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

  const handleAddToCart = (product: any) => {
    const cartItem = {
      id: product.id,
      title: product.title,
      price: product.price,
      discountedPrice: product.discountedPrice || product.price,
      imgs: product.imgs,
      quantity: 1
    };
    
    dispatch(addItemToCart(cartItem));
    toast.success(`${product.title} sepete eklendi!`);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border mb-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-orange-50 to-red-50">
        <div className="flex items-center gap-3">
          <div className="bg-orange-500 text-white p-2 rounded-lg">
            <Zap size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              ⚡ Flaş Ürünler
            </h2>
            <p className="text-sm text-gray-600">
              {products.length > 0 && flashSaleProducts.length > 0 
                ? "Admin panelinden eklenen indirimli ürünler" 
                : "Sınırlı süre, sınırlı stok!"}
            </p>
          </div>
        </div>
        
        {/* Countdown Timer */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-red-500 text-white px-3 py-1 rounded-lg font-mono text-sm">
            <Clock size={16} />
            {timeLeft.hours.toString().padStart(2, '0')}:
            {timeLeft.minutes.toString().padStart(2, '0')}:
            {timeLeft.seconds.toString().padStart(2, '0')}
          </div>
          <Link 
            href="/flash-sales" 
            className="text-orange-500 font-semibold hover:text-orange-600 transition-colors flex items-center gap-1"
          >
            Tümünü Gör →
          </Link>
        </div>
      </div>

      {/* Products Grid */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {flashSaleProducts.map((product) => {
            const discountPercent = Math.round(((product.price - (product.discountedPrice || product.price)) / product.price) * 100);
            
            return (
              <div key={product.id} className="group cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative bg-gray-50 p-4">
                  {/* Discount Badge */}
                  <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                    %{discountPercent} İndirim
                  </div>

                  {/* Stock Warning */}
                  {product.stock && product.stock < 10 && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold z-10">
                      Son {product.stock}!
                    </div>
                  )}

                  {/* Product Image */}
                  <div className="aspect-square flex items-center justify-center group-hover:scale-105 transition-transform">
                    <img 
                      src={product.imgs?.thumbnails?.[0] || "/images/products/product-1-bg-1.png"} 
                      alt={product.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-3">
                  <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {product.title}
                  </h3>
                  
                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-2">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs font-medium">{product.rating || 4.5}</span>
                    <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                  </div>
                  
                  {/* Price */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-orange-600">
                      {(product.discountedPrice || product.price).toLocaleString('tr-TR')} ₺
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.price.toLocaleString('tr-TR')} ₺
                    </span>
                  </div>

                  {/* Add to Cart Button */}
                  <button 
                    onClick={() => handleAddToCart(product)}
                    className="w-full bg-orange-500 text-white py-2 rounded text-sm hover:bg-orange-600 transition-colors flex items-center justify-center gap-1"
                  >
                    <ShoppingCart size={14} />
                    Sepete Ekle
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FlashSales;