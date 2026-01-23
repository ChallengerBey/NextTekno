"use client";
import Image from "next/image";
import { Product } from "@/types/product";
import { useModalContext } from "@/app/context/QuickViewModalContext";
import { updateQuickView } from "@/redux/features/quickView-slice";
import { addItemToCart } from "@/redux/features/cart-slice";
import { addItemToWishlist } from "@/redux/features/wishlist-slice";
import { updateproductDetails } from "@/redux/features/product-details";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { motion } from "framer-motion";
import { ShoppingCart, Eye, Heart } from "lucide-react";

const ProductItem = ({ product }: { product: Product }) => {
  const { openModal } = useModalContext();
  const previewImage = product.imgs?.previews?.[0] ?? "/images/products/product-01.png";
  const displayPrice = product.discountedPrice ?? product.price;
  const showComparePrice = product.discountedPrice != null;

  const dispatch = useDispatch<AppDispatch>();

  // update the QuickView state
  const handleQuickViewUpdate = () => {
    dispatch(updateQuickView({ ...product }));
  };

  // add to cart
  const handleAddToCart = () => {
    dispatch(
      addItemToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice ?? product.price,
        quantity: 1,
        imgs: product.imgs,
      })
    );
    toast.success(`${product.title} sepete eklendi! ✨`, {
      style: {
        borderRadius: "10px",
        background: "#333",
        color: "#fff",
      },
    });
  };

  const handleItemToWishList = () => {
    dispatch(
      addItemToWishlist({
        id: product.id,
        title: product.title,
        price: product.price,
        discountedPrice: product.discountedPrice ?? product.price,
        quantity: 1,
        imgs: product.imgs,
        status: "available",
      })
    );
    toast.success(`${product.title} favorilere eklendi! ❤️`);
  };

  const handleProductDetails = () => {
    dispatch(updateproductDetails({ ...product }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
      className="group bg-white p-3 rounded-xl shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-100 relative overflow-hidden"
    >
      {/* Hover Gradient Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0"
        whileHover={{
          background: "linear-gradient(135deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 50%, rgba(236, 72, 153, 0.03) 100%)",
        }}
        transition={{ duration: 0.4 }}
      />
      
      <div className="relative">
        <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4 group-hover:bg-gradient-to-br group-hover:from-blue-50 group-hover:to-purple-50 transition-all duration-500">
          <motion.div
            whileHover={{ scale: 1.15, rotate: 2 }}
            transition={{ duration: 0.5, type: "spring" }}
          >
            <Image
              src={previewImage}
              alt={product.title}
              width={250}
              height={250}
              className="object-contain transition-transform duration-700 group-hover:scale-110 drop-shadow-lg"
            />
          </motion.div>

          <motion.div 
            className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100"
            initial={false}
          >
            <motion.button
              onClick={() => {
                openModal();
                handleQuickViewUpdate();
              }}
              aria-label="hızlı bakış"
              className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200 text-dark bg-white hover:bg-blue hover:text-white hover:scale-110"
              whileHover={{ rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Eye size={18} />
            </motion.button>

            <motion.button
              onClick={handleAddToCart}
              className="inline-flex font-medium text-custom-sm py-2.5 px-6 rounded-full bg-blue text-white shadow-lg transition-all duration-200 hover:bg-dark hover:scale-105 translate-y-2 group-hover:translate-y-0"
              whileHover={{ boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)" }}
              whileTap={{ scale: 0.95 }}
            >
              <ShoppingCart size={18} className="mr-2" />
              Sepete Ekle
            </motion.button>

            <motion.button
              onClick={handleItemToWishList}
              aria-label="favorilere ekle"
              className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200 text-dark bg-white hover:bg-red-500 hover:text-white hover:scale-110"
              whileHover={{ rotate: -15 }}
              whileTap={{ scale: 0.9 }}
            >
              <Heart size={18} />
            </motion.button>
          </motion.div>

          {/* Discount Badge */}
          {product.discountedPrice && (
            <motion.div
              className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              %{Math.round(((product.price - product.discountedPrice) / product.price) * 100)} İNDİRİM
            </motion.div>
          )}
        </div>

        <div className="flex items-center gap-2.5 mb-2">
          <motion.div 
            className="flex items-center gap-1 text-yellow-500"
            whileHover={{ scale: 1.1 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.svg
                key={i}
                width="14" 
                height="14" 
                viewBox="0 0 16 16" 
                fill="currentColor"
                initial={{ rotate: 0 }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M8 0L9.8 5.5H15.5L11 9L12.8 14.5L8 11L3.2 14.5L5 9L0.5 5.5H6.2L8 0Z" />
              </motion.svg>
            ))}
          </motion.div>
          <motion.p 
            className="text-custom-sm text-gray-400"
            whileHover={{ color: "#3C50E0" }}
          >
            ({product.reviews})
          </motion.p>
        </div>

        <motion.h3
          className="font-semibold text-dark hover:text-blue mb-1.5 transition-colors duration-200 line-clamp-2 cursor-pointer h-[48px] overflow-hidden relative"
          onClick={handleProductDetails}
          whileHover={{ x: 5 }}
        >
          <Link href="/shop-details">{product.title}</Link>
          <motion.div
            className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue"
            whileHover={{ width: "100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.h3>

        <div className="flex items-center justify-between mt-2">
          <motion.span 
            className="flex items-center gap-2 font-bold text-lg"
            whileHover={{ scale: 1.05 }}
          >
            <motion.span 
              className="text-blue"
              whileHover={{ color: "#1C3FB7" }}
            >
              ₺{displayPrice}
            </motion.span>
            {showComparePrice && (
              <motion.span 
                className="text-gray-400 line-through text-sm font-normal"
                whileHover={{ opacity: 0.7 }}
              >
                ₺{product.price}
              </motion.span>
            )}
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductItem;
