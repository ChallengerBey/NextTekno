import React from "react";
import Cart from "@/components/Cart";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sepetim | NextTekno - Alışveriş Sepeti",
  description: "NextTekno alışveriş sepetinizi görüntüleyin. Ürünlerinizi düzenleyin, miktarları güncelleyin ve güvenli ödeme ile siparişinizi tamamlayın.",
  keywords: [
    "alışveriş sepeti",
    "sepetim",
    "ürün sepeti",
    "NextTekno sepet",
    "sipariş özeti",
    "ödeme",
    "checkout"
  ],
  openGraph: {
    title: "Sepetim | NextTekno",
    description: "Alışveriş sepetinizi görüntüleyin ve siparişinizi tamamlayın",
    url: 'https://nexttekno.com/cart',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Sepetim | NextTekno",
    description: "Alışveriş sepetinizi görüntüleyin",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/cart',
  },
};

const CartPage = () => {
  return (
    <>
      <Cart />
    </>
  );
};

export default CartPage;
