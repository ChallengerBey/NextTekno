"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useAdmin } from "@/app/context/AdminContext";

const PromoBanner = () => {
  const { promos } = useAdmin();
  const bannerPromos = promos.filter(p => p.location === "banner");

  if (bannerPromos.length === 0) return null;

  const bigBanner = bannerPromos[0];
  const smallBanners = bannerPromos.slice(1, 3);

  return (
    <section className="overflow-hidden py-20">
      <div className="max-w-[1170px] w-full mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- promo banner big --> */}
        {bigBanner && (
          <div className={`relative z-1 overflow-hidden rounded-lg py-12.5 lg:py-17.5 xl:py-22.5 px-4 sm:px-7.5 lg:px-14 xl:px-19 mb-7.5 ${bigBanner.style === 'red' ? 'bg-[#FFECE1]' :
              bigBanner.style === 'blue' ? 'bg-[#E5EAF4]' :
                bigBanner.style === 'dark' ? 'bg-[#F5F5F7]' : 'bg-[#F2F3F8]'
            }`}>
            <div className="max-w-[550px] w-full relative z-10">
              <span className="block font-medium text-xl text-dark mb-3 italic">
                {bigBanner.badge}
              </span>

              <h2 className="font-bold text-xl lg:text-heading-4 xl:text-heading-3 text-dark mb-5 leading-tight">
                {bigBanner.title}
              </h2>

              <p className="text-dark-4 max-w-[400px]">
                {bigBanner.description}
              </p>

              <Link
                href={bigBanner.buttonUrl}
                className={`inline-flex font-medium text-custom-sm text-white py-[11px] px-9.5 rounded-md ease-out duration-200 mt-7.5 ${bigBanner.style === 'red' ? 'bg-red hover:bg-red/80' :
                    bigBanner.style === 'blue' ? 'bg-blue hover:bg-blue/80' : 'bg-dark hover:bg-dark/80'
                  }`}
              >
                {bigBanner.buttonText}
              </Link>
            </div>

            {bigBanner.imageUrl && (
              <Image
                src={bigBanner.imageUrl}
                alt={bigBanner.title}
                className="absolute bottom-0 right-4 lg:right-26 z-1 object-contain h-full w-auto py-5"
                width={274}
                height={350}
              />
            )}
          </div>
        )}

        <div className="grid gap-7.5 grid-cols-1 lg:grid-cols-2">
          {smallBanners.map((banner, idx) => (
            <div
              key={banner.id}
              className={`relative z-1 overflow-hidden rounded-lg py-10 xl:py-16 px-4 sm:px-7.5 xl:px-10 ${banner.style === 'teal' || idx === 0 ? 'bg-[#DBF4F3]' : 'bg-[#FFECE1]'
                }`}
            >
              <div className={`${idx === 0 ? 'text-right' : ''} relative z-10`}>
                <span className="block text-lg text-dark mb-1.5 font-medium lowercase italic">
                  {banner.badge}
                </span>

                <h2 className="font-bold text-xl lg:text-heading-4 text-dark mb-2.5 leading-tight">
                  {banner.title}
                </h2>

                <p className="text-custom-sm text-dark-4 max-w-[250px] mb-6">
                  {banner.description}
                </p>

                <Link
                  href={banner.buttonUrl}
                  className={`inline-flex font-medium text-custom-sm text-white py-2.5 px-8.5 rounded-md ease-out duration-200 ${banner.style === 'orange' ? 'bg-orange hover:bg-orange/80' :
                      banner.style === 'teal' ? 'bg-teal hover:bg-teal/80' : 'bg-dark hover:bg-dark/80'
                    }`}
                >
                  {banner.buttonText}
                </Link>
              </div>

              {banner.imageUrl && (
                <Image
                  src={banner.imageUrl}
                  alt={banner.title}
                  className={`absolute top-1/2 -translate-y-1/2 -z-1 object-contain ${idx === 0 ? 'left-3 sm:left-10' : 'right-3 sm:right-8.5'
                    }`}
                  width={200}
                  height={200}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
