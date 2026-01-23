"use client";
import React from "react";
import Link from "next/link";

const categories = [
  {
    id: 1,
    name: "Telefon",
    image: "/images/categories/categories-01.png",
    productCount: 1250,
    href: "/category/telefon"
  },
  {
    id: 2,
    name: "Laptop",
    image: "/images/categories/categories-02.png",
    productCount: 890,
    href: "/category/laptop"
  },
  {
    id: 3,
    name: "Kulaklık",
    image: "/images/categories/categories-03.png",
    productCount: 567,
    href: "/category/kulaklik"
  },
  {
    id: 4,
    name: "Akıllı Saat",
    image: "/images/categories/categories-04.png",
    productCount: 432,
    href: "/category/akilli-saat"
  },
  {
    id: 5,
    name: "Tablet",
    image: "/images/categories/categories-05.png",
    productCount: 321,
    href: "/category/tablet"
  },
  {
    id: 6,
    name: "Kamera",
    image: "/images/categories/categories-06.png",
    productCount: 198,
    href: "/category/kamera"
  }
];

const PopularCategories = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border mb-6">
      <div className="p-6 border-b">
        <h2 className="text-xl font-bold text-gray-800">Popüler Kategoriler</h2>
        <p className="text-gray-600">En çok tercih edilen ürün kategorileri</p>
      </div>
      
      <div className="p-6">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={category.href}
              className="group text-center"
            >
              <div className="bg-gray-50 rounded-lg p-6 mb-3 group-hover:bg-orange-50 transition-colors">
                <div className="aspect-square flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>
              </div>
              <h3 className="font-semibold text-gray-800 group-hover:text-orange-600 transition-colors">
                {category.name}
              </h3>
              <p className="text-sm text-gray-500">
                {category.productCount} ürün
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularCategories;