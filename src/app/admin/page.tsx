"use client";
import React from "react";
import { useAdmin } from "@/app/context/AdminContext";

export default function AdminDashboardPage() {
    const { orders } = useAdmin();

    const totalRevenue = orders.reduce((acc, order) => {
        const price = parseFloat(order.total.replace("$", ""));
        return acc + price;
    }, 0);

    const newOrders = orders.filter(
        (order) => new Date(order.date).toDateString() === new Date().toDateString()
    ).length;

    return (
        <>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">
                                ${totalRevenue.toFixed(2)}
                            </h4>
                            <span className="text-sm font-medium">Toplam Gelir</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">
                                {orders.length}
                            </h4>
                            <span className="text-sm font-medium">Toplam Sipariş</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">
                                45
                            </h4>
                            <span className="text-sm font-medium">Toplam Ürün</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark">
                    <div className="mt-4 flex items-end justify-between">
                        <div>
                            <h4 className="text-title-md font-bold text-black dark:text-white">
                                120
                            </h4>
                            <span className="text-sm font-medium">Kullanıcılar</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
