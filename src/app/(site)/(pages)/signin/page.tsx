import Signin from "@/components/Auth/Signin";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Giriş Yap | NextTekno - Hesabınıza Giriş Yapın",
  description: "NextTekno hesabınıza giriş yapın. Siparişlerinizi takip edin, favori ürünlerinizi görüntüleyin ve özel kampanyalardan haberdar olun.",
  keywords: [
    "giriş yap",
    "üye girişi",
    "hesap girişi",
    "NextTekno giriş",
    "kullanıcı girişi",
    "oturum aç",
    "login"
  ],
  openGraph: {
    title: "Giriş Yap | NextTekno",
    description: "NextTekno hesabınıza giriş yapın",
    url: 'https://nexttekno.com/signin',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Giriş Yap | NextTekno",
    description: "NextTekno hesabınıza giriş yapın",
  },
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: '/signin',
  },
};

const SigninPage = () => {
  return (
    <main>
      <Signin />
    </main>
  );
};

export default SigninPage;
