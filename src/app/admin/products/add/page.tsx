"use client";
import React, { useState } from "react";
import { useAdmin } from "@/app/context/AdminContext";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";

const AddProductPage = () => {
    const { addProduct } = useAdmin();
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        discountedPrice: "",
    });
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [uploading, setUploading] = useState(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setImageFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.price) {
            toast.error("Lütfen zorunlu alanları doldurun!");
            return;
        }

        let imageUrl = "/images/products/product-01.png"; // Default fallback

        if (imageFile) {
            setUploading(true);
            try {
                const fileExt = imageFile.name.split('.').pop();
                const fileName = `${Date.now()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('products')
                    .upload(filePath, imageFile);

                if (uploadError) {
                    throw uploadError;
                }

                // Get Public URL
                const { data } = supabase.storage
                    .from('products')
                    .getPublicUrl(filePath);

                imageUrl = data.publicUrl;

            } catch (error) {
                console.error("Upload error:", error);
                toast.error("Görsel yüklenirken hata oluştu!");
                setUploading(false);
                return;
            }
            setUploading(false);
        }

        const newProduct = {
            id: Date.now(),
            title: formData.title,
            price: parseFloat(formData.price),
            discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : undefined,
            reviews: 0,
            imgs: {
                thumbnails: [imageUrl, imageUrl, imageUrl],
                previews: [imageUrl, imageUrl, imageUrl],
            }
        };

        await addProduct(newProduct as any);

        setFormData({ title: "", price: "", discountedPrice: "" });
        setImageFile(null);
    };

    return (
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
            <div className="flex flex-col gap-9">
                {/* <!-- Contact Form --> */}
                <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                        <h3 className="font-medium text-black dark:text-white">
                            Yeni Ürün Ekle
                        </h3>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="p-6.5">
                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Ürün Adı <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Ürün adını giriniz"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Fiyat <span className="text-meta-1">*</span>
                                </label>
                                <input
                                    type="number"
                                    placeholder="Fiyat giriniz"
                                    value={formData.price}
                                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    İndirimli Fiyat
                                </label>
                                <input
                                    type="number"
                                    placeholder="İndirimli fiyatı giriniz"
                                    value={formData.discountedPrice}
                                    onChange={(e) => setFormData({ ...formData, discountedPrice: e.target.value })}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                                />
                            </div>

                            <div className="mb-4.5">
                                <label className="mb-2.5 block text-black dark:text-white">
                                    Ürün Görseli
                                </label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary"
                                />
                                {imageFile && <p className="text-sm text-green-500 mt-1">Seçilen: {imageFile.name}</p>}
                            </div>

                            <button
                                disabled={uploading}
                                className="flex w-full justify-center rounded bg-blue p-3 font-medium text-gray hover:bg-opacity-90 disabled:opacity-70"
                            >
                                {uploading ? "Yükleniyor..." : "Ürünü Ekle"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
