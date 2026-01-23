"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  Plus,
  List,
  TrendingUp,
  MapPin
} from "lucide-react";
import { useAdmin } from "@/app/context/AdminContext";

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  const { logout } = useAdmin();

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      href: "/admin",
      active: pathname === "/admin"
    },
    {
      title: "Ürünler",
      icon: <Package size={20} />,
      href: "/admin/products",
      active: pathname.startsWith("/admin/products"),
      submenu: [
        {
          title: "Tüm Ürünler",
          icon: <List size={16} />,
          href: "/admin/products"
        },
        {
          title: "Ürün Ekle",
          icon: <Plus size={16} />,
          href: "/admin/products/add"
        }
      ]
    },
    {
      title: "Siparişler",
      icon: <ShoppingCart size={20} />,
      href: "/admin/orders",
      active: pathname === "/admin/orders"
    },
    {
      title: "Müşteriler",
      icon: <Users size={20} />,
      href: "/admin/customers",
      active: pathname === "/admin/customers"
    },
    {
      title: "Kampanyalar",
      icon: <TrendingUp size={20} />,
      href: "/admin/campaigns",
      active: pathname === "/admin/campaigns"
    },
    {
      title: "Raporlar",
      icon: <BarChart3 size={20} />,
      href: "/admin/reports",
      active: pathname === "/admin/reports"
    },
    {
      title: "Konum Yönetimi",
      icon: <MapPin size={20} />,
      href: "/admin/locations",
      active: pathname === "/admin/locations"
    },
    {
      title: "Ayarlar",
      icon: <Settings size={20} />,
      href: "/admin/settings",
      active: pathname === "/admin/settings"
    }
  ];

  return (
    <div className={`bg-white shadow-lg transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'} flex flex-col h-screen`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">NT</span>
              </div>
              <span className="font-bold text-gray-800">NextTekno Admin</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
          </button>
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => (
          <div key={index}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                item.active 
                  ? 'bg-orange-500 text-white' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              {item.icon}
              {!collapsed && <span className="font-medium">{item.title}</span>}
            </Link>
            
            {/* Submenu */}
            {item.submenu && !collapsed && item.active && (
              <div className="ml-6 mt-2 space-y-1">
                {item.submenu.map((subItem, subIndex) => (
                  <Link
                    key={subIndex}
                    href={subItem.href}
                    className="flex items-center gap-2 px-3 py-1 text-sm text-gray-600 hover:text-orange-500 transition-colors"
                  >
                    {subItem.icon}
                    {subItem.title}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut size={20} />
          {!collapsed && <span className="font-medium">Çıkış Yap</span>}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
