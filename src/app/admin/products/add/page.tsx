"use client";
import React, { useState } from "react";
import { useAdmin } from "@/app/context/AdminContext";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import { Package, Upload, X, Plus, Minus } from "lucide-react";

const AddProductPage = () => {
    const { addProduct } = useAdmin();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        discountedPrice: "",
        category: "",
        subcategory: "",
        brand: "",
        model: "",
        stock: "",
        sku: "",
        tags: "",
        specifications: [{ key: "", value: "" }],
        features: [""],
        warranty: "",
        shippingWeight: "",
        dimensions: {
            width: "",
            height: "",
            depth: ""
        }
    });
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [uploading, setUploading] = useState(false);

    const categories = [
        { value: "elektronik", label: "Elektronik", subcategories: ["Telefon & Aksesuar", "Bilgisayar & Tablet", "Ses & Görüntü", "Fotoğraf & Kamera", "Akıllı Saat", "Oyun & Konsol"] },
        { value: "moda", label: "Moda", subcategories: ["Kadın Giyim", "Erkek Giyim", "Ayakkabı", "Çanta", "Aksesuar", "Saat"] },
        { value: "ev-yasam", label: "Ev & Yaşam", subcategories: ["Mobilya", "Dekorasyon", "Mutfak", "Banyo", "Bahçe", "Temizlik"] },
        { value: "supermarket", label: "Süpermarket", subcategories: ["Gıda", "İçecek", "Temizlik", "Kişisel Bakım", "Bebek", "Pet Shop"] },
        { value: "kitap", label: "Kitap", subcategories: ["Roman", "Bilim", "Tarih", "Çocuk", "Ders Kitabı", "Dergi"] },
        { value: "spor-outdoor", label: "Spor & Outdoor", subcategories: ["Fitness", "Futbol", "Basketbol", "Koşu", "Kamp", "Bisiklet"] }
    ];

    const brands = ["Apple", "Samsung", "Xiaomi", "Huawei", "Sony", "LG", "HP", "Dell", "Asus", "Lenovo", "MSI", "Acer", "Canon", "Nikon", "JBL", "Bose", "Beats", "Logitech", "Razer", "SteelSeries"];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.includes('.')) {
            const [parent, child] = name.split('.');
            setFormData(prev => ({
                ...prev,
                [parent]: {
                    ...prev[parent as keyof typeof prev],
                    [child]: value
                }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleSpecificationChange = (index: number, field: 'key' | 'value', value: string) => {
        const newSpecs = [...formData.specifications];
        newSpecs[index][field] = value;
        setFormData(prev => ({ ...prev, specifications: newSpecs }));
    };

    const addSpecification = () => {
        setFormData(prev => ({
            ...prev,
            specifications: [...prev.specifications, { key: "", value: "" }]
        }));
    };

    const removeSpecification = (index: number) => {
        setFormData(prev => ({
            ...prev,
            specifications: prev.specifications.filter((_, i) => i !== index)
        }));
    };

    const handleFeatureChange = (index: number, value: string) => {
        const newFeatures = [...formData.features];
        newFeatures[index] = value;
        setFormData(prev => ({ ...prev, features: newFeatures }));
    };

    const addFeature = () => {
        setFormData(prev => ({
            ...prev,
            features: [...prev.features, ""]
        }));
    };

    const removeFeature = (index: number) => {
        setFormData(prev => ({
            ...prev,
            features: prev.features.filter((_, i) => i !== index)
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setImageFiles(prev => [...prev, ...files]);
        }
    };

    const removeImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
    };

    const selectedCategory = categories.find(cat => cat.value === formData.category);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title || !formData.price || !formData.category) {
            toast.error("Lütfen zorunlu alanları doldurun!");
            return;
        }

        if (parseFloat(formData.price) <= 0) {
            toast.error("Fiyat 0'dan büyük olmalıdır!");
            return;
        }

        let imageUrls: string[] = [];

        if (imageFiles.length > 0) {
            setUploading(true);
            try {
                for (const file of imageFiles) {
                    const fileExt = file.name.split('.').pop();
                    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
                    const filePath = `${fileName}`;

                    const { error: uploadError } = await supabase.storage
                        .from('products')
                        .upload(filePath, file);

                    if (uploadError) {
                        console.error("Storage upload error:", uploadError);
                        toast.error(`${file.name} yüklenirken hata oluştu!`);
                    } else {
                        const { data } = supabase.storage
                            .from('products')
                            .getPublicUrl(filePath);
                        imageUrls.push(data.publicUrl);
                    }
                }
            } catch (error) {
                console.error("Upload error:", error);
                toast.error("Görseller yüklenirken hata oluştu!");
            }
            setUploading(false);
        }

        // Fallback if no images uploaded
        if (imageUrls.length === 0) {
            imageUrls = ["/images/products/product-01.png"];
        }

        const newProduct = {
            title: formData.title,
            description: formData.description,
            price: parseFloat(formData.price),
            discountedPrice: formData.discountedPrice ? parseFloat(formData.discountedPrice) : null,
            category: formData.category,
            subcategory: formData.subcategory,
            brand: formData.brand,
            model: formData.model,
            stock: formData.stock ? parseInt(formData.stock) : 0,
            sku: formData.sku,
            tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
            specifications: formData.specifications.filter(spec => spec.key && spec.value),
            features: formData.features.filter(feature => feature.trim()),
            warranty: formData.warranty,
            shippingWeight: formData.shippingWeight ? parseFloat(formData.shippingWeight) : null,
            dimensions: {
                width: formData.dimensions.width ? parseFloat(formData.dimensions.width) : null,
                height: formData.dimensions.height ? parseFloat(formData.dimensions.height) : null,
                depth: formData.dimensions.depth ? parseFloat(formData.dimensions.depth) : null
            },
            reviews: 0,
            rating: 0,
            imgs: {
                thumbnails: imageUrls,
                previews: imageUrls,
            }
        };

        console.log("Adding product:", newProduct);
        await addProduct(newProduct as any);

        // Reset form
        setFormData({
            title: "",
            description: "",
            price: "",
            discountedPrice: "",
            category: "",
            subcategory: "",
            brand: "",
            model: "",
            stock: "",
            sku: "",
            tags: "",
            specifications: [{ key: "", value: "" }],
            features: [""],
            warranty: "",
            shippingWeight: "",
            dimensions: { width: "", height: "", depth: "" }
        });
        setImageFiles([]);
        
        // Reset file input
        const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
    };

    return (
        <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                        <Package className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Yeni Ürün Ekle</h1>
                        <p className="text-gray-600">Detaylı ürün bilgileri ile yeni ürün ekleyin</p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                    {/* Temel Bilgiler */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Temel Bilgiler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ürün Adı <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Ürün adını giriniz"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Ürün Açıklaması
                                </label>
                                <textarea
                                    name="description"
                                    placeholder="Ürün açıklamasını giriniz"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    rows={4}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kategori <span className="text-red-500">*</span>
                                </label>
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Kategori Seçin</option>
                                    {categories.map(cat => (
                                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Alt Kategori
                                </label>
                                <select
                                    name="subcategory"
                                    value={formData.subcategory}
                                    onChange={handleInputChange}
                                    disabled={!selectedCategory}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100"
                                >
                                    <option value="">Alt Kategori Seçin</option>
                                    {selectedCategory?.subcategories.map(sub => (
                                        <option key={sub} value={sub}>{sub}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Marka
                                </label>
                                <select
                                    name="brand"
                                    value={formData.brand}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                >
                                    <option value="">Marka Seçin</option>
                                    {brands.map(brand => (
                                        <option key={brand} value={brand}>{brand}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Model
                                </label>
                                <input
                                    type="text"
                                    name="model"
                                    placeholder="Model adını giriniz"
                                    value={formData.model}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Fiyat ve Stok */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Fiyat ve Stok</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Fiyat (₺) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="number"
                                    name="price"
                                    placeholder="0.00"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    İndirimli Fiyat (₺)
                                </label>
                                <input
                                    type="number"
                                    name="discountedPrice"
                                    placeholder="0.00"
                                    value={formData.discountedPrice}
                                    onChange={handleInputChange}
                                    step="0.01"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Stok Adedi
                                </label>
                                <input
                                    type="number"
                                    name="stock"
                                    placeholder="0"
                                    value={formData.stock}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    SKU Kodu
                                </label>
                                <input
                                    type="text"
                                    name="sku"
                                    placeholder="SKU123"
                                    value={formData.sku}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>
                    {/* Özellikler */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Teknik Özellikler</h2>
                        <div className="space-y-4">
                            {formData.specifications.map((spec, index) => (
                                <div key={index} className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Özellik adı (örn: Ekran Boyutu)"
                                        value={spec.key}
                                        onChange={(e) => handleSpecificationChange(index, 'key', e.target.value)}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Değer (örn: 6.1 inç)"
                                        value={spec.value}
                                        onChange={(e) => handleSpecificationChange(index, 'value', e.target.value)}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeSpecification(index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addSpecification}
                                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium"
                            >
                                <Plus className="h-4 w-4" />
                                Özellik Ekle
                            </button>
                        </div>
                    </div>

                    {/* Öne Çıkan Özellikler */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Öne Çıkan Özellikler</h2>
                        <div className="space-y-4">
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex gap-4">
                                    <input
                                        type="text"
                                        placeholder="Öne çıkan özellik (örn: Su geçirmez tasarım)"
                                        value={feature}
                                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                                        className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => removeFeature(index)}
                                        className="p-3 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
                                    >
                                        <Minus className="h-5 w-5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addFeature}
                                className="flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium"
                            >
                                <Plus className="h-4 w-4" />
                                Özellik Ekle
                            </button>
                        </div>
                    </div>

                    {/* Diğer Bilgiler */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Diğer Bilgiler</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Garanti Süresi
                                </label>
                                <input
                                    type="text"
                                    name="warranty"
                                    placeholder="2 Yıl Resmi Garanti"
                                    value={formData.warranty}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Kargo Ağırlığı (kg)
                                </label>
                                <input
                                    type="number"
                                    name="shippingWeight"
                                    placeholder="0.5"
                                    value={formData.shippingWeight}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Genişlik (cm)
                                </label>
                                <input
                                    type="number"
                                    name="dimensions.width"
                                    placeholder="15.5"
                                    value={formData.dimensions.width}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Yükseklik (cm)
                                </label>
                                <input
                                    type="number"
                                    name="dimensions.height"
                                    placeholder="7.5"
                                    value={formData.dimensions.height}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Derinlik (cm)
                                </label>
                                <input
                                    type="number"
                                    name="dimensions.depth"
                                    placeholder="1.2"
                                    value={formData.dimensions.depth}
                                    onChange={handleInputChange}
                                    step="0.1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Etiketler
                                </label>
                                <input
                                    type="text"
                                    name="tags"
                                    placeholder="telefon, akıllı, apple (virgülle ayırın)"
                                    value={formData.tags}
                                    onChange={handleInputChange}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Ürün Görselleri */}
                    <div className="bg-gray-50 rounded-xl p-6">
                        <h2 className="text-lg font-semibold text-gray-900 mb-4">Ürün Görselleri</h2>
                        <div className="space-y-4">
                            <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center">
                                <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                                <label className="cursor-pointer">
                                    <span className="text-orange-500 font-medium hover:text-orange-600">
                                        Görselleri seçin
                                    </span>
                                    <span className="text-gray-600"> veya sürükleyip bırakın</span>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        multiple
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </label>
                                <p className="text-sm text-gray-500 mt-2">PNG, JPG, JPEG (Maks. 5MB)</p>
                            </div>

                            {imageFiles.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {imageFiles.map((file, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeImage(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="h-4 w-4" />
                                            </button>
                                            <p className="text-xs text-gray-600 mt-2 truncate">{file.name}</p>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={uploading}
                            className="px-8 py-4 bg-orange-500 text-white font-medium rounded-xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {uploading ? (
                                <div className="flex items-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Yükleniyor...
                                </div>
                            ) : (
                                "Ürünü Ekle"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddProductPage;