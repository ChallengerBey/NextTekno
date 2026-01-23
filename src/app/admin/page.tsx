"use client";
import React, { useState } from "react";
import { useAdmin } from "@/app/context/AdminContext";
import { 
  TrendingUp, 
  ShoppingCart, 
  Package, 
  Users, 
  DollarSign,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  MapPin,
  Settings,
  Edit3,
  Save,
  X
} from "lucide-react";

export default function AdminDashboardPage() {
    const { orders, products } = useAdmin();
    const [isEditingHero, setIsEditingHero] = useState(false);
    const [heroContent, setHeroContent] = useState({
      title: "Premium Kulaklık",
      subtitle: "Yüksek kaliteli ses deneyimi",
      description: "En son teknoloji ile üretilmiş premium kulaklıklar"
    });

    const totalRevenue = orders.reduce((acc, order) => {
        const price = parseFloat(order.total.replace("₺", ""));
        return acc + price;
    }, 0);

    const newOrders = orders.filter(
        (order) => new Date(order.date).toDateString() === new Date().toDateString()
    ).length;

    // Mock user data
    const activeUsers = 1234;
    const newUsersToday = 24;
    const onlineUsers = 156;

    const stats = [
        {
            title: "Toplam Gelir",
            value: `₺${totalRevenue.toLocaleString('tr-TR')}`,
            change: "+12.5%",
            changeType: "increase",
            icon: <DollarSign size={24} />,
            color: "bg-green-500"
        },
        {
            title: "Toplam Sipariş",
            value: orders.length.toString(),
            change: "+8.2%",
            changeType: "increase",
            icon: <ShoppingCart size={24} />,
            color: "bg-orange-500"
        },
        {
            title: "Toplam Ürün",
            value: products.length.toString(),
            change: "+3.1%",
            changeType: "increase",
            icon: <Package size={24} />,
            color: "bg-blue-500"
        },
        {
            title: "Aktif Kullanıcı",
            value: activeUsers.toString(),
            change: "+5.7%",
            changeType: "increase",
            icon: <Users size={24} />,
            color: "bg-purple-500"
        }
    ];

    const recentOrders = orders.slice(0, 5);

    const handleSaveHero = () => {
      // Here you would typically save to database
      setIsEditingHero(false);
      // Show success message
    };

    return (
        <div className="space-y-6">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl p-6 text-white">
                <h1 className="text-3xl font-bold mb-2">Hoş Geldiniz, Admin!</h1>
                <p className="opacity-90 text-lg">NextTekno yönetim paneline hoş geldiniz. İşte bugünün özeti:</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between mb-4">
                            <div className={`${stat.color} p-3 rounded-xl text-white`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-sm font-medium ${
                                stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                            }`}>
                                {stat.changeType === 'increase' ? (
                                    <ArrowUpRight size={16} />
                                ) : (
                                    <ArrowDownRight size={16} />
                                )}
                                {stat.change}
                            </div>
                        </div>
                        <div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                            <p className="text-gray-600 text-sm">{stat.title}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Hero Section Editor */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                        <Settings className="h-5 w-5 text-orange-500" />
                        Ana Sayfa Hero Düzenle
                    </h2>
                    {!isEditingHero ? (
                        <button
                            onClick={() => setIsEditingHero(true)}
                            className="flex items-center gap-2 bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            <Edit3 size={16} />
                            Düzenle
                        </button>
                    ) : (
                        <div className="flex gap-2">
                            <button
                                onClick={handleSaveHero}
                                className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
                            >
                                <Save size={16} />
                                Kaydet
                            </button>
                            <button
                                onClick={() => setIsEditingHero(false)}
                                className="flex items-center gap-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                <X size={16} />
                                İptal
                            </button>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Ana Başlık</label>
                        {isEditingHero ? (
                            <input
                                type="text"
                                value={heroContent.title}
                                onChange={(e) => setHeroContent({...heroContent, title: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{heroContent.title}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Alt Başlık</label>
                        {isEditingHero ? (
                            <input
                                type="text"
                                value={heroContent.subtitle}
                                onChange={(e) => setHeroContent({...heroContent, subtitle: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{heroContent.subtitle}</p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Açıklama</label>
                        {isEditingHero ? (
                            <input
                                type="text"
                                value={heroContent.description}
                                onChange={(e) => setHeroContent({...heroContent, description: e.target.value})}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                        ) : (
                            <p className="text-gray-900 font-medium">{heroContent.description}</p>
                        )}
                    </div>
                </div>
            </div>

            {/* User Statistics */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5 text-orange-500" />
                    Kullanıcı İstatistikleri
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">{onlineUsers}</div>
                        <div className="text-sm text-gray-600">Şu An Online</div>
                        <div className="w-full bg-blue-200 rounded-full h-2 mt-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{width: '65%'}}></div>
                        </div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">{newUsersToday}</div>
                        <div className="text-sm text-gray-600">Bugün Kayıt Olan</div>
                        <div className="text-xs text-green-600 mt-1">+15% geçen haftaya göre</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{activeUsers}</div>
                        <div className="text-sm text-gray-600">Toplam Aktif Kullanıcı</div>
                        <div className="text-xs text-purple-600 mt-1">Son 30 gün içinde aktif</div>
                    </div>
                </div>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-xl font-semibold text-gray-800">Son Siparişler</h2>
                        <button className="text-orange-500 text-sm font-medium hover:text-orange-600 transition-colors">
                            Tümünü Gör
                        </button>
                    </div>
                    <div className="space-y-4">
                        {recentOrders.map((order, index) => (
                            <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                                        <ShoppingCart size={20} className="text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">#{order.id}</p>
                                        <p className="text-sm text-gray-600">{order.customer}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="font-bold text-gray-800">{order.total}</p>
                                    <p className="text-sm text-gray-600">{order.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">Hızlı İşlemler</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex flex-col items-center p-6 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group">
                            <Package size={32} className="text-orange-600 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-800">Ürün Ekle</span>
                        </button>
                        <button className="flex flex-col items-center p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group">
                            <Eye size={32} className="text-blue-600 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-800">Siparişleri Gör</span>
                        </button>
                        <button className="flex flex-col items-center p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors group">
                            <TrendingUp size={32} className="text-green-600 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-800">Raporlar</span>
                        </button>
                        <button className="flex flex-col items-center p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors group">
                            <MapPin size={32} className="text-purple-600 mb-3 group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-medium text-gray-800">Konum Yönetimi</span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Today's Summary */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <div className="flex items-center gap-2 mb-6">
                    <Calendar size={24} className="text-orange-500" />
                    <h2 className="text-xl font-semibold text-gray-800">Bugünün Özeti</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="text-center p-4 bg-orange-50 rounded-xl">
                        <div className="text-3xl font-bold text-orange-600 mb-2">{newOrders}</div>
                        <div className="text-sm text-gray-600">Yeni Sipariş</div>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-xl">
                        <div className="text-3xl font-bold text-blue-600 mb-2">₺{(totalRevenue * 0.1).toLocaleString('tr-TR')}</div>
                        <div className="text-sm text-gray-600">Bugünkü Gelir</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-xl">
                        <div className="text-3xl font-bold text-green-600 mb-2">{newUsersToday}</div>
                        <div className="text-sm text-gray-600">Yeni Müşteri</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-xl">
                        <div className="text-3xl font-bold text-purple-600 mb-2">{onlineUsers}</div>
                        <div className="text-sm text-gray-600">Online Ziyaretçi</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
