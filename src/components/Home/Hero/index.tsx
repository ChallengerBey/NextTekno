"use client";
import React from "react";
import HeroCarousel from "./HeroCarousel";
import HeroFeature from "./HeroFeature";
import Image from "next/image";
import shopData from "@/components/Shop/shopData";
import { useAdmin } from "@/app/context/AdminContext";
import { Product } from "@/types/product";

const isInStock = (product: Product) => product.stock == null || product.stock > 0;

const getPreviewImage = (product: Product, fallback: string) => {
  return product.imgs?.previews?.[0] ?? product.imgs?.thumbnails?.[0] ?? fallback;
};

const formatPrice = (value?: number | null) => {
  return value != null ? `₺${value}` : "";
};

const Hero = () => {
  const { products } = useAdmin();
  const baseProducts = products.length > 0 ? products : shopData;
  const inStockProducts = baseProducts.filter(isInStock);
  const heroProducts = (inStockProducts.length > 0 ? inStockProducts : baseProducts).slice(0, 2);
  const fallbackImages = ["/images/hero/hero-02.png", "/images/hero/hero-01.png"];

  return (
    <section className="overflow-hidden pb-10 lg:pb-12.5 xl:pb-15 pt-20 sm:pt-20 lg:pt-20 xl:pt-20 bg-[#E5EAF4]">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-wrap gap-5">
          <div className="xl:max-w-[757px] w-full">
            <div className="relative z-1 rounded-[10px] bg-white overflow-hidden">
              {/* <!-- bg shapes --> */}
              <Image
                src="/images/hero/hero-bg.png"
                alt="hero bg shapes"
                className="absolute right-0 bottom-0 -z-1"
                width={534}
                height={520}
              />

              <HeroCarousel />
            </div>
          </div>

          <div className="xl:max-w-[393px] w-full">
            <div className="flex flex-col sm:flex-row xl:flex-col gap-5">
              {heroProducts.map((product, index) => {
                const displayPrice = product.discountedPrice ?? product.price;
                const showComparePrice = product.discountedPrice != null;
                const previewImage = getPreviewImage(product, fallbackImages[index % fallbackImages.length]);

                return (
                  <div key={`${product.id}-${index}`} className="w-full relative rounded-[10px] bg-white p-4 sm:p-7.5">
                    <div className="flex items-center gap-14">
                      <div>
                        <h2 className="max-w-[153px] font-semibold text-dark text-xl mb-20">
                          <a href="#"> {product.title} </a>
                        </h2>

                        <div>
                          <p className="font-medium text-dark-4 text-custom-sm mb-1.5">
                            Kaçırılmayacak Fırsat
                          </p>
                          <span className="flex items-center gap-3">
                            <span className="font-medium text-heading-5 text-red">
                              {formatPrice(displayPrice)}
                            </span>
                            {showComparePrice && (
                              <span className="font-medium text-2xl text-dark-4 line-through">
                                {formatPrice(product.price)}
                              </span>
                            )}
                          </span>
                        </div>
                      </div>

                      <div>
                        <Image
                          src={previewImage}
                          alt={product.title || "product image"}
                          width={123}
                          height={161}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* <!-- Hero features --> */}
      <HeroFeature />
    </section>
  );
};

export default Hero;
