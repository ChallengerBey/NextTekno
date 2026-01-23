"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Rotate3d, Maximize2, Move3d, Eye } from "lucide-react";

interface InteractiveProductProps {
  images: string[];
  title: string;
  price: number;
  discountedPrice?: number;
}

const InteractiveProduct = ({ images, title, price, discountedPrice }: InteractiveProductProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);
  const [viewMode, setViewMode] = useState<'gallery' | '360' | 'zoom'>('gallery');
  
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 25, stiffness: 300 };
  const rotateX = useSpring(useTransform(y, [-100, 100], [30, -30]), springConfig);
  const rotateY = useSpring(useTransform(x, [-100, 100], [-30, 30]), springConfig);

  useEffect(() => {
    if (isRotating) {
      const interval = setInterval(() => {
        setRotation(prev => ({ ...prev, y: prev.y + 1 }));
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isRotating]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || viewMode !== '360') return;
    
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="space-y-4">
      {/* View Mode Selector */}
      <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
        <button
          onClick={() => setViewMode('gallery')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
            viewMode === 'gallery' 
              ? 'bg-white text-blue shadow-sm' 
              : 'text-gray-600 hover:text-gray-700'
          }`}
        >
          <Eye size={16} />
          <span className="text-sm font-medium">Galeri</span>
        </button>
        <button
          onClick={() => setViewMode('360')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
            viewMode === '360' 
              ? 'bg-white text-blue shadow-sm' 
              : 'text-gray-600 hover:text-gray-700'
          }`}
        >
          <Rotate3d size={16} />
          <span className="text-sm font-medium">360°</span>
        </button>
        <button
          onClick={() => setViewMode('zoom')}
          className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-md transition-all duration-300 ${
            viewMode === 'zoom' 
              ? 'bg-white text-blue shadow-sm' 
              : 'text-gray-600 hover:text-gray-700'
          }`}
        >
          <Maximize2 size={16} />
          <span className="text-sm font-medium">Yakınlaştır</span>
        </button>
      </div>

      {/* Product Display */}
      <div className="relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
        <div
          ref={ref}
          className="relative aspect-square max-w-md mx-auto"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {viewMode === 'gallery' && (
            <motion.div
              key={currentImageIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentImageIndex] || "/images/products/product-01.png"}
                alt={`${title} - ${currentImageIndex + 1}`}
                fill
                className="object-contain drop-shadow-2xl"
              />
            </motion.div>
          )}

          {viewMode === '360' && (
            <motion.div
              style={{
                rotateX: rotateX,
                rotateY: rotateY,
                transformStyle: "preserve-3d",
              }}
              className="relative w-full h-full"
            >
              <Image
                src={images[currentImageIndex] || "/images/products/product-01.png"}
                alt={`${title} - 360° View`}
                fill
                className="object-contain drop-shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/20 pointer-events-none" />
            </motion.div>
          )}

          {viewMode === 'zoom' && (
            <motion.div
              whileHover={{ scale: 1.5 }}
              whileTap={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full h-full cursor-zoom-in overflow-hidden rounded-xl"
            >
              <Image
                src={images[currentImageIndex] || "/images/products/product-01.png"}
                alt={`${title} - Zoomed`}
                fill
                className="object-contain"
              />
            </motion.div>
          )}

          {/* 360° Indicator */}
          {viewMode === '360' && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -top-4 -right-4 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs font-bold shadow-lg"
            >
              360°
            </motion.div>
          )}
        </div>

        {/* Navigation Controls */}
        {viewMode === 'gallery' && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M12.5 15L7.5 10L12.5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center hover:bg-white hover:scale-110 transition-all duration-300"
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
                <path d="M7.5 5L12.5 10L7.5 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </>
        )}

        {/* Auto-rotate Toggle for 360° */}
        {viewMode === '360' && (
          <button
            onClick={() => setIsRotating(!isRotating)}
            className="absolute bottom-4 right-4 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg text-sm font-medium hover:bg-white transition-all duration-300"
          >
            {isRotating ? 'Durdur' : 'Otomatik Döndür'}
          </button>
        )}
      </div>

      {/* Thumbnail Strip */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentImageIndex(index)}
            className={`relative flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
              currentImageIndex === index
                ? 'border-blue-500 ring-2 ring-blue-200 scale-105'
                : 'border-gray-200 hover:border-gray-300'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="relative w-16 h-16">
              <Image
                src={image || "/images/products/product-01.png"}
                alt={`${title} - ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          </motion.button>
        ))}
      </div>

      {/* Product Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center space-y-2"
      >
        <h3 className="text-xl font-bold text-gray-700">{title}</h3>
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl font-bold text-blue-600">
            ₺{discountedPrice || price}
          </span>
          {discountedPrice && (
            <span className="text-lg text-gray-400 line-through">
              ₺{price}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default InteractiveProduct;
