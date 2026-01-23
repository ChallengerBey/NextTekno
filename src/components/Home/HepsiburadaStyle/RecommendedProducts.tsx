"use client";
import React from "react";
import Link from "next/link";
import { Star, ShoppingCart, Heart } from "lucide-react";
import { useAdmin } from "@/app/context/AdminContext";
import { useAppDispatch } from "@/redux/store";
import { addItemToCart } from "@/redux/features/cart-slice";
import toast from "react-hot-toast";

const RecommendedProducts = () => {
  const { products } = useAdmin();
  const dispatch = useAppDispatch();

  // Admin'den gelen ürünleri kullan, yoksa varsayılan ürünleri göster
  const displayProducts = products.length > 0 ? products.slice(0, 6) : [
    {
      id: 1,
      title: "iPhone 15 Pro Max 256GB Doğal Titanyum",
      price: 52999,
      discountedPrice: 47999,
      rating: 4.8,
      reviews: 1250,
      imgs: { thumbnails: ["/images/products/product-1-bg-1.png"], previews: ["/images/products/product-1-bg-1.png"] },
      category: "elektronik",
      brand: "Apple"
    },
    {
      id: 2,
      title: "Samsung Galaxy S24 Ultra 512GB Titanyum Gri",
      price: 54999,
      discountedPrice: 48999,
      rating: 4.7,
      reviews: 890,
      imgs: { thumbnails: ["/images/products/product-2-bg-1.png"], previews: ["/images/products/product-2-bg-1.png"] },
      category: "elektronik",
      brand: "Samsung"
    },
    {
      id: 3,
      title: "MacBook Air 15\" M3 Çip 8GB RAM 256GB SSD",
      price: 36999,
      discountedPrice: 32999,
      rating: 4.9,
      reviews: 567,
      imgs: { thumbnails: ["/images/products/product-3-bg-1.png"], previews: ["/images/products/product-3-bg-1.png"] },
      category: "elektronik",
      brand: "Apple"
    }
  ];

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
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="flex items-center justify-between p-6 border-b">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Sizin İçin Önerilen Ürünler</h2>
          <p className="text-gray-600">
            {products.length > 0 ? "Admin panelinden eklenen ürünler" : "Beğenilerinize göre seçilmiş ürünler"}
          </p>
        </div>
        <Link 
          href="/kategori/tum-kategoriler" 
          className="text-orange-500 font-semibold hover:text-orange-600 transition-colors"
        >
          Tümünü Gör →
        </Link>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProducts.map((product) => (
            <div key={product.id} className="group cursor-pointer border rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative bg-gray-50 p-4">
                {/* Wishlist Button */}
                <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 hover:text-red-500 transition-colors z-10">
                  <Heart size={16} />
                </button>

                {/* Badges */}
                <div className="absolute top-2 left-2 space-y-1 z-10">
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                      %{Math.round(((product.price - product.discountedPrice) / product.price) * 100)} İndirim
                    </div>
                  )}
                  {product.brand && (
                    <div className="bg-blue-500 text-white px-2 py-1 rounded text-xs font-bold">
                      {product.brand}
                    </div>
                  )}
                </div>

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
              <div className="p-4">
                <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                  {product.title}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{product.rating || 4.5}</span>
                  </div>
                  <span className="text-xs text-gray-500">({product.reviews || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-lg font-bold text-orange-600">
                    {(product.discountedPrice || product.price).toLocaleString('tr-TR')} ₺
                  </span>
                  {product.discountedPrice && product.discountedPrice < product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {product.price.toLocaleString('tr-TR')} ₺
                    </span>
                  )}
                </div>

                {/* Add to Cart Button */}
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={16} />
                  Sepete Ekle
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RecommendedProducts;