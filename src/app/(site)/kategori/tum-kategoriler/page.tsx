"use client";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tüm Kategoriler | NextTekno - Teknoloji Ürünleri",
  description: "NextTekno'da tüm teknoloji kategorilerini keşfedin. iPhone, Samsung, laptop, tablet, kulaklık ve daha fazlası. En uygun fiyatlar, ücretsiz kargo!",
  keywords: [
    "teknoloji kategorileri",
    "elektronik ürünler",
    "iPhone kategorisi",
    "Samsung kategorisi", 
    "laptop kategorisi",
    "tablet kategorisi",
    "kulaklık kategorisi",
    "akıllı saat kategorisi",
    "oyun konsolu kategorisi",
    "NextTekno kategoriler"
  ],
  openGraph: {
    title: "Tüm Kategoriler | NextTekno",
    description: "Tüm teknoloji kategorilerini keşfedin. En uygun fiyatlar!",
    url: 'https://nexttekno.com/kategori/tum-kategoriler',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tüm Kategoriler | NextTekno",
    description: "Tüm teknoloji kategorilerini keşfedin. En uygun fiyatlar!",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: '/kategori/tum-kategoriler',
  },
};
import React from "react";
import { getAllCategories } from "@/lib/database";
import HepsiburadaHeader from "@/components/Home/HepsiburadaStyle/HepsiburadaHeader";
import { ChevronRight } from "lucide-react";

const AllCategoriesPage = () => {
  const categories = getAllCategories();

  return (
    <div className="min-h-screen bg-gray-100">
      <HepsiburadaHeader />
      
      <div className="max-w-[1200px] mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <nav className="mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <a href="/" className="hover:text-orange-500">Ana Sayfa</a>
            <span>/</span>
            <span className="text-orange-500 font-medium">Tüm Kategoriler</span>
          </div>
        </nav>

        {/* Page Header */}
        <div className="bg-white rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Tüm Kategoriler</h1>
          <p className="text-gray-600">Aradığınız ürünü kolayca bulun</p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg shadow-sm border hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">{category.name}</h2>
                  <span className="text-sm text-gray-500">{category.productCount} ürün</span>
                </div>
                
                {/* Subcategories */}
                {category.children && category.children.length > 0 && (
                  <div className="space-y-2">
                    {category.children.slice(0, 6).map((subcat) => (
                      <a
                        key={subcat.id}
                        href={`/kategori/${subcat.slug}`}
                        className="flex items-center justify-between p-2 hover:bg-orange-50 rounded-lg transition-colors group"
                      >
                        <span className="text-gray-700 group-hover:text-orange-600">{subcat.name}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-gray-500">{subcat.productCount}</span>
                          <ChevronRight size={14} className="text-gray-400 group-hover:text-orange-500" />
                        </div>
                      </a>
                    ))}
                    
                    {category.children.length > 6 && (
                      <a
                        href={`/kategori/${category.slug}`}
                        className="block text-center text-orange-500 font-medium py-2 hover:text-orange-600"
                      >
                        +{category.children.length - 6} kategori daha
                      </a>
                    )}
                  </div>
                )}
                
                {/* View All Button */}
                <div className="mt-4 pt-4 border-t">
                  <a
                    href={`/kategori/${category.slug}`}
                    className="block w-full text-center bg-orange-500 text-white py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    Tüm {category.name} Ürünlerini Gör
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Popular Categories */}
        <div className="mt-8 bg-white rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Popüler Kategoriler</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {[
              { name: "Telefon", slug: "telefon-aksesuar", count: 450 },
              { name: "Laptop", slug: "bilgisayar-tablet", count: 320 },
              { name: "Kulaklık", slug: "ses-goruntu", count: 280 },
              { name: "Akıllı Saat", slug: "akilli-saat", count: 180 },
              { name: "Oyun Konsolu", slug: "oyun-konsol", count: 220 },
              { name: "TV", slug: "tv-ses-sistemleri", count: 160 }
            ].map((item) => (
              <a
                key={item.slug}
                href={`/kategori/${item.slug}`}
                className="text-center p-4 bg-gray-50 rounded-lg hover:bg-orange-50 hover:text-orange-600 transition-colors"
              >
                <div className="text-2xl mb-2">📱</div>
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-xs text-gray-500">{item.count} ürün</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllCategoriesPage;