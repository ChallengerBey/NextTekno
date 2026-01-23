"use client";
import React from "react";
import Link from "next/link";
import { Zap, Gift, Truck, Shield, Headphones, CreditCard } from "lucide-react";

const quickAccessItems = [
  {
    id: 1,
    title: "Flaş Ürünler",
    subtitle: "Sınırlı süre",
    icon: <Zap size={32} />,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    href: "/flash-sales"
  },
  {
    id: 2,
    title: "Hediye Kartı",
    subtitle: "Sevdiklerinize",
    icon: <Gift size={32} />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    href: "/gift-cards"
  },
  {
    id: 3,
    title: "Ücretsiz Kargo",
    subtitle: "150₺ ve üzeri",
    icon: <Truck size={32} />,
    color: "text-green-500",
    bgColor: "bg-green-50",
    href: "/free-shipping"
  },
  {
    id: 4,
    title: "Taksit İmkanı",
    subtitle: "12 aya varan",
    icon: <CreditCard size={32} />,
    color: "text-purple-500",
    bgColor: "bg-purple-50",
    href: "/installments"
  },
  {
    id: 5,
    title: "Güvenli Alışveriş",
    subtitle: "SSL sertifikalı",
    icon: <Shield size={32} />,
    color: "text-orange-500",
    bgColor: "bg-orange-50",
    href: "/security"
  },
  {
    id: 6,
    title: "7/24 Destek",
    subtitle: "Canlı yardım",
    icon: <Headphones size={32} />,
    color: "text-blue-500",
    bgColor: "bg-blue-50",
    href: "/support"
  }
];

const QuickAccess = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm border mb-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-0 divide-x divide-gray-200">
        {quickAccessItems.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className="flex flex-col items-center text-center p-6 hover:bg-gray-50 transition-colors group"
          >
            <div className={`${item.bgColor} ${item.color} p-4 rounded-full mb-3 group-hover:scale-110 transition-transform`}>
              {item.icon}
            </div>
            <h3 className="font-semibold text-gray-800 text-sm mb-1">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickAccess;