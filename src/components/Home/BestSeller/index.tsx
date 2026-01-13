"use client";
import React from "react";
import SingleItem from "./SingleItem";
import ProductItem from "../../Common/ProductItem";
import Image from "next/image";
import Link from "next/link";
import shopData from "@/components/Shop/shopData";
import { useAdmin } from "@/app/context/AdminContext";

const BestSeller = () => {
  const { products } = useAdmin();
  const baseProducts = products.length > 0 ? products : shopData;
  const inStockProducts = baseProducts.filter((item) => item.stock == null || item.stock > 0);
  const productList = (inStockProducts.length > 0 ? inStockProducts : baseProducts).slice(0, 6);
  return (
    <section className="overflow-hidden">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- section title --> */}
        <div className="mb-10 flex items-center justify-between">
          <div>
            <span className="flex items-center gap-2.5 font-medium text-dark mb-1.5">
              <Image
                src="/images/icons/icon-07.svg"
                alt="icon"
                width={17}
                height={17}
              />
              Bu Ay
            </span>
            <h2 className="font-semibold text-xl xl:text-heading-5 text-dark">
              En Çok Satanlar
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7.5">
          {/* <!-- Best Sellers item --> */}
          {productList.map((product, key) => (
            <ProductItem product={product} key={key} />
          ))}
        </div>

        <div className="text-center mt-12.5">
          <Link
            href="/shop-without-sidebar"
            className="inline-flex font-medium text-custom-sm py-3 px-7 sm:px-12.5 rounded-md border-gray-3 border bg-gray-1 text-dark ease-out duration-200 hover:bg-dark hover:text-white hover:border-transparent"
          >
            Tümünü Gör
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BestSeller;
