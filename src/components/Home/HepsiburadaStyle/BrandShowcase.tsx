"use client";
import React from "react";
import Link from "next/link";

const brands = [
  {
    id: 1,
    name: "Apple",
    logo: "/images/brands/apple.png",
    href: "/brand/apple",
    description: "iPhone, iPad, MacBook ve daha fazlası"
  },
  {
    id: 2,
    name: "Samsung",
    logo: "/images/brands/samsung.png", 
    href: "/brand/samsung",
    description: "Galaxy serisi telefon ve tablet"
  },
  {
    id: 3,
    name: "Xiaomi",
    logo: "/images/brands/xiaomi.png",
    href: "/brand/xiaomi",
    description: "Akıllı telefon ve teknoloji ürünleri"
  },
  {
    id: 4,
    name: "Sony",
    logo: "/images/brands/sony.png",
    href: "/brand/sony",
    description: "Kulaklık, kamera ve oyun konsolu"
  },
  {
    id: 5,
    name: "Huawei",
    logo: "/images/brands/huawei.png",
    href: "/brand/huawei",
    description: "Telefon, tablet ve akıllı saat"
  },
  {
    id: 6,
    name: "LG",
    logo: "/images/brands/lg.png",
    href: "/brand/lg",
    description: "TV, monitör ve ev aletleri"
  }
];

const BrandShowcase = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Popüler Markalar</h2>
        <p className="text-gray-600">En sevilen markaların ürünlerini keşfedin</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Link
              key={brand.id}
              href={brand.href}
              className="group text-center p-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="bg-white border rounded-lg p-6 mb-3 group-hover:shadow-md transition-shadow">
                <div className="aspect-square flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-2xl font-bold text-gray-600">
                      {brand.name.charAt(0)}
                    </span>
                  </div>
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors mb-1">
                {brand.name}
              </h3>
              <p className="text-xs text-gray-500 line-clamp-2">
                {brand.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrandShowcase;