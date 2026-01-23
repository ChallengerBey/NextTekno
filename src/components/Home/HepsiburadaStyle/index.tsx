"use client";
import React from "react";
import CategorySidebar from "./CategorySidebar";
import MainSlider from "./MainSlider";
import QuickAccess from "./QuickAccess";
import FlashSales from "./FlashSales";
import PopularCategories from "./PopularCategories";
import RecommendedProducts from "./RecommendedProducts";
import BrandShowcase from "./BrandShowcase";
import HepsiburadaHeader from "./HepsiburadaHeader";

const HepsiburadaHome = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <HepsiburadaHeader />
      
      {/* Main Content */}
      <div className="max-w-[1200px] mx-auto px-4 py-4">
        <div className="flex gap-4">
          {/* Left Sidebar - Categories */}
          <div className="w-64 hidden lg:block">
            <CategorySidebar />
          </div>
          
          {/* Main Content Area */}
          <div className="flex-1">
            {/* Hero Section with Blue Headphone */}
            <div className="bg-white rounded-lg shadow-sm mb-4 p-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Premium Kulaklık
                  </h1>
                  <p className="text-xl text-gray-600 mb-6">
                    Yüksek kaliteli ses deneyimi
                  </p>
                  <button className="bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors">
                    İncele
                  </button>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="w-80 h-80 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center">
                    <div className="w-64 h-64 bg-blue-600 rounded-full flex items-center justify-center relative">
                      {/* Headphone Icon */}
                      <div className="text-white text-8xl">🎧</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Access Icons */}
            <QuickAccess />
            
            {/* Flash Sales */}
            <FlashSales />
            
            {/* Popular Categories */}
            <PopularCategories />
            
            {/* Recommended Products */}
            <RecommendedProducts />
            
            {/* Brand Showcase */}
            <BrandShowcase />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HepsiburadaHome;