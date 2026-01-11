"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();

    return (
        <aside className="fixed left-0 top-0 z-50 flex h-screen w-72.5 flex-col overflow-y-hidden bg-white duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 shadow-2 border-r border-gray-200">
            {/* <!-- SIDEBAR HEADER --> */}
            <div className="flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5">
                <Link href="/admin">
                    <h1 className="text-2xl font-bold text-blue">NextTekno Admin</h1>
                </Link>
            </div>
            {/* <!-- SIDEBAR HEADER --> */}

            <div className="no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear">
                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-5 py-4 px-4 lg:mt-9 lg:px-6">
                    {/* <!-- Menu Group --> */}
                    <div>
                        <h3 className="mb-4 ml-4 text-sm font-semibold text-gray-500">
                            MENÜ
                        </h3>

                        <ul className="mb-6 flex flex-col gap-1.5">
                            {/* <!-- Menu Item Dashboard --> */}
                            <li>
                                <Link
                                    href="/admin"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 ${pathname === "/admin" ? "bg-gray-100 text-blue" : "text-dark"
                                        }`}
                                >
                                    <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M16 16H2V2H16V16ZM18 18V0H0V18H18Z" fillOpacity="0" />
                                        <path d="M16 16H10V10H16V16ZM16 8H10V2H16V8ZM8 16H2V10H8V16ZM8 8H2V2H8V8Z" />
                                    </svg>
                                    Dashboard
                                </Link>
                            </li>

                            {/* <!-- Menu Item Products --> */}
                            <li>
                                <Link
                                    href="/admin/products"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 ${pathname && pathname.includes("/admin/products") ? "bg-gray-100 text-blue" : "text-dark"
                                        }`}
                                >
                                    <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M15 4H19V6H15V19H3V6H-1V4H3V1H7V4H11V1H15V4ZM5 6V17H13V6H5Z" />
                                    </svg>
                                    Ürün Yönetimi
                                </Link>
                            </li>

                            {/* <!-- Menu Item Orders --> */}
                            <li>
                                <Link
                                    href="/admin/orders"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 ${pathname && pathname.includes("/admin/orders") ? "bg-gray-100 text-blue" : "text-dark"
                                        }`}
                                >
                                    <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M15.55 13C16.3 13.04 17 12.44 17 11.72V6H13V2H3V6H1V15H15.55ZM5 4H11V6H5V4Z" />
                                    </svg>
                                    Siparişler
                                </Link>
                            </li>

                            {/* <!-- Menu Item Campaigns --> */}
                            <li>
                                <Link
                                    href="/admin/campaigns"
                                    className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium duration-300 ease-in-out hover:bg-gray-100 ${pathname && pathname.includes("/admin/campaigns") ? "bg-gray-100 text-blue" : "text-dark"
                                        }`}
                                >
                                    <svg
                                        className="fill-current"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path d="M18 12L13 18L10 14L6 19L2 12H18ZM2 2H18V10H2V2Z" />
                                    </svg>
                                    Kampanyalar
                                </Link>
                            </li>

                        </ul>
                    </div>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;
