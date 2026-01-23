"use client";
import React, { useState } from "react";
import { Search, Bell, User, Settings, LogOut } from "lucide-react";
import { useAdmin } from "@/app/context/AdminContext";

const Header = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [showNotifications, setShowNotifications] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const { logout } = useAdmin();

    const notifications = [
        { id: 1, message: "Yeni sipariş alındı", time: "2 dk önce", type: "order" },
        { id: 2, message: "Stok azaldı: iPhone 15", time: "5 dk önce", type: "stock" },
        { id: 3, message: "Yeni müşteri kaydı", time: "10 dk önce", type: "user" }
    ];

    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
            <div className="flex items-center justify-between px-6 py-4">
                {/* Search Bar */}
                <div className="flex-1 max-w-md">
                    <div className="relative">
                        <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Ürün, sipariş veya müşteri ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                        />
                    </div>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-4">
                    {/* Notifications */}
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="p-2 text-gray-600 hover:text-orange-500 hover:bg-gray-100 rounded-lg transition-colors relative"
                        >
                            <Bell size={20} />
                            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                3
                            </span>
                        </button>

                        {/* Notifications Dropdown */}
                        {showNotifications && (
                            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-4 border-b border-gray-200">
                                    <h3 className="font-semibold text-gray-800">Bildirimler</h3>
                                </div>
                                <div className="max-h-64 overflow-y-auto">
                                    {notifications.map((notification) => (
                                        <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                                            <p className="text-sm text-gray-800">{notification.message}</p>
                                            <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-4 text-center">
                                    <button className="text-orange-500 text-sm font-medium hover:text-orange-600">
                                        Tümünü Gör
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* User Menu */}
                    <div className="relative">
                        <button
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                                <User size={16} className="text-white" />
                            </div>
                            <div className="hidden md:block text-left">
                                <p className="text-sm font-medium text-gray-800">Admin</p>
                                <p className="text-xs text-gray-500">Yönetici</p>
                            </div>
                        </button>

                        {/* User Dropdown */}
                        {showUserMenu && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                                <div className="p-2">
                                    <button className="w-full flex items-center gap-2 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                                        <Settings size={16} />
                                        Ayarlar
                                    </button>
                                    <button 
                                        onClick={logout}
                                        className="w-full flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    >
                                        <LogOut size={16} />
                                        Çıkış Yap
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
