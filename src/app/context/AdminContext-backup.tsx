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

            if (productsData && productsData.length > 0) {
                // Map database columns to app structure if needed, or assume 1:1
                // For now, assuming the DB structure matches our types mostly
                const mappedProducts = productsData.map(p => ({
                    ...p,
                    category: p.category ?? "General",
                    imgs: typeof p.imgs === 'string' ? JSON.parse(p.imgs) : p.imgs
                }));
                setProducts(mappedProducts);
            } else if (!hasSeededProducts.current) {
                hasSeededProducts.current = true;
                try {
                    const seedProducts = shopData.map((product) => ({
                        ...product,
                        imgs: product.imgs ?? null,
                        category: product.category ?? guessCategory(product.title)
                    }));

                    const { error: seedError } = await supabase
                        .from('products')
                        .insert(seedProducts);

                    if (seedError) throw seedError;

                    const { data: seededProducts } = await supabase
                        .from('products')
                        .select('*')
                        .order('created_at', { ascending: false });

                    if (seededProducts) {
                        const mappedProducts = seededProducts.map(p => ({
                            ...p,
                            category: p.category ?? "General",
                            imgs: typeof p.imgs === 'string' ? JSON.parse(p.imgs) : p.imgs
                        }));
                        setProducts(mappedProducts);
                    }
                } catch (seedError) {
                    console.error("Seed products error:", seedError);
                }
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
        if (storedAuth === "true") setIsLoggedIn(true);

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
            localStorage.setItem("adminLoggedIn", "true");
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem("adminLoggedIn");
    };

    const addOrder = async (order: Order) => {
        try {
            const { error } = await supabase
                .from('orders')
                .insert([order]);

            if (error) throw error;

            // Optimistic update or wait for realtime
            setOrders(prev => [order, ...prev]);
        } catch (error) {
            console.error("Order add error", error);
            toast.error("Sipariş oluşturulamadı!");
        }
    };

    const addProduct = async (product: Product) => {
        try {
            // Ensure images are stringified if storing as JSON/Text in DB
            const dbProduct = {
                ...product,
                imgs: product.imgs, // Supabase handles JSON types well usually
                category: product.category ?? "General"
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
                imgs: product.imgs ?? null,
                category: product.category ?? "General"
            };

            const { error } = await supabase
                .from('products')
                .update(dbProduct)
                .eq('id', product.id);

            if (error) {
                toast.error("VeritabanŽñ hatasŽñ: " + error.message);
                throw error;
            }

            toast.success("AorA¬n gA¬ncellemesi baYarŽñlŽñ!");
            refreshData();
        } catch (error: any) {
            console.error("Product update error:", error);
            toast.error("Hata: " + (error.message || "Bilinmeyen hata oluYtu"));
        }
    };

    return (
        <AdminContext.Provider value={{ isLoggedIn, login, logout, orders, addOrder, products, addProduct, updateProduct, isLoading, refreshData }}>
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
