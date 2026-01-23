"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, Heart, User, MapPin, Truck } from "lucide-react";
import AddressModal from "@/components/Common/AddressModal";

const HepsiburadaHeader = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState("Teslimat adresi seçin");
  const pathname = usePathname();

  // Active link kontrolü için fonksiyon
  const isActiveLink = (href: string) => {
    if (href === '/flash-sales') {
      return pathname === '/flash-sales';
    }
    if (href.startsWith('/kategori/')) {
      return pathname === href;
    }
    return pathname === href;
  };

  const handleAddressSelect = (address: any) => {
    setSelectedAddress(`${address.district}, ${address.city}`);
  };

  return (
    <>
      <header className="bg-white shadow-sm">
        {/* Top Bar - Orange */}
        <div className="bg-orange-500 text-white text-sm py-2">
          <div className="max-w-[1200px] mx-auto px-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <Truck size={14} />
                Ücretsiz Kargo
              </span>
              <span>15:00'a kadar verilen siparişler aynı gün kargoda</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/seller" className="hover:underline">Satıcı Ol</Link>
              <Link href="/help" className="hover:underline">Yardım</Link>
            </div>
          </div>
        </div>

        {/* Main Header - White */}
        <div className="bg-white py-4">
          <div className="max-w-[1200px] mx-auto px-4">
            <div className="flex items-center gap-6">
              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <div className="text-3xl font-bold text-orange-500">
                  NextTekno
                </div>
              </Link>

              {/* Location */}
              <div className="hidden md:flex items-center gap-2 text-sm text-gray-600">
                <MapPin size={16} />
                <span>Teslimat Adresi</span>
                <button 
                  onClick={() => setShowAddressModal(true)}
                  className="text-orange-500 font-medium underline hover:text-orange-600 max-w-[150px] truncate"
                >
                  {selectedAddress}
                </button>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-2xl">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Ürün, kategori veya marka ara"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-orange-500 rounded-lg focus:outline-none focus:border-orange-600 text-gray-700"
                  />
                  <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-orange-500 text-white p-2 rounded-md hover:bg-orange-600">
                    <Search size={20} />
                  </button>
                </div>
              </div>

              {/* Right Side Icons */}
              <div className="flex items-center gap-6">
                {/* User Account */}
                <Link href="/signin" className="flex flex-col items-center text-gray-600 hover:text-orange-500">
                  <User size={24} />
                  <span className="text-xs mt-1">Giriş Yap</span>
                </Link>

                {/* Favorites */}
                <Link href="/wishlist" className="flex flex-col items-center text-gray-600 hover:text-orange-500 relative">
                  <Heart size={24} />
                  <span className="text-xs mt-1">Favorilerim</span>
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>

                {/* Cart */}
                <Link href="/cart" className="flex flex-col items-center text-gray-600 hover:text-orange-500 relative">
                  <ShoppingCart size={24} />
                  <span className="text-xs mt-1">Sepetim</span>
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="bg-white border-t border-gray-200">
          <div className="max-w-[1200px] mx-auto px-4">
            <nav className="flex items-center gap-8 py-3 text-sm">
              <Link 
                href="/kategori/tum-kategoriler" 
                className={`font-medium transition-colors ${
                  isActiveLink('/kategori/tum-kategoriler') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Tüm Kategoriler
              </Link>
              <Link 
                href="/flash-sales" 
                className={`font-medium transition-colors ${
                  isActiveLink('/flash-sales') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Flaş Ürünler
              </Link>
              <Link 
                href="/kategori/elektronik" 
                className={`transition-colors ${
                  isActiveLink('/kategori/elektronik') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Elektronik
              </Link>
              <Link 
                href="/kategori/moda" 
                className={`transition-colors ${
                  isActiveLink('/kategori/moda') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Moda
              </Link>
              <Link 
                href="/kategori/ev-yasam" 
                className={`transition-colors ${
                  isActiveLink('/kategori/ev-yasam') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Ev & Yaşam
              </Link>
              <Link 
                href="/kategori/supermarket" 
                className={`transition-colors ${
                  isActiveLink('/kategori/supermarket') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Süpermarket
              </Link>
              <Link 
                href="/kategori/kitap" 
                className={`transition-colors ${
                  isActiveLink('/kategori/kitap') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Kitap
              </Link>
              <Link 
                href="/kategori/spor-outdoor" 
                className={`transition-colors ${
                  isActiveLink('/kategori/spor-outdoor') 
                    ? 'text-orange-500' 
                    : 'text-gray-700 hover:text-orange-500'
                }`}
              >
                Spor & Outdoor
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Address Modal */}
      <AddressModal 
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={handleAddressSelect}
      />
    </>
  );
};

export default HepsiburadaHeader;