"use client";
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useAdmin } from "@/app/context/AdminContext";
import toast from "react-hot-toast";
import { productCategoryOptions } from "@/lib/categories";
import { Product } from "@/types/product";

const AdminProductsPage = () => {
    const { products, isLoading, updateProduct, deleteProduct } = useAdmin();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [saving, setSaving] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        discountedPrice: "",
        category: "General",
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);

    const openEdit = (product: Product) => {
        setEditingProduct(product);
        setFormData({
            title: product.title ?? "",
            price: product.price != null ? String(product.price) : "",
            discountedPrice:
                product.discountedPrice != null ? String(product.discountedPrice) : "",
            category: product.category ?? "General",
        });
        setExistingImages(product.imgs?.thumbnails || []);
        setImageFiles([]);
        setIsEditOpen(true);
    };

    const closeEdit = () => {
        setIsEditOpen(false);
        setEditingProduct(null);
        setImageFiles([]);
        setExistingImages([]);
    };

    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingProduct) return;

        if (!formData.title || !formData.price) {
            toast.error("Lütfen zorunlu alanları doldurun!");
            return;
        }

        setSaving(true);
        
        let finalImages = [...existingImages];
        
        // Upload new images
        if (imageFiles.length > 0) {
            try {
                for (const file of imageFiles) {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('products')
                        .upload(filePath, file);

                    if (!uploadError) {
                        const { data } = supabase.storage
                            .from('products')
                            .getPublicUrl(filePath);
                        finalImages.push(data.publicUrl);
                    }
                }
            } catch (error) {
                console.error("Upload error:", error);
            }
        }

        await updateProduct({
            ...editingProduct,
            title: formData.title,
            price: parseFloat(formData.price),
            discountedPrice: formData.discountedPrice
                ? parseFloat(formData.discountedPrice)
                : null,
            category: formData.category || "General",
            imgs: {
                thumbnails: finalImages,
                previews: finalImages,
            }
        });
        setSaving(false);
        closeEdit();
    };

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="mb-6 flex justify-between items-center">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Ürün Listesi
                </h4>
                <Link
                    href="/admin/products/add"
                    className="inline-flex items-center justify-center rounded-md bg-blue py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Ürün Ekle
                </Link>
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Ürün Adı
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Fiyat
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            İndirimli Fiyat
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Yorumlar
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            İşlem
                        </h5>
                    </div>
                </div>

                {isLoading ? (
                    <div className="p-6 text-center text-sm text-body">
                        Yükleniyor...
                    </div>
                ) : products.length === 0 ? (
                    <div className="p-6 text-center text-sm text-body">
                        Henüz ürün yok.
                    </div>
                ) : products.map((product, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === products.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                <Image
                                    src={product.imgs?.thumbnails?.[0] ?? "/images/products/product-01.png"}
                                    alt="Product"
                                    width={48}
                                    height={48}
                                />
                            </div>
                            <p className="hidden text-black dark:text-white sm:block">
                                {product.title}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">₺{product.price}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">
                                {product.discountedPrice != null ? `₺${product.discountedPrice}` : "-"}
                            </p>
                        </div>

                        <div
                            className="hidden items-center justify-center p-2.5 sm:flex xl:p-5"
                        >
                            <p className="text-black dark:text-white">{product.reviews}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5 gap-2">
                            <button 
                                className="text-blue hover:underline"
                                onClick={() => openEdit(product)}
                            >
                                Düzenle
                            </button>
                            <button 
                                className="text-red-500 hover:text-red-700 font-medium"
                                onClick={() => {
                                    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
                                        deleteProduct(product.id);
                                    }
                                }}
                            >
                                🗑️ Sil
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {isEditOpen && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm px-4">
                    <div className="w-full max-w-xl rounded-md bg-white p-6 shadow-2xl relative z-[10000]">
                        <div className="mb-4 flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-black">
                                Ürün Düzenle
                            </h3>
                            <button
                                type="button"
                                onClick={closeEdit}
                                className="text-sm text-gray-600 hover:text-black"
                            >
                                Kapat
                            </button>
                        </div>

                        <form onSubmit={handleUpdate}>
                            <div className="mb-4">
                                <label className="mb-2 block text-sm text-black">
                                    Ürün Adı
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) =>
                                        setFormData({ ...formData, title: e.target.value })
                                    }
                                    className="w-full rounded border border-stroke px-4 py-2 outline-none focus:border-primary"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm text-black">
                                    Fiyat (₺)
                                </label>
                                <input
                                    type="number"
                                    value={formData.price}
                                    onChange={(e) =>
                                        setFormData({ ...formData, price: e.target.value })
                                    }
                                    className="w-full rounded border border-stroke px-4 py-2 outline-none focus:border-primary"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm text-black">
                                    İndirimli Fiyat (₺)
                                </label>
                                <input
                                    type="number"
                                    value={formData.discountedPrice}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            discountedPrice: e.target.value,
                                        })
                                    }
                                    className="w-full rounded border border-stroke px-4 py-2 outline-none focus:border-primary"
                                />
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm text-black">
                                    Görseller
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => {
                                        if (e.target.files) {
                                            const files = Array.from(e.target.files);
                                            setImageFiles(prev => [...prev, ...files]);
                                        }
                                    }}
                                    className="w-full rounded border border-stroke px-4 py-2 outline-none focus:border-primary"
                                />
                                
                                {existingImages.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-sm text-gray-600 mb-2">Mevcut Görseller:</p>
                                        <div className="grid grid-cols-3 gap-2">
                                            {existingImages.map((img, index) => (
                                                <div key={index} className="relative">
                                                    <img src={img} alt="" className="w-full h-20 object-cover rounded" />
                                                    <button
                                                        type="button"
                                                        onClick={() => setExistingImages(prev => prev.filter((_, i) => i !== index))}
                                                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs"
                                                    >
                                                        ×
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                
                                {imageFiles.length > 0 && (
                                    <div className="mt-3">
                                        <p className="text-sm text-green-600 mb-2">Yeni Görseller ({imageFiles.length}):</p>
                                        <div className="space-y-1">
                                            {imageFiles.map((file, index) => (
                                                <div key={index} className="flex items-center justify-between bg-gray-50 p-2 rounded text-sm">
                                                    <span>{file.name}</span>
                                                    <button
                                                        type="button"
                                                        onClick={() => setImageFiles(prev => prev.filter((_, i) => i !== index))}
                                                        className="text-red-500 hover:text-red-700"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="mb-6">
                                <label className="mb-2 block text-sm text-black">
                                    Kategori
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                    className="w-full rounded border border-stroke px-4 py-2 outline-none focus:border-primary"
                                >
                                    {productCategoryOptions.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex justify-end gap-3">
                                <button
                                    type="button"
                                    onClick={closeEdit}
                                    className="rounded border border-stroke px-4 py-2 text-sm"
                                >
                                    Vazgeç
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="rounded bg-blue px-4 py-2 text-sm text-white disabled:opacity-70"
                                >
                                    {saving ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminProductsPage;
