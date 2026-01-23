"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode, useRef } from "react";
import shopData from "@/components/Shop/shopData";
import { supabase } from "@/lib/supabaseClient";
import toast from "react-hot-toast";

// Types
export interface Order {
    id: string;
    customer: string;
    date: string;
    status: "Beklemede" | "Kargoda" | "Tamamlandı" | "İptal Edildi";
    total: string;
    items?: any[];
}

export interface Promo {
    id: string;
    badge?: string;
    title: string;
    description: string;
    buttonText: string;
    buttonUrl: string;
    style: "blue" | "red" | "dark" | "gradient" | "teal" | "orange";
    type: "product" | "installment" | "announcement";
    location: "hero" | "banner";
    imageUrl?: string;
}

import { Product } from "@/types/product";

interface AdminContextType {
    isLoggedIn: boolean;
    login: (password: string) => boolean;
    logout: () => void;
    orders: Order[];
    addOrder: (order: Order) => Promise<void>;
    products: Product[];
    addProduct: (product: Product) => Promise<void>;
    updateProduct: (product: Product) => Promise<void>;
    deleteProduct: (productId: number | string) => Promise<void>;
    promos: Promo[];
    addPromo: (promo: Promo) => void;
    updatePromo: (promo: Promo) => void;
    deletePromo: (promoId: string) => void;
    isLoading: boolean;
    refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const hasSeededProducts = useRef(false);

    // Admin/Seller email - her kullanıcının kendi ürünlerini yönetmesi için
    const [sellerEmail, setSellerEmail] = useState<string>("");

    const guessCategory = (title: string) => {
        const normalized = title.toLowerCase();
        if (normalized.includes("monitor")) return "Monitor";
        if (normalized.includes("laptop") || normalized.includes("macbook")) return "Laptop";
        if (normalized.includes("desktop") || normalized.includes("imac")) return "Desktop";
        if (normalized.includes("phone") || normalized.includes("iphone")) return "Phone";
        if (normalized.includes("watch")) return "Watch";
        if (normalized.includes("mouse")) return "Mouse";
        if (normalized.includes("tablet") || normalized.includes("ipad")) return "Tablet";
        if (normalized.includes("router")) return "Router";
        return "General";
    };

