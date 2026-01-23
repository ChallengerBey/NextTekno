"use client";
import React, { useState } from "react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateCartItemQuantity,
} from "@/redux/features/cart-slice";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";

const SingleItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const dispatch = useDispatch<AppDispatch>();

  const handleRemoveFromCart = () => {
    dispatch(removeItemFromCart(item.id));
  };

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
    dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity + 1 }));
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      dispatch(updateCartItemQuantity({ id: item.id, quantity: quantity - 1 }));
    }
  };

  return (
    <div className="p-6">
      {/* Mobile Layout */}
      <div className="md:hidden">
        <div className="flex gap-4">
          {/* Product Image */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
              <Image 
                width={80} 
                height={80} 
                src={item.imgs?.thumbnails[0]} 
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2 mb-2">
              {item.title}
            </h3>
            
            <div className="flex items-center justify-between mb-3">
              <div className="text-lg font-bold text-orange-500">
                ₺{item.discountedPrice}
              </div>
              <div className="text-sm text-gray-500">
                Toplam: ₺{(item.discountedPrice * quantity).toFixed(2)}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={handleDecreaseQuantity}
                  disabled={quantity <= 1}
                  className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={handleIncreaseQuantity}
                  className="p-2 hover:bg-gray-50"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>

              <button
                onClick={handleRemoveFromCart}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:flex items-center">
        {/* Product Info */}
        <div className="flex-1 flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
            <Image 
              width={64} 
              height={64} 
              src={item.imgs?.thumbnails[0]} 
              alt={item.title}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {item.title}
            </h3>
          </div>
        </div>

        {/* Price */}
        <div className="w-32 text-center">
          <span className="text-lg font-bold text-orange-500">
            ₺{item.discountedPrice}
          </span>
        </div>

        {/* Quantity */}
        <div className="w-32 flex justify-center">
          <div className="flex items-center border border-gray-300 rounded-lg">
            <button
              onClick={handleDecreaseQuantity}
              disabled={quantity <= 1}
              className="p-2 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="px-4 py-2 text-sm font-medium border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={handleIncreaseQuantity}
              className="p-2 hover:bg-gray-50"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Total */}
        <div className="w-32 text-center">
          <span className="text-lg font-bold text-gray-900">
            ₺{(item.discountedPrice * quantity).toFixed(2)}
          </span>
        </div>

        {/* Remove Button */}
        <div className="w-16 flex justify-center">
          <button
            onClick={handleRemoveFromCart}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleItem;
