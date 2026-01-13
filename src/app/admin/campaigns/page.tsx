"use client";
import React, { useState } from "react";
import { useAdmin, Promo } from "@/app/context/AdminContext";
import { CreditCard, Megaphone, Trash2, Edit2, Plus, ArrowRight } from "lucide-react";

const AdminCampaignsPage = () => {
    const { promos, addPromo, updatePromo, deletePromo } = useAdmin();
    const [isEditing, setIsEditing] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<Promo>>({
        title: "",
        badge: "",
        description: "",
        buttonText: "Hemen Al",
        buttonUrl: "/shop",
        style: "blue",
        type: "product",
        location: "hero",
        imageUrl: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing) {
            updatePromo({ ...formData, id: isEditing } as Promo);
            setIsEditing(null);
        } else {
            addPromo({ ...formData, id: Date.now().toString() } as Promo);
        }
        setFormData({
            title: "",
            badge: "",
            description: "",
            buttonText: "Hemen Al",
            buttonUrl: "/shop",
            style: "blue",
            type: "product",
            location: "hero",
            imageUrl: ""
        });
    };

    const handleEdit = (promo: Promo) => {
        setIsEditing(promo.id);
        setFormData(promo);
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-dark">Kampanya ve Slider Yönetimi</h2>
                {isEditing && (
                    <button
                        onClick={() => { setIsEditing(null); setFormData({ title: "", description: "" }); }}
                        className="text-blue hover:underline"
                    >
                        Yeni Ekleme Moduna Dön
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                {/* Form Section */}
                <div className="rounded-xl border border-stroke bg-white p-6 shadow-sm dark:border-strokedark dark:bg-boxdark">
                    <h3 className="mb-6 text-xl font-semibold text-black dark:text-white">
                        {isEditing ? "Kampanyayı Düzenle" : "Yeni Kampanya Ekle"}
                    </h3>
                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Başlık</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Slider Başlığı"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Rozet (Badge)</label>
                                <input
                                    type="text"
                                    value={formData.badge}
                                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                                    placeholder="30% İndirim veya Fırsat"
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                                />
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="mb-2 block text-sm font-medium">Açıklama</label>
                            <textarea
                                rows={2}
                                required
                                value={formData.description}
                                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                placeholder="Kampanya detayları..."
                                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                            ></textarea>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Buton Yazısı</label>
                                <input
                                    type="text"
                                    value={formData.buttonText}
                                    onChange={(e) => setFormData({ ...formData, buttonText: e.target.value })}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                                />
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Yönlendirilecek Sayfa (URL)</label>
                                <input
                                    type="text"
                                    value={formData.buttonUrl}
                                    onChange={(e) => setFormData({ ...formData, buttonUrl: e.target.value })}
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Kampanya Türü</label>
                                <select
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                >
                                    <option value="product text-blue">Ürün Tanıtımı</option>
                                    <option value="installment">Taksit Kampanyası</option>
                                    <option value="announcement">Özel Duyuru</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Yayınlanacak Alan</label>
                                <select
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue font-bold text-blue"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value as any })}
                                >
                                    <option value="hero">Ana Sayfa Slider (Üst)</option>
                                    <option value="banner">Promosyon Bannerları (Alt)</option>
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium">Görsel Stil</label>
                                <select
                                    className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue"
                                    value={formData.style}
                                    onChange={(e) => setFormData({ ...formData, style: e.target.value as any })}
                                >
                                    <option value="blue">Mavi Tema (Varsayılan)</option>
                                    <option value="red">Kırmızı Tema (İndirim)</option>
                                    <option value="dark">Koyu Tema (Elite)</option>
                                    <option value="gradient">Gradyan Tema (Yeni)</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-6">
                            <label className="mb-2 block text-sm font-medium text-blue">Görsel URL (İsteğe Bağlı)</label>
                            <input
                                type="text"
                                value={formData.imageUrl}
                                onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                placeholder="https://...veya /images/... (Boş bırakılırsa ikon gösterilir)"
                                className="w-full rounded-lg border border-stroke bg-transparent py-3 px-5 outline-none focus:border-blue italic text-xs"
                            />
                            <p className="mt-1 text-xs text-gray-500">Fotoğrafsız modda kampanya türüne göre şık bir ikon gösterilir.</p>
                        </div>

                        <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue p-4 font-bold text-white transition hover:bg-opacity-90">
                            {isEditing ? <Edit2 size={18} /> : <Plus size={18} />}
                            {isEditing ? "Kampanyayı Güncelle" : "Kampanyayı Yayınla"}
                        </button>
                    </form>
                </div>

                {/* Preview Section */}
                <div className="flex flex-col gap-6">
                    <h3 className="text-xl font-semibold text-black dark:text-white">Aktif Kampanyalar</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {promos.map((promo) => (
                            <div
                                key={promo.id}
                                className="group relative flex items-center justify-between rounded-xl border border-stroke bg-white p-5 shadow-sm transition-all hover:shadow-md dark:border-strokedark dark:bg-boxdark"
                            >
                                <div className="flex items-center gap-4">
                                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${promo.style === 'blue' ? 'bg-blue/10 text-blue' :
                                        promo.style === 'red' ? 'bg-red/10 text-red' :
                                            promo.style === 'dark' ? 'bg-dark/10 text-dark' :
                                                'bg-purple-100 text-purple-600'
                                        }`}>
                                        {promo.type === 'installment' ? <CreditCard size={24} /> : <Megaphone size={24} />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-dark">{promo.title}</h4>
                                        <p className="text-xs text-gray-500 line-clamp-1">{promo.description}</p>
                                        <div className="mt-1 flex gap-2">
                                            <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 uppercase italic">
                                                {promo.type}
                                            </span>
                                            <span className="rounded bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600 uppercase italic">
                                                {promo.style}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleEdit(promo)}
                                        className="rounded-lg p-2 text-gray-400 hover:bg-blue/10 hover:text-blue transition-colors"
                                        title="Düzenle"
                                    >
                                        <Edit2 size={18} />
                                    </button>
                                    <button
                                        onClick={() => deletePromo(promo.id)}
                                        className="rounded-lg p-2 text-gray-400 hover:bg-red/10 hover:text-red transition-colors"
                                        title="Sil"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4 rounded-xl bg-blue/5 p-6 border border-blue/10">
                        <div className="flex items-start gap-4">
                            <div className="rounded-full bg-blue p-2 text-white">
                                <ArrowRight size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-blue">Canlı Önizleme Notu</h4>
                                <p className="text-sm text-blue/70">
                                    Yaptığınız değişiklikler ana sayfadaki Hero Slider alanında anında güncellenir. Fotoğrafsız modda kampanyanız kredi kartı veya duyuru ikonlarıyla modern bir şekilde sunulur.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminCampaignsPage;
