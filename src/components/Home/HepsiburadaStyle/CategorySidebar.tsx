"use client";
import React, { useState } from "react";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getAllCategories } from "@/lib/database";

const CategorySidebar = () => {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const categories = getAllCategories();

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b bg-orange-50">
        <h3 className="font-semibold text-gray-800">Kategoriler</h3>
      </div>
      
      <div className="relative">
        {categories.map((category) => (
          <div
            key={category.id}
            className="relative"
            onMouseEnter={() => setHoveredCategory(category.id)}
            onMouseLeave={() => setHoveredCategory(null)}
          >
            <Link
              href={`/kategori/${category.slug}`}
              className="flex items-center justify-between p-3 hover:bg-orange-50 hover:text-orange-600 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-xl">
                  {category.id === 'electronics' && '📱'}
                  {category.id === 'fashion' && '👕'}
                  {category.id === 'home-living' && '🏠'}
                  {category.id === 'supermarket' && '🛒'}
                  {category.id === 'books' && '📚'}
                  {category.id === 'sports-outdoor' && '⚽'}
                </span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
              <ChevronRight size={16} className="text-gray-400" />
            </Link>

            {/* Subcategory Dropdown */}
            {hoveredCategory === category.id && category.children && (
              <div className="absolute left-full top-0 w-64 bg-white border shadow-lg rounded-lg z-50 ml-1">
                <div className="p-4">
                  <h4 className="font-semibold text-gray-800 mb-3">{category.name}</h4>
                  <div className="space-y-2">
                    {category.children.map((sub) => (
                      <Link
                        key={sub.id}
                        href={`/kategori/${sub.slug}`}
                        className="block text-sm text-gray-600 hover:text-orange-600 hover:bg-orange-50 p-2 rounded transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/kategori/${category.slug}`}
                    className="block text-sm text-orange-600 font-medium mt-3 pt-3 border-t"
                  >
                    Tümünü Gör →
                  </Link>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Special Offers */}
      <div className="p-4 border-t bg-gradient-to-r from-red-50 to-orange-50">
        <Link href="/flash-sales" className="block">
          <div className="text-center">
            <div className="text-red-500 font-bold text-lg">⚡ Flaş Ürünler</div>
            <div className="text-sm text-gray-600">Sınırlı süre!</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default CategorySidebar;