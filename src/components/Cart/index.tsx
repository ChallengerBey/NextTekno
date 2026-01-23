"use client";
import React from "react";
import Discount from "./Discount";
import OrderSummary from "./OrderSummary";
import { useAppSelector } from "@/redux/store";
import SingleItem from "./SingleItem";
import Link from "next/link";
import { ShoppingCart, ArrowLeft, Trash2 } from "lucide-react";

const Cart = () => {
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  return (
    <>
      {cartItems.length > 0 ? (
        <section className="min-h-screen bg-gray-50 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <Link 
                  href="/"
                  className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5" />
                  Alışverişe Devam Et
                </Link>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Sepetim</h1>
                  <p className="text-gray-600 mt-1">{cartItems.length} ürün</p>
                </div>
                <button className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors">
                  <Trash2 className="h-5 w-5" />
                  Sepeti Temizle
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                  {/* Table Header - Hidden on mobile */}
                  <div className="hidden md:flex items-center py-4 px-6 bg-gray-50 border-b border-gray-200">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700">Ürün</p>
                    </div>
                    <div className="w-32 text-center">
                      <p className="text-sm font-medium text-gray-700">Fiyat</p>
                    </div>
                    <div className="w-32 text-center">
                      <p className="text-sm font-medium text-gray-700">Adet</p>
                    </div>
                    <div className="w-32 text-center">
                      <p className="text-sm font-medium text-gray-700">Toplam</p>
                    </div>
                    <div className="w-16"></div>
                  </div>

                  {/* Cart Items */}
                  <div className="divide-y divide-gray-200">
                    {cartItems.map((item, key) => (
                      <SingleItem item={item} key={key} />
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="sticky top-8 space-y-6">
                  <Discount />
                  <OrderSummary />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
          <div className="text-center max-w-md mx-auto">
            {/* Empty Cart Icon */}
            <div className="mx-auto w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-8">
              <ShoppingCart className="h-16 w-16 text-orange-300" />
            </div>

            {/* Empty Cart Message */}
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Sepetiniz Boş
            </h2>
            <p className="text-gray-600 mb-8">
              Henüz sepetinize ürün eklemediniz. Alışverişe başlamak için aşağıdaki butona tıklayın.
            </p>

            {/* Continue Shopping Button */}
            <Link
              href="/kategori/tum-kategoriler"
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-4 rounded-xl font-medium hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <ShoppingCart className="h-5 w-5" />
              Alışverişe Başla
            </Link>

            {/* Popular Categories */}
            <div className="mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Popüler Kategoriler</h3>
              <div className="grid grid-cols-2 gap-4">
                <Link
                  href="/kategori/elektronik"
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-orange-600 text-xl">📱</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Elektronik</p>
                  </div>
                </Link>
                <Link
                  href="/kategori/moda"
                  className="p-4 bg-white rounded-xl border border-gray-200 hover:border-orange-300 hover:shadow-md transition-all duration-200"
                >
                  <div className="text-center">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                      <span className="text-orange-600 text-xl">👕</span>
                    </div>
                    <p className="text-sm font-medium text-gray-700">Moda</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Cart;
