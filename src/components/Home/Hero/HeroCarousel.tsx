"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { useAdmin } from "@/app/context/AdminContext";
import { CreditCard, Megaphone } from "lucide-react";

// Import Swiper styles
import "swiper/css/pagination";
import "swiper/css";

import Image from "next/image";
import Link from "next/link";

const HeroCarousal = () => {
  const { promos } = useAdmin();
  const heroPromos = promos.filter(p => p.location === "hero");

  return (
    <Swiper
      spaceBetween={30}
      centeredSlides={true}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      modules={[Autoplay, Pagination]}
      className="hero-carousel"
    >
      {heroPromos.map((promo) => (
        <SwiperSlide key={promo.id}>
          <div className={`flex items-center pt-6 sm:pt-0 flex-col-reverse sm:flex-row min-h-[400px] lg:min-h-[450px]`}>
            <div className="max-w-[450px] py-10 sm:py-15 lg:py-20 pl-4 sm:pl-7.5 lg:pl-12.5 w-full">
              {promo.badge && (
                <div className="flex items-center gap-4 mb-5">
                  <span className={`block font-bold text-heading-4 sm:text-heading-2 ${promo.style === 'red' ? 'text-red' : 'text-blue'}`}>
                    {promo.badge}
                  </span>
                </div>
              )}

              <h1 className="font-bold text-dark text-xl sm:text-4xl mb-4 leading-tight">
                <Link href={promo.buttonUrl}>{promo.title}</Link>
              </h1>

              <p className="text-dark-4 text-base sm:text-lg mb-8 leading-relaxed">
                {promo.description}
              </p>

              <Link
                href={promo.buttonUrl}
                className="inline-flex font-semibold text-white text-custom-sm rounded-full bg-dark py-3.5 px-10 ease-out duration-300 hover:bg-blue hover:shadow-lg transition-all"
              >
                {promo.buttonText}
              </Link>
            </div>

            <div className="flex-1 flex justify-center items-center p-5">
              {promo.imageUrl ? (
                <Image
                  src={promo.imageUrl}
                  alt={promo.title}
                  width={380}
                  height={380}
                  className="object-contain drop-shadow-2xl animate-float"
                />
              ) : (
                <div className={`w-64 h-64 rounded-3xl flex items-center justify-center shadow-2xl transition-transform hover:scale-105 ${promo.style === 'gradient' ? 'bg-gradient-to-br from-blue to-purple-600' :
                  promo.style === 'red' ? 'bg-gradient-to-br from-red to-orange-500' :
                    promo.style === 'dark' ? 'bg-dark' : 'bg-blue'
                  }`}>
                  {promo.type === 'installment' ? (
                    <CreditCard size={120} color="white" strokeWidth={1} />
                  ) : (
                    <Megaphone size={120} color="white" strokeWidth={1} />
                  )}
                </div>
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default HeroCarousal;
