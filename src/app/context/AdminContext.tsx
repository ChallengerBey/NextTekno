"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
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
    isLoading: boolean;
    refreshData: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const refreshData = async () => {
        try {
            // Fetch Orders
            const { data: ordersData, error: ordersError } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (ordersData) setOrders(ordersData);

            // Fetch Products
            const { data: productsData, error: productsError } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (productsData) {
                // Map database columns to app structure if needed, or assume 1:1
                // For now, assuming the DB structure matches our types mostly
                const mappedProducts = productsData.map(p => ({
                    ...p,
                    imgs: typeof p.imgs === 'string' ? JSON.parse(p.imgs) : p.imgs
                }));
                setProducts(mappedProducts);
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
                imgs: product.imgs // Supabase handles JSON types well usually
            };

            const { error } = await supabase
                .from('products')
                .insert([dbProduct]);

            if (error) {
                console.error(error);
                throw error;
            }

            toast.success("Ürün başarıyla eklendi!");
            refreshData();
        } catch (error) {
            console.error("Product add error", error);
            toast.error("Ürün eklenirken hata oluştu!");
        }
    };

    return (
        <AdminContext.Provider value={{ isLoggedIn, login, logout, orders, addOrder, products, addProduct, isLoading, refreshData }}>
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
