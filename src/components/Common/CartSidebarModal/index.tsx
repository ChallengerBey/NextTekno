"use client";
import React, { useEffect, useState } from "react";

import { useCartModalContext } from "@/app/context/CartSidebarModalContext";
import {
  removeItemFromCart,
  selectTotalPrice,
} from "@/redux/features/cart-slice";
import { useAppSelector } from "@/redux/store";
import { useSelector } from "react-redux";
import SingleItem from "./SingleItem";
import Link from "next/link";
import EmptyCart from "./EmptyCart";

const CartSidebarModal = () => {
  const { isCartModalOpen, closeCartModal } = useCartModalContext();
  const cartItems = useAppSelector((state) => state.cartReducer.items);

  const totalPrice = useSelector(selectTotalPrice);

  useEffect(() => {
    // closing modal while clicking outside
    function handleClickOutside(event) {
      if (!event.target.closest(".modal-content")) {
        closeCartModal();
      }
    }

    if (isCartModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isCartModalOpen, closeCartModal]);

  const shippingGoal = 1000;
  const remainingForFreeShipping = shippingGoal - totalPrice;
  const progressPercentage = Math.min((totalPrice / shippingGoal) * 100, 100);

  return (
    <div
      className={`fixed top-0 left-0 z-99999 overflow-y-auto no-scrollbar w-full h-screen bg-dark/70 ease-linear duration-300 transition-opacity ${isCartModalOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
    >
      <div className="flex items-center justify-end h-full">
        <div className={`w-full max-w-[500px] h-full shadow-2xl bg-white px-4 sm:px-7.5 lg:px-11 relative modal-content transition-transform duration-300 transform ${isCartModalOpen ? "translate-x-0" : "translate-x-full"}`}>
          <div className="sticky top-0 bg-white z-20 flex items-center justify-between pb-7 pt-4 sm:pt-7.5 lg:pt-11 border-b border-gray-3 mb-7.5">
            <h2 className="font-bold text-dark text-lg sm:text-2xl flex items-center gap-2">
              Sepetim <span className="text-gray-400 font-normal">({cartItems.length})</span>
            </h2>
            <button
              onClick={() => closeCartModal()}
              aria-label="modali kapat"
              className="group flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition-colors"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Shipping Goal Progress */}
          {cartItems.length > 0 && (
            <div className="mb-8 p-4 bg-blue/5 rounded-xl border border-blue/10">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-dark">
                  {remainingForFreeShipping > 0 ? (
                    <>Bedava kargo için <span className="text-blue font-bold">₺{remainingForFreeShipping}</span> kaldı!</>
                  ) : (
                    <span className="text-green-600 font-bold">Tebrikler! Kargo bizden. 📦✨</span>
                  )}
                </p>
                <span className="text-xs font-bold text-blue">{progressPercentage.toFixed(0)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 ease-out rounded-full ${remainingForFreeShipping <= 0 ? 'bg-green-500' : 'bg-blue'}`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          )}

          <div className="h-[calc(100vh-420px)] overflow-y-auto no-scrollbar pr-2 mb-4">
            <div className="flex flex-col gap-6">
              {/* <!-- cart item --> */}
              {cartItems.length > 0 ? (
                cartItems.map((item, key) => (
                  <SingleItem
                    key={key}
                    item={item}
                    removeItemFromCart={removeItemFromCart}
                  />
                ))
              ) : (
                <EmptyCart />
              )}
            </div>
          </div>

          <div className="border-t border-gray-3 bg-white pt-6 pb-4 sm:pb-7.5 mt-auto">
            <div className="flex items-center justify-between gap-5 mb-8">
              <div>
                <p className="text-gray-500 text-sm">Ara Toplam</p>
                <p className="font-bold text-2xl text-dark">₺{totalPrice}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-500 text-sm">Kargo</p>
                <p className={`font-bold ${remainingForFreeShipping <= 0 ? 'text-green-600' : 'text-dark'}`}>
                  {remainingForFreeShipping <= 0 ? 'Bedava' : '₺49.90'}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/checkout"
                onClick={() => closeCartModal()}
                className="w-full flex justify-center items-center font-bold text-white bg-dark py-4 px-6 rounded-xl ease-out duration-300 hover:bg-opacity-95 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all"
              >
                Güvenli Ödeme Yap
              </Link>

              <Link
                onClick={() => closeCartModal()}
                href="/cart"
                className="w-full flex justify-center items-center font-medium text-dark bg-gray-100 py-3.5 px-6 rounded-xl ease-out duration-300 hover:bg-gray-200"
              >
                Sepet Detayları
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebarModal;
