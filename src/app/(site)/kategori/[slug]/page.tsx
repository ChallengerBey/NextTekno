"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { findCategoryBySlug, getProductsByCategory, Category, Product } from "@/lib/database";
import HepsiburadaHeader from "@/components/Home/HepsiburadaStyle/HepsiburadaHeader";
import CategorySEO from "@/components/SEO/CategorySEO";
import { Star, ShoppingCart, Heart, Filter, Grid, List } from "lucide-react";

const CategoryPage = () => {
  const params = useParams();
  const slug = params.slug as string;
  
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [priceRange, setPriceRange] = useState([0, 100000]);

  useEffect(() => {
    const foundCategory = findCategoryBySlug(slug);
    const categoryProducts = getProductsByCategory(slug);
    
    setCategory(foundCategory);
    setProducts(categoryProducts);
  }, [slug]);

  if (!category) {
    return (
      <div className="min-h-screen bg-gray-100">
        <HepsiburadaHeader />
        <div className="max-w-[1200px] mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Kategori Bulunamadı</h1>
            <p className="text-gray-600">Aradığınız kategori mevcut değil.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <CategorySEO category={category} productCount={products.length} />
      <HepsiburadaHeader />
      
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-orange-500">Ana Sayfa</a>
            <span>/</span>
            <span className="text-orange-500 font-medium">{category.name}</span>
          </div>
        </nav>

        {/* Category Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <p className="text-gray-600">{category.productCount} ürün bulundu</p>
          
          {/* Subcategories */}
          {category.children && category.children.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Alt Kategoriler</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {category.children.map((subcat) => (
                  <a
                    key={subcat.id}
                    href={`/kategori/${subcat.slug}`}
                    className="bg-gray-50 p-4 rounded-lg hover:bg-orange-50 hover:border-orange-200 border border-gray-200 transition-colors"
                  >
                    <h4 className="font-medium text-gray-800">{subcat.name}</h4>
                    <p className="text-sm text-gray-600">{subcat.productCount} ürün</p>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-6">
          {/* Filters Sidebar */}
          <div className="w-64 hidden lg:block">
            <div className="bg-white rounded-lg p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Filter size={20} />
                Filtreler
              </h3>
              
              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Fiyat Aralığı</h4>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="100000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-sm">
                    <input 
                      type="number" 
                      value={priceRange[0]} 
                      onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">-</span>
                    <input 
                      type="number" 
                      value={priceRange[1]} 
                      onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                      className="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Marka</h4>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {['Apple', 'Samsung', 'Xiaomi', 'Sony', 'LG', 'Huawei', 'OnePlus', 'Google'].map((brand) => (
                    <label key={brand} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                      <span className="text-sm text-gray-700">{brand}</span>
                      <span className="text-xs text-gray-500 ml-auto">(12)</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-800 mb-3">Değerlendirme</h4>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                      <input type="checkbox" className="rounded border-gray-300 text-orange-500 focus:ring-orange-500" />
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                          />
                        ))}
                        <span className="text-sm text-gray-700 ml-1">{rating} ve üzeri</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Clear Filters */}
              <button className="w-full bg-gray-100 text-gray-700 py-2 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                Filtreleri Temizle
              </button>
            </div>
          </div>

          {/* Products Area */}
          <div className="flex-1">
            {/* Sort and View Controls */}
            <div className="bg-white rounded-lg shadow-sm border mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4">
                {/* Left Side - Sort Options */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full sm:w-auto">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-700 whitespace-nowrap">Sırala:</span>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 min-w-[160px]"
                      >
                        <option value="popular">🔥 En Popüler</option>
                        <option value="price-low">💰 Fiyat (Düşük-Yüksek)</option>
                        <option value="price-high">💎 Fiyat (Yüksek-Düşük)</option>
                        <option value="newest">✨ En Yeni</option>
                        <option value="rating">⭐ En Yüksek Puan</option>
                        <option value="discount">🏷️ En Çok İndirim</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Results Count */}
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">{products.length}</span> ürün listeleniyor
                  </div>
                </div>
                
                {/* Right Side - View Mode & Filter Toggle */}
                <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                  {/* Mobile Filter Button */}
                  <button className="lg:hidden flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                    <Filter size={16} />
                    <span className="text-sm font-medium">Filtrele</span>
                  </button>

                  {/* View Mode Buttons */}
                  <div className="flex items-center bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                        viewMode === 'grid' 
                          ? 'bg-orange-500 text-white shadow-sm' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <Grid size={16} />
                      <span className="text-sm font-medium hidden sm:inline">Izgara</span>
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 ${
                        viewMode === 'list' 
                          ? 'bg-orange-500 text-white shadow-sm' 
                          : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <List size={16} />
                      <span className="text-sm font-medium hidden sm:inline">Liste</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Mobile Sort Pills */}
              <div className="block sm:hidden px-4 pb-4">
                <div className="flex gap-2 overflow-x-auto pb-2">
                  {[
                    { value: 'popular', label: '🔥 Popüler', color: 'bg-red-100 text-red-700' },
                    { value: 'price-low', label: '💰 Ucuz', color: 'bg-green-100 text-green-700' },
                    { value: 'newest', label: '✨ Yeni', color: 'bg-blue-100 text-blue-700' },
                    { value: 'rating', label: '⭐ Puan', color: 'bg-yellow-100 text-yellow-700' },
                    { value: 'discount', label: '🏷️ İndirim', color: 'bg-purple-100 text-purple-700' }
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setSortBy(option.value)}
                      className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-all whitespace-nowrap ${
                        sortBy === option.value 
                          ? 'bg-orange-500 text-white shadow-sm' 
                          : `${option.color} hover:scale-105`
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {products.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6" 
                : "space-y-4"
              }>
                {products.map((product) => (
                  <div key={product.id} className={`bg-white rounded-lg shadow-sm border hover:shadow-lg transition-all duration-300 group ${
                    viewMode === 'list' ? 'flex gap-4 p-4' : 'overflow-hidden'
                  }`}>
                    {/* Product Image */}
                    <div className={`relative ${viewMode === 'list' ? 'w-32 sm:w-48 flex-shrink-0' : 'aspect-square bg-gray-50 p-4'}`}>
                      {/* Badges */}
                      <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
                        {product.discount && (
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            %{product.discount} İndirim
                          </span>
                        )}
                        {product.isFlashSale && (
                          <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                            ⚡ Flaş
                          </span>
                        )}
                      </div>

                      {/* Wishlist Button */}
                      <button className="absolute top-2 right-2 z-10 p-2 bg-white rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-50 hover:text-red-500">
                        <Heart size={16} />
                      </button>

                      {/* Product Image Placeholder */}
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                        <span className="text-4xl">📱</span>
                      </div>

                      {/* Quick View Overlay */}
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <button className="bg-white text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                          Hızlı Görünüm
                        </button>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className={`${viewMode === 'list' ? 'flex-1 flex flex-col justify-between' : 'p-4'}`}>
                      <div>
                        <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {product.name}
                        </h3>
                        
                        {/* Brand */}
                        <div className="text-xs text-gray-500 mb-2">
                          <span className="bg-gray-100 px-2 py-1 rounded-full">{product.brand}</span>
                        </div>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-3">
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                size={12} 
                                className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"} 
                              />
                            ))}
                            <span className="text-sm font-medium ml-1">{product.rating}</span>
                          </div>
                          <span className="text-xs text-gray-500">({product.reviewCount})</span>
                        </div>

                        {/* Features */}
                        {viewMode === 'list' && product.features && (
                          <div className="mb-3">
                            <div className="flex flex-wrap gap-1">
                              {product.features.slice(0, 3).map((feature, index) => (
                                <span key={index} className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>

                      <div>
                        {/* Price */}
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-lg font-bold text-orange-600">
                            ₺{product.price.toLocaleString('tr-TR')}
                          </span>
                          {product.originalPrice && (
                            <div className="flex flex-col">
                              <span className="text-sm text-gray-500 line-through">
                                ₺{product.originalPrice.toLocaleString('tr-TR')}
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Stock Info */}
                        <div className="mb-4">
                          <div className="flex items-center gap-2 text-xs">
                            <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-yellow-500' : 'bg-red-500'}`}></div>
                            <span className={product.stock > 10 ? 'text-green-600' : product.stock > 0 ? 'text-yellow-600' : 'text-red-600'}>
                              {product.stock > 10 ? 'Stokta' : product.stock > 0 ? `${product.stock} adet kaldı` : 'Stokta yok'}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className={`flex gap-2 ${viewMode === 'list' ? 'flex-row' : 'flex-col sm:flex-row'}`}>
                          <button className="flex-1 bg-orange-500 text-white py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors flex items-center justify-center gap-2 font-medium">
                            <ShoppingCart size={16} />
                            <span className="hidden sm:inline">Sepete Ekle</span>
                            <span className="sm:hidden">Sepet</span>
                          </button>
                          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 hover:border-orange-300 transition-colors">
                            <Heart size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-lg p-8 text-center">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">📦</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Bu kategoride henüz ürün bulunmuyor</h3>
                <p className="text-gray-600 mb-4">Yakında yeni ürünler eklenecek.</p>
                <button className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors">
                  Diğer Kategorilere Göz At
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;