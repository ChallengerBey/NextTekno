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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="group bg-white p-3 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="relative overflow-hidden flex items-center justify-center rounded-lg bg-[#F6F7FB] min-h-[270px] mb-4 group-hover:bg-white transition-colors duration-300">
        <Image
          src={previewImage}
          alt={product.title}
          width={250}
          height={250}
          className="object-contain transition-transform duration-500 group-hover:scale-110"
        />

        <div className="absolute left-0 bottom-0 translate-y-full w-full flex items-center justify-center gap-2.5 pb-5 ease-linear duration-300 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => {
              openModal();
              handleQuickViewUpdate();
            }}
            aria-label="hızlı bakış"
            className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200 text-dark bg-white hover:bg-blue hover:text-white"
          >
            <Eye size={18} />
          </button>

          <button
            onClick={handleAddToCart}
            className="inline-flex font-medium text-custom-sm py-2.5 px-6 rounded-full bg-blue text-white shadow-lg transition-all duration-200 hover:bg-dark translate-y-2 group-hover:translate-y-0"
          >
            <ShoppingCart size={18} className="mr-2" />
            Sepete Ekle
          </button>

          <button
            onClick={handleItemToWishList}
            aria-label="favorilere ekle"
            className="flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all duration-200 text-dark bg-white hover:bg-red-500 hover:text-white"
          >
            <Heart size={18} />
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2.5 mb-2">
        <div className="flex items-center gap-1 text-yellow-500">
          {[...Array(5)].map((_, i) => (
            <svg key={i} width="14" height="14" viewBox="0 0 16 16" fill="currentColor">
              <path d="M8 0L9.8 5.5H15.5L11 9L12.8 14.5L8 11L3.2 14.5L5 9L0.5 5.5H6.2L8 0Z" />
            </svg>
          ))}
        </div>
        <p className="text-custom-sm text-gray-400">({product.reviews})</p>
      </div>

      <h3
        className="font-semibold text-dark hover:text-blue mb-1.5 transition-colors duration-200 line-clamp-2 cursor-pointer h-[48px] overflow-hidden"
        onClick={handleProductDetails}
      >
        <Link href="/shop-details">{product.title}</Link>
      </h3>

      <div className="flex items-center justify-between mt-2">
        <span className="flex items-center gap-2 font-bold text-lg">
          <span className="text-blue">₺{displayPrice}</span>
          {showComparePrice && (
            <span className="text-gray-400 line-through text-sm font-normal">₺{product.price}</span>
          )}
        </span>
      </div>
    </motion.div>
  );
};

export default ProductItem;
