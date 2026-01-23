"use client";
import React from "react";
import { useAdmin } from "@/app/context/AdminContext";

const AdminOrdersPage = () => {
    const { orders } = useAdmin();

    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="mb-6 flex justify-between items-center">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Sipariş Listesi
                </h4>
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Sipariş No
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Müşteri
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Tarih
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Durum
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Toplam
                        </h5>
                    </div>
                </div>

                {orders.map((order, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === orders.length - 1
                            ? ""
                            : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">
                                {order.id}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{order.customer}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">{order.date}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${order.status === "Tamamlandı" ? "bg-success text-success" :
                                order.status === "İptal Edildi" ? "bg-danger text-danger" :
                                    order.status === "Kargoda" ? "bg-warning text-warning" : "bg-primary text-primary"
                                }`}>
                                {order.status}
                            </p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-meta-3">{order.total}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminOrdersPage;
