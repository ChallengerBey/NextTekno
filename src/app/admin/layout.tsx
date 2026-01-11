"use client";
import Sidebar from "@/components/Admin/Sidebar";
import Header from "@/components/Admin/Header";
import "../css/style.css";
import "../css/euclid-circular-a-font.css";

import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import { useAdmin, AdminProvider } from "@/app/context/AdminContext";

const AdminAuthWrapper = ({ children }: { children: React.ReactNode }) => {
    const { isLoggedIn, isLoading } = useAdmin();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (!isLoading && !isLoggedIn && pathname !== "/admin/login") {
            router.push("/admin/login");
        }
    }, [isLoggedIn, isLoading, router, pathname]);

    // Show loading or nothing while checking auth
    if (isLoading) return null;

    // Allow access to login page
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If not logged in and not on login page, don't render content (useEffect will redirect)
    if (!isLoggedIn) return null;

    // Render Admin Dashboard Layout
    return (
        <div className="flex h-screen overflow-hidden bg-gray-100">
            <Sidebar />
            <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
                <Header />
                <main>
                    <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="tr">
            <body suppressHydrationWarning={true}>
                <AdminProvider>
                    <AdminAuthWrapper>
                        {children}
                    </AdminAuthWrapper>
                </AdminProvider>
            </body>
        </html>
    );
}
