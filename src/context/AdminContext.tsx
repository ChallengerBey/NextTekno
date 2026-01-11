"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import shopData from "@/components/Shop/shopData";

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
    addOrder: (order: Order) => void;
    products: Product[];
    addProduct: (product: Product) => void;
    isLoading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [orders, setOrders] = useState<Order[]>([]);
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize data from localStorage or defaults
    useEffect(() => {
        const storedAuth = localStorage.getItem("adminLoggedIn");
        if (storedAuth === "true") setIsLoggedIn(true);

        const storedOrders = localStorage.getItem("orders");
        if (storedOrders) {
            setOrders(JSON.parse(storedOrders));
        } else {
            // Default dummy orders for demo
            const defaultOrders: Order[] = [
                { id: "#1001", customer: "Ahmet Yılmaz", date: new Date().toLocaleDateString(), status: "Tamamlandı", total: "$120.00" },
                { id: "#1002", customer: "Ayşe Demir", date: new Date().toLocaleDateString(), status: "Beklemede", total: "$45.00" },
            ];
            setOrders(defaultOrders);
            localStorage.setItem("orders", JSON.stringify(defaultOrders));
        }

        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            // Initialize with shopData
            setProducts(shopData);
            localStorage.setItem("products", JSON.stringify(shopData));
        }

        setIsLoading(false);
    }, []);

    const login = (password: string) => {
        // Simple hardcoded password for demonstration
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

    const addOrder = (order: Order) => {
        const updatedOrders = [order, ...orders];
        setOrders(updatedOrders);
        localStorage.setItem("orders", JSON.stringify(updatedOrders));
    };

    const addProduct = (product: Product) => {
        const updatedProducts = [product, ...products];
        setProducts(updatedProducts);
        localStorage.setItem("products", JSON.stringify(updatedProducts));
    };

    return (
        <AdminContext.Provider value={{ isLoggedIn, login, logout, orders, addOrder, products, addProduct, isLoading }}>
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
