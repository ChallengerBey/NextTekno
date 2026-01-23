import React from "react";
import { Wishlist } from "@/components/Wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Favorilerim | NextTekno - İstek Listem",
  description: "NextTekno'da favori ürünlerinizi görüntüleyin. İstek listenizden ürünleri sepete ekleyin ve özel kampanyalardan haberdar olun.",
  keywords: [
    "favorilerim",
    "istek listesi",
    "favori ürünler",
    "NextTekno favoriler",
    "wishlist",
    "beğenilen ürünler"
  ],
  openGraph: {
    title: "Favorilerim | NextTekno",
    description: "Favori ürünlerinizi görüntüleyin ve sepete ekleyin",
    url: 'https://nexttekno.com/wishlist',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Favorilerim | NextTekno",
    description: "Favori ürünlerinizi görüntüleyin",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/wishlist',
  },
};

const WishlistPage = () => {
  return (
    <main>
      <Wishlist />
    </main>
  );
};

export default WishlistPage;
