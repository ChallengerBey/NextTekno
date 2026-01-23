"use client";
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "iPhone 15 Pro Max",
    subtitle: "En yeni teknoloji, en uygun fiyat",
    discount: "%20 İndirim",
    image: "/images/hero/hero-01.png",
    bgColor: "bg-gradient-to-r from-blue-600 to-purple-600"
  },
  {
    id: 2,
    title: "Samsung Galaxy S24",
    subtitle: "Yapay zeka destekli fotoğrafçılık",
    discount: "%15 İndirim",
    image: "/images/hero/hero-02.png",
    bgColor: "bg-gradient-to-r from-green-600 to-blue-600"
  },
  {
    id: 3,
    title: "MacBook Air M3",
    subtitle: "Güçlü performans, uzun pil ömrü",
    discount: "%10 İndirim",
    image: "/images/hero/hero-03.png",
    bgColor: "bg-gradient-to-r from-purple-600 to-pink-600"
  }
];

const MainSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="relative h-80 rounded-lg overflow-hidden mb-6">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : 
            index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`${slide.bgColor} h-full flex items-center justify-between px-12 text-white`}>
            <div className="flex-1">
              <div className="inline-block bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold mb-4">
                {slide.discount}
              </div>
              <h2 className="text-4xl font-bold mb-2">{slide.title}</h2>
              <p className="text-xl mb-6 opacity-90">{slide.subtitle}</p>
              <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Şimdi İncele
              </button>
            </div>
            <div className="flex-1 flex justify-center">
              <img 
                src={slide.image} 
                alt={slide.title}
                className="max-h-64 object-contain"
              />
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MainSlider;