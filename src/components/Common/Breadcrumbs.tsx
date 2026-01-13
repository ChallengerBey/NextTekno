"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
    const pathname = usePathname();
    const pathnames = pathname.split("/").filter((x) => x);

    // Map system paths to display names
    const pathMap: { [key: string]: string } = {
        "shop-with-sidebar": "Mağaza",
        "shop-details": "Ürün Detayı",
        "cart": "Sepetim",
        "checkout": "Ödeme",
        "signin": "Giriş Yap",
        "signup": "Kayıt Ol",
        "admin": "Yönetim Paneli",
        "products": "Ürünler",
        "campaigns": "Kampanyalar",
        "orders": "Siparişler"
    };

    if (pathname === "/") return null;

    return (
        <nav aria-label="Breadcrumb" className="py-4 mb-4">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
                <li>
                    <Link href="/" className="flex items-center hover:text-blue transition-colors gap-1">
                        <Home size={16} />
                        <span className="hidden sm:inline">Ana Sayfa</span>
                    </Link>
                </li>
                {pathnames.map((value, index) => {
                    const last = index === pathnames.length - 1;
                    const to = `/${pathnames.slice(0, index + 1).join("/")}`;
                    const displayName = pathMap[value] || value.charAt(0).toUpperCase() + value.slice(1);

                    return (
                        <li key={to} className="flex items-center space-x-2">
                            <ChevronRight size={14} className="text-gray-400" />
                            {last ? (
                                <span className="font-semibold text-dark truncate max-w-[150px] sm:max-w-none">
                                    {displayName}
                                </span>
                            ) : (
                                <Link href={to} className="hover:text-blue transition-colors">
                                    {displayName}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumbs;