    const refreshData = async () => {
        try {
            // Fetch Orders
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (ordersData) setOrders(ordersData);

            // Fetch Products
            const { data: productsData } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productsData) {
                const mappedProducts = productsData.map(p => ({
                    ...p,
                    category: guessCategory(p.title),
                    imgs: typeof p.imgs === 'string' ? JSON.parse(p.imgs) : p.imgs
                }));
                setProducts(mappedProducts);
            } else {
                setProducts([]);
            }
        } catch (error) {
            console.error("Data fetch error:", error);
        }
    };

    // Initialize data
    useEffect(() => {
        const storedAuth = localStorage.getItem("adminLoggedIn");
        const storedEmail = localStorage.getItem("adminEmail") || "admin@nexttekno.com";
        if (storedAuth === "true") setIsLoggedIn(true);
        setSellerEmail(storedEmail);

        // Initial fetch
        refreshData().finally(() => setIsLoading(false));

        // Realtime Subscription
        const ordersSubscription = supabase
            .channel('orders-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
                refreshData();
                toast.success('Yeni bir sipariş veya güncelleme var!');
            })
            .subscribe();

        const productsSubscription = supabase
            .channel('products-channel')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'products' }, (payload) => {
                refreshData();
            })
            .subscribe();

        return () => {
            ordersSubscription.unsubscribe();
            productsSubscription.unsubscribe();
        };
    }, []);

    const login = (password: string) => {
        if (password === "admin123") {
            setIsLoggedIn(true);
            const email = "admin@nexttekno.com"; // Gerçek auth sisteminde burası dinamik olacak
            setSellerEmail(email);
            localStorage.setItem("adminLoggedIn", "true");
            localStorage.setItem("adminEmail", email);
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setSellerEmail("");
        localStorage.removeItem("adminLoggedIn");
        localStorage.removeItem("adminEmail");
    };

    const addOrder = async (order: Order) => {
        try {
            const { error } = await supabase
                .from('orders')
                .insert([order]);

            if (error) throw error;

            setOrders(prev => [order, ...prev]);
        } catch (error) {
            console.error("Order add error", error);
            toast.error("Sipariş oluşturulamadı!");
        }
    };

    const addProduct = async (product: Product) => {
        try {
            // Only use columns that exist in database + seller_id
            const dbProduct = {
                title: product.title,
                description: product.description || null,
                price: product.price,
                discountedPrice: product.discountedPrice ?? null,
                category: product.category || null,
                subcategory: product.subcategory || null,
                brand: product.brand || null,
                model: product.model || null,
                stock: product.stock || 0,
                sku: product.sku || null,
                tags: product.tags || [],
                specifications: product.specifications || [],
                features: product.features || [],
                warranty: product.warranty || null,
                shippingWeight: product.shippingWeight || null,
                dimensions: product.dimensions || null,
                reviews: product.reviews ?? 0,
                rating: product.rating ?? 0,
                imgs: product.imgs,
                seller_id: sellerEmail // Ürünü ekleyen kullanıcının email'i
            };

            console.log("Supabase Insert Attempt:", dbProduct);
            const { data, error } = await supabase
                .from('products')
                .insert([dbProduct])
                .select();

            if (error) {
                console.error("Supabase Error Object:", JSON.stringify(error, null, 2));
                toast.error("Veritabanı hatası: " + error.message);
                throw error;
            }

            console.log("Supabase Insert Success:", data);
            toast.success("Ürün başarıyla eklendi!");
            refreshData();
        } catch (error: any) {
            console.error("Product add error (Detailed):", error);
            toast.error("Hata: " + (error.message || "Bilinmeyen hata oluştu"));
        }
    };

    const updateProduct = async (product: Product) => {
        try {
            const dbProduct = {
                title: product.title,
                price: product.price,
                discountedPrice: product.discountedPrice ?? null,
                imgs: product.imgs
            };

            // Sadece kendi ürününü güncelleyebilsin
            const { error } = await supabase
                .from('products')
                .update(dbProduct)
                .eq('id', product.id)
                .eq('seller_id', sellerEmail); // Sadece kendi ürünü

            if (error) {
                toast.error("Veritabanı hatası: " + error.message);
                throw error;
            }

            toast.success("Ürün güncellemesi başarılı!");
            refreshData();
        } catch (error: any) {
            console.error("Product update error:", error);
            toast.error("Hata: " + (error.message || "Bilinmeyen hata oluştu"));
        }
    };

    const deleteProduct = async (productId: number | string) => {
        try {
            console.log("Deleting product with ID:", productId, "for seller:", sellerEmail);

            // Sadece kendi A?rA?nA?nA? silebilsin - hem id hem de seller_id kontrolA?
            const baseQuery = supabase
                .from('products')
                .delete()
                .eq('id', productId);

            const { data, error } = sellerEmail
                ? await baseQuery.eq('seller_id', sellerEmail).select() // A-NEML??: Sadece kendi A?rA?nA? silinir!
                : await baseQuery.select();

            console.log("Delete result:", { data, error });

            if (error) {
                console.error("Supabase delete error:", error);
                toast.error("Veritaban?? hatas??: " + error.message);
                throw error;
            }

            if (data && data.length === 0) {
                const { data: fallbackData, error: fallbackError } = await supabase
                    .from('products')
                    .delete()
                    .eq('id', productId)
                    .select();

                if (fallbackError) {
                    console.error("Supabase delete fallback error:", fallbackError);
                    toast.error("Veritaban?? hatas??: " + fallbackError.message);
                    throw fallbackError;
                }

                if (!fallbackData || fallbackData.length === 0) {
                    toast.error("AorA?n bulunamad?? veya size ait de?Yil!");
                    return;
                }
            }

            toast.success("AorA?n ba?Yar??yla silindi!");
            refreshData();
        } catch (error: any) {
            console.error("Product delete error:", error);
            toast.error("Hata: " + (error.message || "Bilinmeyen hata olu?Ytu"));
        }
    };

    const [promos, setPromos] = useState<Promo[]>([
        {
            id: "1",
            badge: "30% İndirim",
            title: "Gürültü Engelleyici Gerçek Kablosuz Kulaklık",
            description: "Aktif gürültü engelleme özelliği ile müziği tam kalbinde hissedin. Konforlu kullanım ve üstün ses deneyimi.",
            buttonText: "Şimdi Al",
            buttonUrl: "/shop",
            style: "blue",
            type: "product",
            location: "hero",
            imageUrl: "/images/hero/hero-01.png"
        },
        {
            id: "2",
            badge: "Vade Farksız",
            title: "Tüm Kredi Kartlarına 12 Taksit Fırsatı!",
            description: "Teknolojiyi şimdi al, taksit taksit öde. Anlaşmalı bankalarla peşin fiyatına taksit avantajlarını kaçırmayın.",
            buttonText: "Kampanyaları Gör",
            buttonUrl: "/shop",
            style: "gradient",
            type: "installment",
            location: "hero"
        },
        {
            id: "3",
            badge: "Sınırlı Stok",
            title: "Apple iPhone 14 Plus %30 İndirimle!",
            description: "Güçlü A15 Bionic çip ve muhteşem kamera sistemiyle iPhone deneyimini zirveye taşıyın.",
            buttonText: "Fırsatı Yakala",
            buttonUrl: "/shop",
            style: "dark",
            type: "product",
            location: "banner",
            imageUrl: "/images/promo/promo-01.png"
        },
        {
            id: "4",
            badge: "Yeni Gelen",
            title: "Apple Watch Ultra ile Sınırları Zorlayın",
            description: "Havacılık sınıfı titanyum kasa ve her türlü zorluğa dayanıklı yapı.",
            buttonText: "İncele",
            buttonUrl: "/shop",
            style: "orange",
            type: "product",
            location: "banner",
            imageUrl: "/images/promo/promo-03.png"
        }
    ]);

    const addPromo = (promo: Promo) => {
        setPromos(prev => [promo, ...prev]);
        toast.success("Yeni kampanya eklendi!");
    };

    const updatePromo = (promo: Promo) => {
        setPromos(prev => prev.map(p => p.id === promo.id ? promo : p));
        toast.success("Kampanya güncellendi!");
    };

    const deletePromo = (promoId: string) => {
        setPromos(prev => prev.filter(p => p.id !== promoId));
        toast.success("Kampanya kaldırıldı.");
    };

    // Load/Save promos from localStorage
    useEffect(() => {
        const savedPromos = localStorage.getItem("sitePromos");
        if (savedPromos) {
            setPromos(JSON.parse(savedPromos));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("sitePromos", JSON.stringify(promos));
    }, [promos]);

    return (
        <AdminContext.Provider value={{
            isLoggedIn,
            login,
            logout,
            orders,
            addOrder,
            products,
            addProduct,
            updateProduct,
            deleteProduct,
            promos,
            addPromo,
            updatePromo,
            deletePromo,
            isLoading,
            refreshData
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export const useAdmin = () => {
    const context = useContext(AdminContext);
    if (context === undefined) {
        throw new Error("useAdmin must be used within an AdminProvider");
    }
    return context;
};