import React from "react";
import Link from "next/link";
import shopData from "@/components/Shop/shopData";
import Image from "next/image";

const AdminProductsPage = () => {
    return (
        <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
            <div className="mb-6 flex justify-between items-center">
                <h4 className="text-xl font-semibold text-black dark:text-white">
                    Ürün Listesi
                </h4>
                <Link
                    href="/admin/products/add"
                    className="inline-flex items-center justify-center rounded-md bg-blue py-2 px-6 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                    Ürün Ekle
                </Link>
            </div>

            <div className="flex flex-col">
                <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5">
                    <div className="p-2.5 xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Ürün Adı
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Fiyat
                        </h5>
                    </div>
                    <div className="p-2.5 text-center xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            İndirimli Fiyat
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            Yorumlar
                        </h5>
                    </div>
                    <div className="hidden p-2.5 text-center sm:block xl:p-5">
                        <h5 className="text-sm font-medium uppercase xsm:text-base">
                            İşlem
                        </h5>
                    </div>
                </div>

                {shopData.map((product, key) => (
                    <div
                        className={`grid grid-cols-3 sm:grid-cols-5 ${key === shopData.length - 1
                                ? ""
                                : "border-b border-stroke dark:border-strokedark"
                            }`}
                        key={key}
                    >
                        <div className="flex items-center gap-3 p-2.5 xl:p-5">
                            <div className="flex-shrink-0">
                                <Image src={product.imgs.thumbnails[0]} alt="Brand" width={48} height={48} />
                            </div>
                            <p className="hidden text-black dark:text-white sm:block">
                                {product.title}
                            </p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-black dark:text-white">${product.price}</p>
                        </div>

                        <div className="flex items-center justify-center p-2.5 xl:p-5">
                            <p className="text-meta-3">${product.discountedPrice}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <p className="text-black dark:text-white">{product.reviews}</p>
                        </div>

                        <div className="hidden items-center justify-center p-2.5 sm:flex xl:p-5">
                            <button className="text-blue hover:underline">Düzenle</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminProductsPage;
